# ndt-controller-rewrite

Rewrite the Python/Gradio NDT control app into the TypeScript fullstack repo at `~/codebases/dev-sandbox/ndt-controller`.

## Key files

- **project.md** — motivation, constraints, open questions
- **tasks.md** — action plan (`Now`/`Next`/`Later`/`Waiting`/`Done`)
- Execution repo: `~/codebases/dev-sandbox/ndt-controller`
- Old Python/Gradio app: `~/codebases/dev-sandbox/ndt-controller/external/NDT-controller`

## Context

The existing `ndt-controller` TypeScript repo is a Nix/devenv template (Express backend + Vite vanilla TS frontend). The old Python app (RIVER) is an LLM agent that uses tool functions to control a LabVIEW-based NDT system.

## Owner / when to read

- Read `project.md` for background and non-goals.
- Read `tasks.md` for current next actions.
- Read old app README/TODO before starting implementation work.
