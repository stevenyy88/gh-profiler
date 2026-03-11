import { fetchProfile, fetchOverview, fetchRepositories } from '../src/lib/github/fetcher';
import { describe, it, expect, vi } from 'vitest';

describe('GitHub Fetcher', () => {
  it('should be defined', () => {
    expect(fetchProfile).toBeDefined();
    expect(fetchOverview).toBeDefined();
    expect(fetchRepositories).toBeDefined();
  });
});
