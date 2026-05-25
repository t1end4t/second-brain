# AI-Generated Paper Content Detection — Brief

## Summary

This project is now scoped as a simple custom agent for coding agents, not a large editorial pipeline. The agent should help review academic paper content, collect evidence for possible AI-generated text, and return a compact, passage-level report with caveats.

## Objective

Build a lightweight custom agent that can:
- accept manuscript text or markdown first,
- split it into sections/paragraphs/sentences with offsets,
- run simple stylometric checks and optionally one grounded LLM-judge rubric,
- optionally check citation/reference sanity,
- return a compact editor-facing report with flagged passages and due-process caveats.

## Key Constraints

- No binary accusation outputs.
- Keep ESL protection explicit.
- Prefer multiple small signals over one opaque score.
- Preserve character/paragraph offsets.
- Start simple; add PDF parsing and heavier detectors later only if needed.

## Current Status

Project simplified on 2026-05-22. Direction changed from full multi-agent system to a custom coding-agent-oriented agent. No execution target configured yet.

## First Deliverable

A minimal custom agent prompt/workflow plus a markdown/JSON report format, suitable for use from Jcode or another coding agent.

## Key Resources

- `3-Resources/raw/others/compass_artifact_wf-cc816ab0-9f2d-4d0c-9c19-37b4871d512a_text_markdown.md`
  - Useful parts for this simplified project: passage-level checks, evidence over scores, ESL protection, and caution about single-detector reliance.
