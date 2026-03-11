# Architecture

This app uses Next.js 16.1 App Router.

## Layers

- **Client (`src/components/`, `src/app/page.tsx`)**: React 19 components for requesting data and rendering JSON to visual outputs.
- **API Boundary (`src/app/api/summarize/route.ts`)**: The sole Next.js backend endpoint handling the request JSON, enforcing validation, and coordinating fetch + summarize logics.
- **Extractor (`src/lib/github/fetcher.ts`)**: Wraps `fetch` via AbortController and SSRF-blocked constraints for public API requests.
- **Summary Logic (`src/lib/summary/engine.ts`)**: Pure parsing, counting and aggregating engine taking `GitHubRepository` standard types.

## Determinism
By strictly mapping data -> logic -> UI, we bypass AI summarization to retain factuality in the MVP.
