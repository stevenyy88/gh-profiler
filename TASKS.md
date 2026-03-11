# TASKS

## Phase 1 - Planning
- [ ] Review requirements
- [ ] Define architecture
- [ ] Define data model
- [ ] Define security boundaries
- [ ] Define extraction strategy
- [ ] Define deterministic summary rules

## Phase 2 - Project Setup
- [ ] Initialize Next.js 16 app with TypeScript
- [ ] Configure strict TypeScript
- [ ] Configure linting and formatting
- [ ] Create folder structure
- [ ] Add environment variable scaffolding
- [ ] Add testing scaffolding

## Phase 3 - Types and Contracts
- [ ] Create `types/github.ts`
- [ ] Create `types/api.ts`
- [ ] Define request/response contracts
- [ ] Define warning/error types
- [ ] Define summary section types

## Phase 4 - Input Validation
- [ ] Implement GitHub URL validator
- [ ] Implement URL normalizer
- [ ] Reject unsupported paths
- [ ] Add unit tests for validation and normalization

## Phase 5 - GitHub Data Layer
- [ ] Implement safe fetch utility
- [ ] Restrict allowed domains
- [ ] Implement public profile fetcher
- [ ] Implement repository fetcher
- [ ] Implement overview fetcher
- [ ] Implement parser utilities
- [ ] Add parser fixtures and tests

## Phase 6 - Summary Engine
- [ ] Build deterministic summary rules
- [ ] Compute repository statistics
- [ ] Compute language focus
- [ ] Compute maintenance signals
- [ ] Compute notable repositories
- [ ] Produce structured summary
- [ ] Add unit tests for summary logic

## Phase 7 - API Route
- [ ] Implement `POST /api/summarize`
- [ ] Validate request body with zod
- [ ] Connect validation, extraction, and summary modules
- [ ] Return warnings/errors cleanly
- [ ] Add integration tests

## Phase 8 - Frontend UI
- [ ] Build URL input form
- [ ] Build loading state
- [ ] Build status banner
- [ ] Build profile card
- [ ] Build overview panel
- [ ] Build repositories table
- [ ] Build summary panel
- [ ] Build JSON viewer
- [ ] Add reset and copy actions
- [ ] Add responsive styling

## Phase 9 - Hardening
- [ ] Add endpoint rate limiting
- [ ] Add timeout handling
- [ ] Add partial-failure handling
- [ ] Add structured logging
- [ ] Add sanitization review
- [ ] Add security notes to docs

## Phase 10 - Documentation
- [ ] Write README
- [ ] Write INSTALL
- [ ] Write FEATURES
- [ ] Write ARCHITECTURE
- [ ] Write API docs
- [ ] Write SECURITY
- [ ] Write CHANGELOG

## Definition of Done
- [ ] app runs locally
- [ ] summarize endpoint works
- [ ] results render correctly
- [ ] tests pass
- [ ] docs complete
- [ ] security assumptions documented