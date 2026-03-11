# Security

## Threat Models Mitigated
1. **SSRF**: Checked server-side at validation and fetch layer:
   - Must match regex of pure username
   - Must not map to subpaths
   - `fetch` explicitly only fires at `api.github.com` or `github.com`.
2. **Denial of Service**: Uses a 10s `AbortSignal` for every server-side `fetch`.
3. **Data Leaks**: MVP handles entirely public information without tokens or user auth.
4. **XSS / HTML Injection**: `dangerouslySetInnerHTML` is avoided entirely. Everything from the parsed overview (pinned repos, total contributions) limits its matched variables via strict integers or filtered content (alphanumeric paths).

## Assumptions
- Uses purely rate-limited, free tiers of GitHub. Rate limits will safely fallback with `{ success: true, data: ..., warnings: ["..."] }`.
- React automatically escapes string values on the text.
