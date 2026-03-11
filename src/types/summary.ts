import { GitHubProfile, GitHubOverview, GitHubRepository } from './github';

export interface SummaryWarning {
  field: string;
  message: string;
}

export interface LanguageFocus {
  language: string;
  repoCount: number;
  starCount: number;
}

export interface DeterministicSummary {
  predominantLanguages: LanguageFocus[];
  totalStars: number;
  totalForks: number;
  activeReposCount: number;
  notableRepos: GitHubRepository[]; // repos with highest stars
  latestActivity: string | null; // ISO string of latest interaction from repos
  isMaintained: boolean; // Based on latestActivity
}

export interface ProfileOutput {
  username: string;
  profile: GitHubProfile;
  overview: GitHubOverview;
  repositories: GitHubRepository[];
  summary: DeterministicSummary;
  warnings: SummaryWarning[];
  generatedAt: string;
}
