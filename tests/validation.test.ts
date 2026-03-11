import { validateGitHubUrl, normalizeGitHubUrl } from '../src/lib/validation/url';
import { describe, it, expect } from 'vitest';

describe('GitHub URL Validation', () => {
  it('validates a standard https url', () => {
    const result = validateGitHubUrl('https://github.com/stevenyy88');
    expect(result.valid).toBe(true);
    expect(result.username).toBe('stevenyy88');
  });

  it('tolerates missing protocol', () => {
    const result = validateGitHubUrl('github.com/mdo');
    expect(result.valid).toBe(true);
    expect(result.username).toBe('mdo');
  });

  it('rejects subpaths', () => {
    const result = validateGitHubUrl('https://github.com/stevenyy88/gh-profiler');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/user profile/);
  });

  it('rejects invalid hostnames', () => {
    const result = validateGitHubUrl('https://gitlab.com/stevenyy88');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/github.com URL/);
  });

  it('rejects invalid usernames', () => {
    const result = validateGitHubUrl('https://github.com/foo_bar');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/username format/);
  });

  it('rejects reserved paths', () => {
    const result = validateGitHubUrl('https://github.com/settings');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/reserved/);
  });
});

describe('URL Normalization', () => {
  it('normalizes missing protocol and trailing slashes', () => {
    expect(normalizeGitHubUrl('github.com/stevenyy88/')).toBe('https://github.com/stevenyy88');
  });
});
