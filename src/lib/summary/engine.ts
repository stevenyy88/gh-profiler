import { GitHubRepository } from '../../types/github';
import { DeterministicSummary, LanguageFocus } from '../../types/summary';

export function computeSummary(repositories: GitHubRepository[]): DeterministicSummary {
  // Filters out forks if we want to focus on original code, but we keep them for total stats.
  // Actually, let's include all repos for total stars/forks, but maybe only original for languages?
  // Constraints say "deterministic rules".
  
  let totalStars = 0;
  let totalForks = 0;
  let activeReposCount = 0;
  
  const languageStats: Record<string, { count: number; stars: number }> = {};
  
  let latestActivity: Date | null = null;
  
  // Sort by stars descending to pick notable repos later
  const sortedByStars = [...repositories].sort((a, b) => b.stars - a.stars);
  
  for (const repo of repositories) {
    totalStars += repo.stars;
    totalForks += repo.forks;
    
    if (!repo.isArchived) {
      activeReposCount++;
    }
    
    // Process languages only for non-forks (better intent signal)
    if (!repo.isFork && repo.language) {
      if (!languageStats[repo.language]) {
        languageStats[repo.language] = { count: 0, stars: 0 };
      }
      languageStats[repo.language].count += 1;
      languageStats[repo.language].stars += repo.stars;
    }
    
    // Find latest activity
    const updatedAt = new Date(repo.updatedAt);
    if (!latestActivity || updatedAt > latestActivity) {
      latestActivity = updatedAt;
    }
  }
  
  // Transform and sort language stats
  const predominantLanguages: LanguageFocus[] = Object.entries(languageStats)
    .map(([language, stats]) => ({
      language,
      repoCount: stats.count,
      starCount: stats.stars
    }))
    // Sort primarily by stars, then by count
    .sort((a, b) => b.starCount - a.starCount || b.repoCount - a.repoCount)
    .slice(0, 5); // top 5
    
  const notableRepos = sortedByStars.slice(0, 5);
  
  // A simplistic maintenance definition: has activity on public repos in the last 6 months
  let isMaintained = false;
  if (latestActivity) {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    isMaintained = latestActivity > sixMonthsAgo;
  }
  
  return {
    predominantLanguages,
    totalStars,
    totalForks,
    activeReposCount,
    notableRepos,
    latestActivity: latestActivity ? latestActivity.toISOString() : null,
    isMaintained
  };
}
