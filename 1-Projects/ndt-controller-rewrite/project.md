# ndt-controller-rewrite

## Motivation

Rewrite the old Python/Gradio RIVER app as a TypeScript fullstack app. The LLM agent must keep using tool functions to control the NDT (LabVIEW) system.

## Source repo

- Execution repo: `~/codebases/dev-sandbox/ndt-controller`
- Old app is vendored under `external/NDT-controller/`

## What the old app does

- Gradio GUI (`src/gui/`) with a chat interface, mode selector, and experiment sidebar.
- LLM agent orchestrator (`src/agents/experiment.py`) plans and executes NDT scans.
- Tool functions (`src/tools/labview_controller/`) control the LabVIEW VI.
- BAML client/prompts (`src/baml_client/`, `src/baml_src/`) structure the agent/tool calls.
- Project/state management (`src/core/`) tracks experiment metadata, positions, data paths.

## Constraints

- Backend: TypeScript/Express in the new repo.
- Frontend: Vite + vanilla TypeScript (or extend as needed).
- Preserve the tool-function contract to the NDT hardware.
- Keep Windows-only LabVIEW integration path (subprocess / COM) if hardware remains Windows.

## Open questions

- Should the new frontend mirror the Gradio chat UI exactly or redesign?
- Do we keep BAML prompts or migrate to a different agent framework?
- How do we run/test without the physical NDT system?
