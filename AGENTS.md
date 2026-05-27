# AGENTS.md

This is a **PARA knowledge vault** — not a software repo.
Treat everything here as knowledge organization, not engineering scaffolding.

---

## Vault Structure

| Folder | Purpose |
|---|---|
| `1-Projects/` | Active work: planning, tasks, experiments |
| `2-Areas/` | Ongoing domains: responsibilities, life systems, learning topics, research interests |
| `3-Resources/` | Processed knowledge: papers, blogs, wiki, raw sources |
| `4-Archive/` | Completed or inactive items — mostly read-only |
| `_templates/` | Structural templates only — not PARA content |
| `daily/` | Daily planning files (one per day) |
| `weekly/` | Weekly review files (one per week) |
| `inbox.md` | Quick capture for ideas, tasks, thoughts |

---

## Default Behavior

- **Clarify before acting.** If the request is ambiguous, reflect with the user first.
- **Capture context before jumping to actions.** When the user is explaining background, write it into the relevant project note, then suggest next steps.
- **Create only the minimal structure needed.** Propose new conventions for review before creating files.
- **Don't duplicate across PARA layers.** Projects link to resources via `[[wiki-links]]`; they don't copy or co-locate resource content.

---

## File Conventions

### Project files (`1-Projects/{name}/`)
- `project.md` — raw user thinking: motivation, constraints, open questions. Preserve the user's voice; messy is fine.
- `tasks.md` — phased action plan: Now / Next / Later / Waiting / Done.
- `decisions.md` — (optional) key choices and rationale.
- `results.md` — (optional) meaningful findings and conclusions.

### Area files (`2-Areas/{name}/`)
- `Overview.md` — what this area is, why it matters, current direction.
- `TODO.md` — ongoing tasks: Now / Next / Waiting / Done.

### Daily files (`daily/{YYYY-MM-DD}.md`)
- Time blocks, priorities, capture, reflection.

### Weekly files (`weekly/{YYYY-Www}.md`)
- Weekly review: what happened, what's next, outcomes.

---

## Daily Planning

When the user says "plan my day", "what should I work on", or similar:

1. Read `inbox.md` for uncaptured items.
2. Read all `1-Projects/*/tasks.md` for active project tasks.
3. Read relevant `2-Areas/*/TODO.md` for area tasks.
4. Check yesterday's `daily/` file for unfinished items.
5. Create today's `daily/{YYYY-MM-DD}.md` with:
   - Main outcome (1 thing)
   - Secondary actions (2-3 things)
   - Time blocks (morning = deep work, afternoon = shallow/admin)
   - Capture section for the day
6. Update project `tasks.md` files if priorities shift.

### Daily file format:
```markdown
# {YYYY-MM-DD}

## Main Outcome
- 

## Secondary
- [ ] 
- [ ] 

## Time Blocks
- Morning (deep work): 
- Afternoon: 

## Capture
<!-- Ideas, tasks, thoughts during the day -->

## End of Day
<!-- What got done. What's next. -->
```

---

## Inbox Processing

When the user says "process inbox" or during daily planning:

1. Read `inbox.md`.
2. For each item:
   - `[task]` → move to relevant project `tasks.md` (Now/Next/Later)
   - `[idea]` → move to relevant project `project.md` under Open Questions, or create new project
   - `[read]` → move to `2-Areas/reading/TODO.md` or project tasks
   - `[thought]` → move to relevant project `project.md` or daily file
3. Clear processed items from `inbox.md`.

---

## Weekly Review

When the user says "weekly review" or at start of week:

1. Read all `daily/` files from the past week.
2. Read all `1-Projects/*/tasks.md` for stale items, blockers, next actions.
3. Read relevant `2-Areas/*/TODO.md`.
4. Create `weekly/{YYYY-Www}.md` with:
   - What got done this week
   - What's blocked or stale
   - Outcomes for next week
   - Priority adjustments
5. Clean up stale tasks (move to Later, Waiting, or Done).

### Weekly file format:
```markdown
# Week {YYYY-Www}

## This Week's Outcomes
- 

## What Got Done
- 

## Blocked / Stale
- 

## Next Week
- 

## Priority Shifts
<!-- Move items between Now/Next/Later as needed -->
```

---

## End of Day

When the user says "end of day" or "close out":

1. Move completed items to `Done` with date in relevant `tasks.md`.
2. Record blockers or waiting states.
3. Add important context to `project.md` or daily file.
4. Leave a clear next action for tomorrow.

---

## Project Lifecycle

### Create
1. Create `1-Projects/{name}/` with `project.md` and `tasks.md` from templates.
2. If the project has an execution repo:
   - Copy `SYNC_STATUS.md` and `scripts/sync-project-context.sh` from `_templates/project/`.
   - Set target path in `SYNC_STATUS.md`.
   - Run `./scripts/sync-project-context.sh push` to initialize target `docs/`.
   - Note the execution repo path in `project.md`.

### Work
- Update `tasks.md` as work progresses.
- Log important choices in `decisions.md` (create when needed).
- Log findings in `results.md` (create when needed).

### Archive
When the user says this project is done:
1. Move `1-Projects/{name}/` to `4-Archive/`.
2. No other changes needed.

---

## Project Sync

Projects with execution repos sync notes bidirectionally via `scripts/sync-project-context.sh`.

### Synced files

- `project.md`, `tasks.md`, `decisions.md`, `results.md` — same names on both sides.

### When to sync

- **After editing vault project notes** → run `push` or remind user.
- **After execution repo work** → run `pull` or remind user.
- **Before starting work on a project** → check `status` for stale state.

### Commands

```sh
# From vault project folder (1-Projects/{name}/):
./scripts/sync-project-context.sh status    # check sync state
./scripts/sync-project-context.sh push      # vault -> execution repo
./scripts/sync-project-context.sh pull      # execution repo -> vault
```

Load the `project-sync` skill for detailed sync instructions.

---

## Cross-Project Visibility

To see all active work, read:
- `1-Projects/*/tasks.md` — all project tasks
- `2-Areas/*/TODO.md` — all area tasks
- `inbox.md` — uncaptured items

---

## Reading Workflow

### Track reading
- General reading list: `2-Areas/reading/TODO.md`
- Project-specific reading: in project `tasks.md`

### When user finishes reading
1. If user says "I read X" or "process this paper":
   - Ingest into `3-Resources/` using knowledge base pipeline
   - Move task to `Done` in relevant `tasks.md` or `2-Areas/reading/TODO.md`
   - Link to wiki entries in project `project.md` if relevant

---

## Knowledge Base Pipeline (`3-Resources/`)

Raw sources are ingested, compiled into a living wiki, queried via Q&A, and maintained via health checks. **The wiki is LLM-maintained — never edit it directly.**

**Layout:**

```
3-Resources/
├── raw/          ← source documents (PDFs, DOCX, web clips)
├── wiki/
│   ├── _index.md     ← master concept index
│   ├── _sources.md   ← source index with summaries + wiki links
│   ├── concepts/     ← encyclopedia-style concept articles
│   └── articles/     ← topic articles, Q&A outputs, synthesis
└── outputs/      ← slides, plots, reports (created on first use)
```

**Pipeline stages** (each has a skill in `.agents/skills/`):

| Trigger | Skill | Action |
|---|---|---|
| User provides a source | `kb-ingest` | Convert to markdown in `raw/`, append to `_sources.md` |
| User asks to compile/organize | `kb-compile` | Generate wiki articles, enrich `_sources.md` with links, update `_index.md` |
| User asks a question | `kb-answer` | Answer against the wiki, file useful outputs to `wiki/articles/` |
| User asks to check/lint | `kb-health` | Fix unambiguous issues, surface ambiguities to user |

**`_sources.md` ownership:** `kb-ingest` creates entries; `kb-compile` enriches them with wiki links. Both append — neither overwrites the other.

All generated outputs go in `3-Resources/outputs/`.
