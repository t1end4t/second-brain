# Research Workspace

Local-first workspace for questions, claims, evidence, experiments, and focused research tasks. Root: `/home/tiendat/second-brain`.

## Instructions and working notes

| Path | Responsibility |
| --- | --- |
| `AGENTS.md` | Thinking modes; permission to edit research files during brainstorming |
| `VAULT_OPERATIONS.md` | Record schemas, safe external edits, and app refresh checks |
| `CLAUDE.md` | Reference to the same workspace instructions |
| `briefs/` | Plain Markdown problem briefs; not shown as app records |
| `briefs/TEMPLATE.md` | Starting format, not an active research problem |

## App-visible records

| Path | App surface |
| --- | --- |
| `research/map/` | Questions, claims, evidence, and links |
| `research/survey/` | Open problems and candidate questions |
| `research/papers/` | Papers |
| `research/experiments/` | Experiment plans and artifacts |
| `tasks/direction/` | Goals |
| `tasks/pipeline/` | Tasks |
| `tasks/reviews/` | Weekly reviews |
| `learn/board/` | Learning boards; also used by Today |
| `runtime/` | Services, models, runs, automations, and targets |

Use the collection table in `VAULT_OPERATIONS.md` for exact record locations. A plain Markdown note is not an app record. Manuscript data remains in browser storage.

## Schema references

Record fields live in `VAULT_OPERATIONS.md` under "Create". Use that file, not the source below. The Thinking OS source at `/home/tiendat/codebases/side-projects/thinking-os` is only for confirming a suspected schema change; update `VAULT_OPERATIONS.md` in the same turn if it drifted.

| Source path | Responsibility |
| --- | --- |
| `src/types.ts` | Research records and links |
| `src/productivityTypes.ts` | Tasks and runtime records |
| `src/learnTypes.ts` | Learning records |
| `server/vault.mjs` | Collection paths and Markdown/JSON serialization |

## Open work

No active problem brief was created during initialization. Add links here when actual problems have briefs.

Last updated: 2026-09-10
