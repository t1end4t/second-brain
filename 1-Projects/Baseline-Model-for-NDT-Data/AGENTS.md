# Project Sync Instructions

This folder is the second-brain source of truth for `Baseline-Model-for-NDT-Data`.

## Read First

- Read `Project.md`, `Brief.md`, and `TODO.md` before project work.
- Read `SYNC_STATUS.md` before editing synced context.
- If an execution target is listed in `SYNC_STATUS.md`, target docs live in that folder's `docs/` directory.

## Write Rules

- Capture raw user context in `Project.md` first.
- Regenerate `Brief.md` only when project direction or constraints change.
- Update `TODO.md` when tasks move between Now / Next / Later / Done.
- Log important choices in `Decisions.md`, experiments in `Experiments.md`, dead ends in `Dead-ends.md`, and findings in `Results.md`.
- Do not copy raw resources into the target repo. Link them from vault notes.

## Sync Status

- If you edit `Brief.md`, `TODO.md`, `Decisions.md`, or `Results.md`, update `SYNC_STATUS.md` to `Status: vault-ahead`.
- If you import target-side docs back into this folder, update `SYNC_STATUS.md` to `Status: synced` after verifying both sides match.
- If target docs changed and vault has not been updated, set or preserve `Status: target-ahead`.
- If both sides changed, set `Status: conflict` and ask the user before overwriting anything.

## Reminders

At the end of work, if `SYNC_STATUS.md` is not `Status: synced`, remind the user to run:

```sh
./scripts/sync-project-context.sh status
```

Then suggest the appropriate sync command shown by the script.
