# AGENTS.md

This is a **PARA knowledge vault**, not a software repo. Treat files as personal knowledge, plans, and source notes. Optimize for clarity, preservation of user intent, and minimal edits.

## Priority

1. User request in the current conversation.
2. Explicit skill instructions when a skill is triggered.
3. This vault guide.
4. Existing local file style.

If instructions conflict, follow the higher-priority item and mention the conflict briefly.

## Vault Map

| Path | Purpose |
|---|---|
| `1-Projects/` | Active outcomes, plans, tasks, decisions, findings |
| `2-Areas/` | Ongoing responsibilities, habits, learning domains |
| `3-Resources/` | Raw sources, converted notes, compiled wiki, outputs |
| `4-Archive/` | Completed/inactive material; mostly read-only |
| `daily/` | Daily plans and logs |
| `weekly/` | Weekly plans and reviews |
| `_templates/` | Templates only |
| `inbox.md` | Quick capture |

## Default Behavior

- Clarify only when ambiguity could cause wrong edits; otherwise make a small reasonable assumption and proceed.
- Preserve the user's wording in project notes when capturing context.
- Make the smallest change that satisfies the request.
- Do not create new systems, folders, templates, or conventions unless asked.
- Do not duplicate content across PARA layers; link with `[[wiki-links]]` when useful.
- Do not edit `3-Resources/wiki/` directly unless a KB skill instructs it.

## File Conventions

### Projects: `1-Projects/{name}/`

- `INDEX.md` — annotated onboarding guide: key files, links, owner/context, when to read.
- `project.md` — raw thinking: motivation, constraints, open questions.
- `tasks.md` — action plan using `Now`, `Next`, `Later`, `Waiting`, `Done`.
- `decisions.md` — optional decisions and rationale.
- `results.md` — optional findings and conclusions.

### Areas: `2-Areas/{name}/`

- `Overview.md` — scope, direction, why it matters.
- `TODO.md` — ongoing tasks using `Now`, `Next`, `Waiting`, `Done`.

### Time Notes

- `daily/{YYYY-MM-DD}.md` uses `_templates/planning/daily.md`.
- `weekly/{YYYY-Www}.md` uses `_templates/planning/weekly.md`.

## What To Read

When scope is named, read only that project/area plus directly related time notes.

When scope is broad or unnamed, use this table:

| User asks | Read |
|---|---|
| `todo list`, `what should I do`, `current tasks`, `next actions` | current `weekly/*.md`, today's `daily/*.md` if present, `inbox.md`, all `1-Projects/*/tasks.md`, all `2-Areas/*/TODO.md` |
| `plan my day` | use `daily-planning` skill |
| `process inbox` | use `inbox-processing` skill |
| `weekly review`, `review the week` | use `weekly-review` skill |
| source/paper ingestion | use `kb-ingest` skill |
| compile/organize KB | use `kb-compile` skill |
| answer from KB/wiki | use `kb-answer` skill |
| KB cleanup/health check | use `kb-health` skill |

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
