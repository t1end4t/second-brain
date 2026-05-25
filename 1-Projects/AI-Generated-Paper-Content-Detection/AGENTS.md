# AI-Generated Paper Content Detection

## Context Loading Protocol

Default read order: `Brief.md` -> `TODO.md`.

Read `Project.md` only when the task needs raw motivation, open questions, or original source notes.

Read other files only if the task actually requires them:
- `Experiments.md` when testing agent runs or heuristics.
- `Decisions.md` when checking or revisiting design choices.
- `Results.md` when checking findings.
- `Dead-ends.md` when revisiting abandoned ideas.
- `SYNC_STATUS.md` only before/after sync operations.

## Project Intent

This project is intentionally simple. The goal is a custom agent for coding agents, not a production detection platform.

The agent should:
- collect evidence,
- highlight suspicious passages,
- protect against ESL / formal-writing / translation false positives,
- and avoid binary accusations.

## Working Style

- Keep changes minimal and agent-friendly.
- Preserve passage spans and offsets whenever possible.
- Prefer small composable heuristics over complex pipelines.
- Start with markdown/plain text first.

## Write Rules

- Update `Project.md` with raw user context.
- Update `Brief.md` when direction changes.
- Update `TODO.md` when tasks move.
- Log important choices in `Decisions.md`.
- Log tests and findings in `Experiments.md` and `Results.md`.

## Sync Status

- If `Brief.md`, `TODO.md`, `Decisions.md`, or `Results.md` change, mark `SYNC_STATUS.md` as `vault-ahead`.
- If target docs change and vault is unchanged, mark `target-ahead`.
- If both changed, mark `conflict` and ask the user.
