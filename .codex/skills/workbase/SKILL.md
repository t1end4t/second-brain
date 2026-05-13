---
name: workbase
description: "Manage a local multi-repo workbase from sync-repos.txt: bootstrap, status, pull/sync clean repos, and safely commit dirty submodules before parent submodule pointers."
---

# Workbase

Use this skill when the user asks to sync, commit, bootstrap, or inspect the local workbase.

## Assumptions

- Work from the repository root that contains `sync-repos.txt`.
- `sync-repos.txt` is the single source of truth.
- Each non-comment line uses: `<git-url> <repo-path>`.
- Repo paths may use `~` or `$HOME`.

## Commands

- Status: `..codex/skills/workbase/scripts/sync-workbase.sh status`
- Pull clean repos: `.codex/skills/workbase/scripts/sync-workbase.sh pull`
- Commit status: `.codex/skills/workbase/scripts/workbase-commit.sh status`
- Commit tracked changes: `.codex/skills/workbase/scripts/workbase-commit.sh commit`
- Commit tracked + untracked: `.codex/skills/workbase/scripts/workbase-commit.sh commit --all`

## Sync Workflow

1. Run status first.
2. If dirty repos exist, tell the user they will be skipped by pull.
3. If the user asks to commit, run commit status before commit.
4. Pull only after dirty work is handled or the user accepts skipped repos.

## Commit Behavior

- Commit dirty submodules first.
- Then commit parent submodule pointers.
- Commit regular parent changes only after submodule pointer commits.
- Default is tracked files only; use `--all` only when the user wants untracked files included.

## Safety

- Never push.
- Never run destructive Git commands.
- Skip merge/rebase/conflict states.
- Do not auto-commit unless the user explicitly asks.
- Report skipped repos and remaining dirty state.
