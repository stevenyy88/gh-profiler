# MEMORY

## Product Memory
This application summarizes a public GitHub user account from:
- profile
- overview
- repositories

The app is not a repo analyzer for a single repository.
It is not an authenticated GitHub client.
It is not an organization analyzer for MVP.

## Stack Memory
- React 19.2
- Next.js 16.1.6 App Router
- TypeScript 5.9
- Node 25.8.0

## Engineering Memory
- Keep the summary engine deterministic for MVP
- Prefer GitHub public API for structured metadata
- Supplement with server-side HTML parsing only when necessary
- Never scrape from the browser
- Prevent SSRF strictly
- Allow only GitHub public domains
- Handle partial failures with warnings
- Keep UI clean and responsive
- Use strict TypeScript interfaces

## UX Memory
The user journey is:
1. paste GitHub profile URL
2. click Analyze
3. see extracted profile, overview, repos, and summary
4. optionally inspect JSON
5. reset and analyze another account

## Quality Memory
- facts must remain factual
- inferences must be labeled carefully
- do not overclaim expertise or identity
- no fabricated activity metrics
- no brittle architecture
- tests required for critical logic

## Output Memory
The app should return:
- normalized input
- profile data
- overview data
- repositories list
- generated summary
- warnings
- errors
- generated timestamp