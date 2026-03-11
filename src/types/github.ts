export interface GitHubProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  websiteUrl: string | null;
  twitterUsername: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
}

export interface GitHubOverview {
  pinnedRepos: string[]; // specific notable repo names
  // Depending on what we can parse from HTML for overview
  totalContributionsLastYear: number | null;
}

export interface GitHubRepository {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  isArchived: boolean;
  isFork: boolean;
  parentName?: string;
}
