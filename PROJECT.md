
# 2. `PROJECT.md`

# PROJECT

## Project Name
GitHub Account Summarizer

## Purpose
A web application that accepts a GitHub user profile URL and produces a structured summary of the account using public profile, overview, and repository information.

## Primary User Goal
Help a user quickly understand:
- who the account appears to belong to
- what technical areas the account focuses on
- repository and activity patterns
- notable repositories
- maintenance and freshness signals

## Core Use Case
A user pastes a GitHub account URL such as:
`https://github.com/stevenyy88`

The application:
1. validates the URL
2. extracts the username
3. retrieves public GitHub data
4. summarizes the account
5. displays both structured data and readable insights

## MVP Scope

### In scope
- single GitHub profile URL input
- public profile extraction
- public overview extraction
- public repository extraction
- deterministic summary engine
- responsive web UI
- error and warning handling
- tests and documentation

### Out of scope for MVP
- private GitHub data
- authenticated GitHub integrations
- commit history analysis
- pull request analysis
- issue analysis
- repository README semantic analysis
- LLM-based summarization
- organization profile support

## Success Criteria
The MVP is successful if it can:
- validate GitHub profile URLs correctly
- summarize a public GitHub account reliably
- handle failure cases gracefully
- display useful, evidence-based results
- remain maintainable for future extensions

## Constraints
- use only public data
- do not scrape aggressively
- do not bypass platform restrictions
- deterministic logic only for MVP summary
- stack must remain React + Next.js + TypeScript + Node as specified

## Future Enhancements
- compare two profiles
- org account support
- stars and forks analytics
- repository topic clustering
- language charts
- markdown export
- shareable report URLs
- AI-enhanced explanation layer