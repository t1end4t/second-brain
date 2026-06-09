# INDEX.md

Annotated guide for onboarding into this project.

## Read First

| Item | What it contains | When to read |
|---|---|---|
| `project.md` | Project purpose, current dataset context, labeling schema, mask geometry, open questions. | Start here before changing project direction, labels, or assumptions. |
| `tasks.md` | Current action plan across Now, Next, Waiting, Later, Done. | Read before planning work or choosing next actions. |
| `workflow.md` | Project workflow notes. | Read before changing preprocessing/training workflow. |
| `split_protocol.md` | Grouped point-level split protocol. | Read before changing dataset splits, leakage checks, or baseline training. |
| `LabelingSpec.md` | Local labeling specification for corrosion, rivet, and mixed specimens. | Read before modifying masks, labels, or regression targets. |
| `decisions.md` | Recorded decisions and rationale. | Read before revisiting prior choices. |
| `results.md` | Findings and experiment/results notes. | Read before summarizing progress or planning next experiments. |
| `SYNC_STATUS.md` | Sync state with execution repo. | Read when checking whether vault and execution repo context diverged. |

## External / Local Context

| Item | Owner | What it contains | When to read |
|---|---|---|---|
| `~/Documents` TDMS data | User | Raw PECT TDMS dataset inventory referenced by this project. | Read only when inspecting raw data, preprocessing, or inventory assumptions. |
| Execution repo docs | User | Counterpart docs such as `docs/tdms_context.md`, `docs/LabelingSpec.md`, inventories, configs, outputs. | Read when implementing or verifying code-side changes. |

## Session Close

Before stopping substantial project work, update the relevant file:
- `tasks.md` for changed next actions or completed work.
- `decisions.md` for durable choices and rationale.
- `results.md` for findings, metrics, or conclusions.
- `project.md` for changed context, constraints, or open questions.
