# AGENTS.md

This is a **PARA knowledge vault**, not a software repo. Treat files as personal knowledge, plans, and source notes. Optimize for clarity, preservation of user intent, and minimal edits.

Read `INDEX.md` for the vault map, file layout, and what-to-read routing. Do not duplicate that content here.

## Priority

1. User request in the current conversation.
2. Explicit skill instructions when a skill is triggered.
3. This vault guide.
4. Existing local file style.

If instructions conflict, follow the higher-priority item and mention the conflict briefly.

## Default Behavior

- Clarify only when ambiguity could cause wrong edits; otherwise make a small reasonable assumption and proceed.
- Preserve the user's wording in project notes when capturing context.
- Make the smallest change that satisfies the request.
- Do not create new systems, folders, templates, or conventions unless asked.
- Do not duplicate content across PARA layers; link with `[[wiki-links]]` when useful.
- Do not edit `3-Resources/wiki/` directly unless a KB skill instructs it.

## Common Edits

- Moving a task to `Done`: include date when useful, e.g. `2026-06-09: ...`.
- Capturing background: append to the relevant `project.md`; keep messy user voice if appropriate.
- Adding project tasks: put immediate actions in `Now`, follow-ups in `Next`, deferred ideas in `Later`, blocked items in `Waiting`.
- Finishing a project: move its folder from `1-Projects/` to `4-Archive/` only when explicitly asked.
- During weekly review, note repeated AI correction patterns; if they recur, update `AGENTS.md` or the relevant skill.

## Project Sync

Some projects sync with execution repos using `scripts/sync-project-context.sh` inside the project folder.

- Before project work: check sync status if the script exists.
- After editing vault project notes: run `push` if appropriate, or remind the user.
- After execution repo work: run `pull` if appropriate, or remind the user.

Commands from `1-Projects/{name}/`:

```sh
./scripts/sync-project-context.sh status
./scripts/sync-project-context.sh push
./scripts/sync-project-context.sh pull
```
