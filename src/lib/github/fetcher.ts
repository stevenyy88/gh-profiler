import { GitHubProfile, GitHubRepository, GitHubOverview } from '../../types/github';
import { SummaryWarning } from '../../types/summary';

const GITHUB_API_BASE = 'https://api.github.com/users';

async function safeFetch(url: string, headers: Record<string, string> = {}): Promise<Response> {
  // SSRF prevention: only allow api.github.com and github.com
  const parsed = new URL(url);
  if (parsed.hostname !== 'api.github.com' && parsed.hostname !== 'github.com') {
    throw new Error('SSRF attempt blocked: Invalid domain requested');
  }

  return fetch(url, {
    headers: {
      'User-Agent': 'gh-profiler-mvp',
      ...headers
    },
    // Prevent hanging requests
    signal: AbortSignal.timeout(10000)
  });
}

export async function fetchProfile(username: string): Promise<{ data: GitHubProfile | null; warnings: SummaryWarning[] }> {
  const warnings: SummaryWarning[] = [];
  try {
    const res = await safeFetch(`${GITHUB_API_BASE}/${username}`);
    
    if (res.status === 404) {
      warnings.push({ field: 'profile', message: 'User not found' });
      return { data: null, warnings };
    }
    
    if (!res.ok) {
      warnings.push({ field: 'profile', message: `GitHub API error: ${res.status} ${res.statusText}` });
      return { data: null, warnings };
    }

    const json = await res.json();
    const profile: GitHubProfile = {
      login: json.login,
      name: json.name || null,
      avatarUrl: json.avatar_url,
      bio: json.bio || null,
      company: json.company || null,
      location: json.location || null,
      websiteUrl: json.blog || null,
      twitterUsername: json.twitter_username || null,
      followers: json.followers || 0,
      following: json.following || 0,
      publicRepos: json.public_repos || 0,
      createdAt: json.created_at
    };
    
    return { data: profile, warnings };
  } catch (err: unknown) {
    warnings.push({ field: 'profile', message: 'Failed to fetch profile due to network or timeout error' });
    return { data: null, warnings };
  }
}

export async function fetchRepositories(username: string): Promise<{ data: GitHubRepository[]; warnings: SummaryWarning[] }> {
  const warnings: SummaryWarning[] = [];
  try {
    // Only fetching first page of public repos (max 100) per MVP scope constraints
    const res = await safeFetch(`${GITHUB_API_BASE}/${username}/repos?per_page=100&sort=updated`);
    
    if (!res.ok) {
      warnings.push({ field: 'repositories', message: `GitHub API error: ${res.status} ${res.statusText}` });
      return { data: [], warnings };
    }

    const reposData = await res.json();
    const repositories: GitHubRepository[] = reposData.map((r: any) => ({
      name: r.name,
      description: r.description || null,
      language: r.language || null,
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      topics: r.topics || [],
      updatedAt: r.updated_at,
      isArchived: r.archived || false,
      isFork: r.fork || false,
      parentName: r.parent ? r.parent.full_name : undefined
    }));

    return { data: repositories, warnings };
  } catch (err: unknown) {
    warnings.push({ field: 'repositories', message: 'Failed to fetch repositories due to network or timeout error' });
    return { data: [], warnings };
  }
}

export async function fetchOverview(username: string): Promise<{ data: GitHubOverview; warnings: SummaryWarning[] }> {
  const warnings: SummaryWarning[] = [];
  const overview: GitHubOverview = { pinnedRepos: [], totalContributionsLastYear: null };

  try {
    const [profileRes, contribsRes] = await Promise.all([
      safeFetch(`https://github.com/${username}`),
      safeFetch(`https://github.com/users/${username}/contributions`)
    ]);

    if (!profileRes.ok) {
      warnings.push({ field: 'overview', message: `GitHub page fetch error: ${profileRes.status}` });
      return { data: overview, warnings };
    }

    const html = await profileRes.text();
    
    // Extract pinned repos using regex over HTML structure
    const pinnedRegex = /<span\s+class="repo"[^>]*>([^<]+)<\/span>/g;
    let match;
    while ((match = pinnedRegex.exec(html)) !== null) {
      overview.pinnedRepos.push(match[1].trim());
    }
    
    if (contribsRes.ok) {
      const contribsHtml = await contribsRes.text();
      // Extract contributions count
      const contribRegex = /<h2[^>]*>\s*([\d,]+)\s+contributions/i;
      const contribMatch = contribRegex.exec(contribsHtml);
      if (contribMatch) {
        overview.totalContributionsLastYear = parseInt(contribMatch[1].replace(/,/g, ''), 10);
      } else {
        warnings.push({ field: 'overview', message: 'Could not parse total contributions from profile HTML' });
      }
    } else if (contribsRes.status !== 404) {
      warnings.push({ field: 'overview', message: 'Failed to fetch contributions fragment' });
    }

    return { data: overview, warnings };
  } catch (err: unknown) {
    warnings.push({ field: 'overview', message: 'Failed to fetch overview due to timeout or parser error' });
    return { data: overview, warnings };
  }
}
