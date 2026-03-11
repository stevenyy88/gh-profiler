import { z } from 'zod';

// Basic GitHub username rules:
// - alphanumeric with single hyphens
// - cannot begin or end with a hyphen
// - max 39 characters
const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

const urlSchema = z.string().url();

export function validateGitHubUrl(inputUrl: string): { valid: boolean; username?: string; error?: string } {
  try {
    let parsedUrl = inputUrl;
    
    // Add protocol if missing
    if (!parsedUrl.startsWith('http')) {
      parsedUrl = 'https://' + parsedUrl;
    }
    
    const url = new URL(parsedUrl);
    
    // Allow github.com or www.github.com
    if (url.hostname !== 'github.com' && url.hostname !== 'www.github.com') {
      return { valid: false, error: 'Must be a github.com URL' };
    }
    
    const parts = url.pathname.replace(/^\/|\/$/g, '').split('/');
    
    if (parts.length === 0 || parts[0] === '') {
      return { valid: false, error: 'Missing username in URL' };
    }
    
    if (parts.length > 1) {
      return { valid: false, error: 'URL must point to a user profile, not a repository or subpage' };
    }
    
    const username = parts[0];
    
    // Check against common reserved paths (e.g. settings, explore)
    const reservedPaths = new Set(['settings', 'explore', 'trending', 'topics', 'pricing', 'about', 'contact', 'search']);
    if (reservedPaths.has(username.toLowerCase())) {
      return { valid: false, error: 'URL points to a reserved GitHub path' };
    }
    
    if (!GITHUB_USERNAME_REGEX.test(username)) {
      return { valid: false, error: 'Invalid GitHub username format' };
    }
    
    return { valid: true, username };
    
  } catch (err) {
    return { valid: false, error: 'Invalid URL format' };
  }
}

export function normalizeGitHubUrl(inputUrl: string): string {
  const result = validateGitHubUrl(inputUrl);
  if (!result.valid || !result.username) {
    throw new Error(result.error || 'Invalid URL');
  }
  return `https://github.com/${result.username}`;
}
