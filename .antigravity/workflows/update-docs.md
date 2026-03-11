# /update-docs

**Description:** Analyzes recent code changes and automatically updates the project documentation strictly according to the `.rules` Golden Rule.

## Execution Steps

### Step 1: Analyze Code Changes
1. Run `git diff` and `git diff --cached` to analyze all staged and unstaged changes.
2. Evaluate the diffs to determine the scope of the updates (logic changes, new capabilities, or dependency additions).

### Step 2: Update CHANGELOG.md
1. [cite_start]**Trigger:** If any logic was changed, you must update `CHANGELOG.md`[cite: 2].
2. **Action:** Read the current `CHANGELOG.md`. 
3. **Format:** Look for an existing `## [Unreleased] - YYYY-MM-DD` section using today's date. If it exists, append to it. [cite_start]If it does not exist, create it[cite: 9].
4. [cite_start]**Structure:** Categorize the changes strictly under `### Added`, `### Changed`, or `### Fixed`[cite: 6, 7, 8].

### Step 3: Update FEATURES.md
1. [cite_start]**Trigger:** If the code changes introduce a new functionality that a user or developer would care about, update `FEATURES.md`[cite: 3, 10].
2. [cite_start]**Rule:** Do NOT list internal refactors here; those belong exclusively in the Changelog[cite: 13].
3. **Format:** Append the new feature using the following exact structure:
   * `## [Feature Name]`
   * [cite_start]`- **Description:** [1-2 sentences on what it does]` [cite: 11]
   * [cite_start]`- **Status:** [Beta/Stable]` [cite: 12]
   * [cite_start]`- **Related Files:** [Link to the primary entry point]` [cite: 12]

### Step 4: Update INSTALL.md
1. [cite_start]**Trigger:** If a library was added or a configuration was changed (e.g., `package.json`, `pyproject.toml`, `.env.example`, Docker configurations), update `INSTALL.md`[cite: 4, 14].
2. [cite_start]**Format:** Add the specific installation commands for new packages or document new environment variables with their descriptions[cite: 14, 15].

### Step 5: Finalize and Stage
1. Run `git add CHANGELOG.md FEATURES.md INSTALL.md`.
2. Output: "✅ Documentation successfully generated and staged. You may now run `/auto-commit`."