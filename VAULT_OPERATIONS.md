# Vault Operations

Where workspace records live and how to change them. Read with the workspace AGENTS.md. Applies only inside the configured workspace vault, not inside an experiment-code repository. This vault root is `~/second-brain`. All paths below are relative to that root.

## Shape

Every entity is two files sharing one ID: `<id>.md` for prose, `<id>.json` for structured metadata. The filename is the ID and the key other records link to. Links are single JSON files.

Top-level folders follow the workspace tabs; nested folders follow their subtabs. Shared collections stay together rather than being duplicated for filtered views.

```text
tasks/
  direction/
  pipeline/
  reviews/
runtime/
  services/
  llm-models/
  agent-jobs/
    runs/
    automations/
    targets/
research/
  map/
    questions/
    claims/
    evidence/
    links/
  survey/
    open-problems/
    candidates/
  papers/
  experiments/
learn/
  board/
```

Existing flat vaults migrate automatically on load or save. Migration copies and verifies all legacy record files before removing the originals, preserving IDs and file contents. Different contents at the same destination stop migration without overwriting either version; resolve the conflict before continuing. Unrelated files remain in their original directories; only empty legacy directories are removed.

Learn Today reads the same boards, so it has no separate collection. Runtime Environment edits external configuration files and repository templates, not vault records. Manuscript remains in browser storage. These views do not create placeholder vault folders.

| Record | Directory | Markdown body |
| --- | --- | --- |
| Question | `research/map/questions/` | question text |
| Claim | `research/map/claims/` | claim text |
| Evidence | `research/map/evidence/` | evidence title |
| Open problem | `research/survey/open-problems/` | problem text |
| Candidate question | `research/survey/candidates/` | question title |
| Paper | `research/papers/` | `# title` then extracted markdown |
| Experiment | `research/experiments/` | experiment title |
| Task | `tasks/pipeline/` | `# title` then description |
| Goal | `tasks/direction/` | `# title` then description |
| Weekly review | `tasks/reviews/` | `# title` then notes |
| Learning unit | `learn/board/` | `# title` then description |
| Service | `runtime/services/` | service name |
| Run | `runtime/agent-jobs/runs/` | run name |
| Model | `runtime/llm-models/` | model name |
| Automation | `runtime/agent-jobs/automations/` | automation name |
| Target | `runtime/agent-jobs/targets/` | target name |
| Link | `research/map/links/<id>.json` | none |

INDEX.md and problem briefs are plain documents with no sidecar. Keep them outside collection directories: snapshot synchronization can delete unrecognized Markdown and JSON files there. Experiment records describe plans and artifacts; experiment source code belongs in the target repository.

## Before writing

- When the app's assistant works in this vault, edit files directly. The app saves pending changes before the turn, pauses its autosave while you work, and reloads the vault from disk when the turn ends. Do not ask me to close tabs. Verify files directly during the turn; vault API requests wait until it finishes. Use one Thinking OS server for this vault.
- If the app reports that the workspace changed or that a refresh failed, stop and report it. Do not repeat writes to force a save.
- Outside the running app, another Thinking OS tab may still autosave over external edits. In that case, ask me to close tabs using this vault first.
- The app rejects a stale save instead of overwriting newer files. Report the exact paths you changed so I can confirm them on the affected surface.
- Read the existing record and a sibling record. Preserve unknown metadata fields. The Create section below is the schema of record: use it and do not open the Thinking OS source repository for routine record work. Siblings are examples, not permission to copy their IDs or results. If a field is genuinely absent from this file, ask instead of inventing keys.
- Back up affected files outside synchronized collection directories before editing or deleting them.
- Say which files you will create, edit, or delete, and wait for confirmation when the change is not clearly implied by my request.

## Create

- Write both files together. An `.md` without its `.json` is an incomplete record.
- Use a unique filename-safe ID; check that neither file exists before creating it. Match the sidecar's `id` to the filename. Never rename an ID to correct a title.
- Where the schema supports them, set `author` to your actual agent identity (`model:<name>`, or `model` if unknown), never `user`, and set `createdAt` from the current time in the collection's required format. Research timestamps use epoch milliseconds; task timestamps are strings. Do not add unsupported fields.
- A new link needs a non-empty `userReason`. If I did not state a reason, ask for it. Do not write the reason for me.
- The workspace permits useful drafts during brainstorming without separate approval for each file. Keep proposed claims and tasks provisional using the schema's existing states and clear prose. Do not create evidence from speculation or mark a proposal as an accepted decision. Ask when meaning, provenance, or required fields cannot be established.

### Create a task

Create `tasks/pipeline/<id>.md` containing `# <title>`, a blank line, and the description. Create `tasks/pipeline/<id>.json` with `id`, `status`, `priority`, `tag`, `createdAt` (a current ISO timestamp string), `author`, and `lastEditedBy`. Unless specified, use `backlog`, `medium`, and `task`. Status must be backlog / todo / in-progress / review / done; priority must be low / medium / high / urgent. Add optional `goalId` only for an existing goal. Keep title and description in Markdown, not duplicated in the sidecar.

### Create a goal

Create `tasks/direction/<id>.md` containing `# <title>`, a blank line, and the description. Create `tasks/direction/<id>.json` with `id`, `horizon`, `status`, `createdAt` (a current ISO timestamp string), `author`, and `lastEditedBy`. Horizon must be one-year / five-year; status must be active / achieved / paused. Optional fields: `targetDate`, `parentGoalId` (an existing goal, normally the five-year goal a one-year goal serves), and `isCurrentFocus`. Unless specified, use `active` and omit the optional fields. Keep title and description in Markdown, not duplicated in the sidecar.

A five-year goal is a north star: one observable end state per record, not a list. Keep unaccepted candidates in a brief under `briefs/`, not as goal records.

### Create a research record

Research timestamps are epoch milliseconds. Every record is an `.md` plus a `.json` sidecar with the same ID; the sidecar never repeats the Markdown body.

| Record | Markdown body | Required sidecar fields | Optional sidecar fields |
| --- | --- | --- | --- |
| Question | question title, no `#` | `id`, `tags`, `createdAt`, `author` | none |
| Claim | claim text, no `#` | `id`, `rejected`, `createdAt`, `author` | `rejectionReason` (required when `rejected` is true) |
| Evidence | evidence title | `id`, `origin`, `form`, `citation`, `createdAt`, `author` | `paperId`, `validity`, `validityReason` |
| Open problem | problem text | `id`, `citation`, `createdAt` | `candidateId` |
| Candidate question | question title | `id`, `openProblemIds`, `createdAt` | `promotedQuestionId` |
| Experiment | experiment title | `id`, `claimId`, `questionId`, `status`, `targetMetric`, `baseline`, `prediction`, `failureCondition`, `scope`, `artifacts` | none |
| Link | none; JSON only | `id`, `kind`, `parentId`, `childId`, `status`, `userReason`, `createdAt`, `author` | `check` |

Enumerations: evidence `origin` is literature / experiment / own_reasoning; evidence `form` is measurement / derivation / counterexample; `validity` is unassessed / valid / invalid / uncertain; experiment `status` is planned / running / done; link `kind` is question-claim / claim-evidence; link `status` is holds / weak / missing.

A link ID follows `<parentId>--<childId>`. An experiment artifact needs `id`, `name`, `type` (plot / table / notes / checkpoint), `path`, `contentHash`, and `status` (present / missing); `observation` is required once the experiment is done. Set `validity` only from an assessment I made or requested, never from your own reading.

### Create a runtime record

The Markdown body is the bare name with no `#`. Sidecars carry no `lastEditedBy`.

| Record | Directory | Required sidecar fields | Enumerations |
| --- | --- | --- | --- |
| Service | `runtime/services/` | `id`, `port` (number or null), `command`, `status` | status: running / idle / stopped |
| Run | `runtime/agent-jobs/runs/` | `id`, `status`, `target`, `duration`, `resourceLock`, `timestamp` | status: running / completed / failed / queued |
| Model | `runtime/llm-models/` | `id`, `hash`, `quantization`, `parameters`, `contextLength`, `vramRequired`, `status` | status: loaded / ready / downloading |
| Automation | `runtime/agent-jobs/automations/` | `id`, `trigger`, `action`, `target`, `enabled`, `lastRun` | none |
| Target | `runtime/agent-jobs/targets/` | `id`, `kind`, `location`, `resourceUsage`, `status` | kind: machine / repo / workspace / container; status: connected / busy / offline |

Optional: service `uptime`, `protocol`, `cwd`, `createdAt` (epoch ms), `author`; run `exitCode`; model `family`, `instructFormat`. A run record describes a run that happened; do not invent one.

### Create a learning unit

Create `learn/board/<id>.md` containing `# <title>`, a blank line, and the description. The sidecar holds `id`, `source`, `tags`, `blocks`, `createdAt`, `updatedAt` (epoch ms), and `author`. `source` needs `kind` (book / video / paper / course / article / note) and `title`, optionally `url` and `authorOrChannel`. Optional: `sections`, `activeSectionId`, `notation`. Preserve unrecognized legacy keys such as `book` and `chapter`.

Every block needs `id`, `kind`, `level`, `createdAt`, and `updatedAt`; `locator` and `sectionId` are optional. Level is remembering / understanding / applying / analyzing / evaluating / creating. Block kinds and their own fields: `note` (`text`), `card` (`front`, `back`, `box`, `dueAt`), `image` (`caption`, `dataUrl`), `table` (`title`, `columns`, `rows`), `tree` (`title`, `nodes`), `graph` (`title`, `nodes`, `edges`), `derivation` (`title`, `steps`), `tensor` (`title`, `rows`), `code` (`title`, `language`, `code`).

### Create a paper or weekly review

A paper lives in `research/papers/`. The Markdown body is `# <title>`, a blank line, then the extracted `markdown`. The sidecar holds `id`, `authors`, `year`, `citation`, `pageCount`, and `sections`; optional `doi`, `url`, `pdfUrl`, `pdfDataUrl`, `abstract`, `journal`, `highlights`, `createdAt` (epoch ms). A section needs `id` and `paragraphs`, optionally `title`; a paragraph needs `id` and optionally `linkedClaimId`. A highlight needs `id`, `text`, `createdAt`, optionally `color` (amber / emerald / sky / rose / purple), `pageNumber`, `note`, `sectionId`, and `rects`. Do not fabricate `authors`, `year`, `citation`, or extracted text; import papers from a real source.

A weekly review lives in `tasks/reviews/`. The Markdown body is `# <title>`, a blank line, then the notes. The sidecar holds `id`, `weekOf`, `status` (draft / complete), and `createdAt` (an ISO timestamp string); optional `completedAt`, `focusGoalIds`, `completedTaskIds`, `author`, `lastEditedBy`.

### When a field is not documented here

Every collection now has a recipe above. If a record rejects a field or the app shows a record wrongly, the app schema changed and this file is stale: read `src/types.ts`, `src/productivityTypes.ts`, `src/learnTypes.ts`, and `server/vault.mjs` in the Thinking OS source repository, then update this file in the same turn. Do not consult the source repository for routine record creation.

## Edit

- Preserve `id`, existing authorship, timestamps, and unrelated metadata. Record yourself in `lastEditedBy` only where the schema supports it. Preserve multiline Markdown; the Markdown content overrides corresponding sidecar prose on load.
- Do not upgrade a claim's status, add a validity judgment, or fill in results, citations, or observations that no source supports.
- A rejected claim keeps its record and its rejection reason. Rejection is not deletion.

## Delete

Direct file deletion has no built-in undo. Confirm ambiguous targets and dependent-record changes before deleting; an explicit request naming the record already authorizes its removal.

1. Identify the record by ID and inspect references before changing anything. Check link endpoints, including legacy `parent_id` / `child_id`, and references embedded in other records, such as `paperId`, `claimId`, `questionId`, and `goalId`.
2. Explain dependent changes and obtain approval where the request does not cover them. Do not silently delete evidence, experiments, or other dependent records.
3. After the backup, remove the record's Markdown and JSON together (only JSON for a link). Remove approved incident links and repair approved references. Do not leave dangling references without reporting and resolving their disposition.
4. Report the exact changed and removed paths, backup location, and anything still unresolved.

Removing one paper means removing `research/papers/<id>.md` and `research/papers/<id>.json`. Check evidence `paperId` references and manuscript citations first. Evidence is a separate record: preserve its citation and observations; ask whether to detach its optional paper reference or cancel the deletion. Do not delete evidence, its claim links, or external PDF files merely because the paper record is removed. Manuscript references need review through the app because they are not in the vault.

## Verify

Parse every changed JSON file. Check filename/ID agreement, required fields and enum values, paired files, references, and preservation of multiline prose and unrelated records. Re-read created or edited records; confirm deleted paths are absent. Do not submit a partial collection as a vault snapshot: omitted records in a submitted collection are deleted. Report checks actually performed, not assumed UI success.

## Not in the vault

Manuscript data lives in browser storage, not in files. You cannot edit it from here; say so instead of writing a substitute file.
