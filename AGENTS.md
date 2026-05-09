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
- `_bridge.md` — links this thinking space to its execution repo (path, type, sync checklist).

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

## Execution Repo Bridge

Each execution repo under `codebases/` should have an `AGENTS.md` or `CLAUDE.md` that:
- Points to `second-brain/1-Projects/{name}/`
- Instructs the agent to read `Brief.md` and `TODO.md` before starting
- Forbids editing files outside the execution repo

See `_templates/execution-repo-AGENTS-snippet.md` for the standard snippet.
From the vault side: read `_bridge.md` to find the linked repo and check what needs syncing.

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
