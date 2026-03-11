---
description: "Syncs local changes with GitHub, strictly enforcing documentation updates."
---

# Sync Repository Workflow (Strict)

## Step 0: Documentation Audit (BLOCKER)
1.  **Analyze:** Run `git status` and `git diff --name-only`.
2.  **Logic Check:**
    * Did `.py` or `.tsx` files change? -> **Requirement:** `CHANGELOG.md` must be modified.
    * Did `package.json` or `pyproject.toml` change? -> **Requirement:** `INSTALL.md` must be modified.
3.  **Enforcement:**
    * **IF** requirements are met: Proceed to Step 1.
    * **IF** `CHANGELOG.md` is missing from the modified list:
        * **STOP.**
        * **Action:** Generate the missing CHANGELOG entry for the user.
        * **Prompt User:** "I noticed code changes but no Changelog update. I have drafted one for you. Shall I commit it?"

## Step 1: Pull Latest Changes
1.  **Pull:** `git pull origin <current_branch> --rebase`.
    * *Conflict Policy:* If conflict, ABORT and alert user.

## Step 2: Stage and Commit
1.  **Stage:** `git add .`
2.  **Commit:** `git commit -m "[Conventional Commit Message]"`
    * *Note:* Ensure the message matches the `CHANGELOG.md` entry.

## Step 3: Push
1.  **Push:** `git push origin <current_branch>`.
2.  **Verify:** `git log -1`.
3.  **Report:** "✅ Sync complete. Documentation is up to date."