# INDEX — PARA Vault Map

Orientation map for this vault. Operating rules live in `AGENTS.md`.

## Top-Level Layout

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

## File Layout Per Scope

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
