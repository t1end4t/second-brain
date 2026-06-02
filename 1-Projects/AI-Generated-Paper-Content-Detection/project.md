# AI-Generated Paper Content Detection

## Why This Exists

I want a simpler project: build a custom agent that a coding agent can use to review academic paper content and surface possible AI-generation signals.

The goal is not to build a large product or production pipeline. The goal is a lightweight, useful custom agent that works alongside coding agents like Claude Code, Codex, or OpenCode.

## Current Context

The source artifact is in `3-Resources/raw/others/compass_artifact_wf-cc816ab0-9f2d-4d0c-9c19-37b4871d512a_text_markdown.md`.

From that artifact, the useful takeaway for us is simpler than a full system:
- Do not trust a single detector score alone.
- Focus on evidence, not accusations.
- Prefer passage-level checks over a single document-level number.
- Keep ESL false-positive protection and due-process caveats.
- Use multiple simple signals, then combine them.

For this project, the custom agent should focus on these in a lean way:
1. Parse/segment a manuscript into sections/paragraphs/sentences.
2. Extract simple stylometric signals and suspicious patterns.
3. Optionally run one LLM-judge rubric pass grounded in verbatim evidence.
4. Optionally do basic citation/reference sanity checks.
5. Output a compact editor-facing report with flagged passages and caveats.

## Open Questions

- Should the custom agent work inside Jcode only, or also produce standalone tool output?
- Should MVP be text/markdown only, or support PDF from the start?
- Should we include commercial detector APIs, or keep everything local/LLM-based?
- What level of structured JSON output is actually needed first?
- Should the agent be a Jcode skill, a project-specific prompt pack, or both?

## Constraints & Limitations

- Keep the system small and agent-friendly.
- No automatic rejection logic.
- Detection must be treated as probabilistic evidence gathering.
- Protect against ESL / translation / formal-writing false positives.
- Preserve passage spans and offsets wherever possible.
- Prefer local-first or simple LLM-driven checks before adding heavy dependencies.

## Related Resources

- `[[articles/editorial-ai-detection-system-design]]` — comprehensive guide to multi-agent AI-content detection
- https://github.com/blader/humanizer — reference for AI-Generated-Paper-Content-Detection project
