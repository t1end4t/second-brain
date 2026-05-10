# AGENTS.md

This is a **PARA knowledge vault** — not a software repo.
Treat everything here as knowledge organization, not engineering scaffolding.

---

## Vault Structure

| Folder | Purpose |
|---|---|
| `1-Projects/` | Active work: planning, tasks, experiments |
| `2-Areas/` | Ongoing responsibilities with no end date |
| `3-Resources/` | Processed knowledge: papers, blogs, wiki, raw sources |
| `4-Archive/` | Completed or inactive items — mostly read-only |
| `_templates/` | Structural templates only — not PARA content |

---

## Default Behavior

- **Clarify before acting.** If the request is ambiguous, reflect with the user first.
- **Capture context before jumping to actions.** When the user is explaining background, write it into the relevant project note, then suggest next steps.
- **Create only the minimal structure needed.** Propose new conventions for review before creating files.
- **Don't duplicate across PARA layers.** Projects link to resources via `[[wiki-links]]`; they don't copy or co-locate resource content.

---

## Projects (`1-Projects/`)

Each project lives in `1-Projects/{project-name}/` and uses templates from `_templates/project/`.

**Core files (always create):**

- `Project.md` — raw user thinking: motivation, constraints, open questions. Preserve the user's voice; messy is fine.
- `Brief.md` — LLM-synthesized summary built from `Project.md` + linked resources. Clean, readable cold. Regenerate when direction changes.
- `TODO.md` — phased action plan: Now / Next / Later / Done.

**Target sync:**

- If a project has an execution repo or target folder, sync project context into that target's `docs/` folder.
- The vault remains the source of truth for thinking; the target `docs/` folder receives execution-ready context.
- Ask for the target folder before syncing if it is not already known.
- Do not create `_bridge.md`; track the target path in project metadata or `Project.md` only when needed.
- Sync only useful project context, usually `Brief.md`, `TODO.md`, and any relevant decisions/results. Do not copy raw resources wholesale.

**Extended files (add when the project warrants):**

- `Experiments.md` — append-only log: hypothesis → setup → result → conclusion.
- `Decisions.md` — key choices and rationale. Prevents revisiting settled debates.
- `Dead-ends.md` — failed ideas and why. Not all dead ends are experiments.
- `Results.md` — meaningful findings and conclusions.

**When the user shares project context:** update `Project.md` first, then regenerate `Brief.md`.

**When finishing work from an execution repo**, remind the user to:
- Check off items in `TODO.md`
- Log experiments, decisions, dead ends, results
- Update `Brief.md` if direction changed

---

## Execution Target Sync

Each execution repo or target folder should receive synced project context under `docs/`, for example:

- `docs/Brief.md` — current project summary and direction
- `docs/TODO.md` — current Now / Next / Later / Done plan
- `docs/Decisions.md` — synced only when decisions matter for execution
- `docs/Results.md` — synced only when results matter for execution

Target-side agent behavior:

- Read `docs/Brief.md` and `docs/TODO.md` before starting execution work.
- Treat the target folder as the execution workspace.
- Do not edit the vault unless explicitly asked.
- After execution work, report what changed so the vault project files can be updated.

From the vault side: update `Project.md`, regenerate `Brief.md` when direction changes, update `TODO.md` as work progresses, then re-sync the target `docs/` folder.

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
