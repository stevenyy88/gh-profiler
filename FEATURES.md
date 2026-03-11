# Features

## Core Features
- **URL Validation**: Secure validation for `github.com` profile URLs.
- **Data Fetching**: Directly interacts with GitHub Public API.
- **HTML Parsing Fallback**: Extracts `contributions in the last year` and pinned repository signals from profile HTML directly when unavailable in the core API.
- **Deterministic Summarization**: Computes primary languages, notably starred repositories, total star/fork count, and active maintenance strictly by rules without LLM hallucinations.
- **Resilient Fallbacks**: If standard GitHub calls partial fail, produces warnings without completely blocking the summarized view.
- **Responsive UI**: Responsive UI built with Tailwind CSS.
