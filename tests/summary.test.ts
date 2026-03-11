import { computeSummary } from '../src/lib/summary/engine';
import { describe, it, expect } from 'vitest';
import { GitHubRepository } from '../src/types/github';

describe('Deterministic Summary Engine', () => {
  it('computes basic stats correctly', () => {
    const repos: GitHubRepository[] = [
      {
        name: 'repo1',
        description: null,
        language: 'TypeScript',
        stars: 10,
        forks: 2,
        topics: [],
        updatedAt: '2025-01-01T00:00:00Z',
        isArchived: false,
        isFork: false
      },
      {
        name: 'repo2',
        description: null,
        language: 'Rust',
        stars: 50,
        forks: 5,
        topics: [],
        updatedAt: '2026-03-01T00:00:00Z',
        isArchived: false,
        isFork: false
      }
    ];
    
    const summary = computeSummary(repos);
    expect(summary.totalStars).toBe(60);
    expect(summary.totalForks).toBe(7);
    expect(summary.activeReposCount).toBe(2);
    expect(summary.predominantLanguages[0].language).toBe('Rust');
    expect(summary.predominantLanguages[1].language).toBe('TypeScript');
    expect(summary.isMaintained).toBe(true); // Active in 2026-03
  });
});
