# HTML Artifact Workflow

**Status:** Active
**Created:** 2026-05-13

---

## Principle

HTML artifacts are not canonical notes. They are disposable comprehension layers.

Use them when they increase human understanding per minute enough to justify token and generation cost.

```text
Markdown/JSON brief → local agent generates standalone HTML → human explores → durable insights return to Markdown
```

## Source of Truth

```text
Markdown = source / memory / version control
JSON = structured intermediate data
HTML = presentation / review / interaction
```

Better long-term pattern:

```text
structured semantic data → multiple render layers
```

## Generate HTML When

- many options need comparison or prioritization
- relationships are spatial, temporal, causal, or networked
- review needs filtering, sorting, toggles, tabs, or progressive disclosure
- a report/plan matters but will likely be skimmed as plain Markdown
- visual judgment is faster than prose review
- a temporary UI can help choose, debug, or explain

Examples:

- side-by-side architecture comparison
- animated system flow
- prompt tuning playground
- draggable roadmap prioritizer
- visual PR explainer
- dependency explorer
- live parameter playground

## Avoid HTML When

- the note is canonical long-term knowledge
- grep, diffs, backlinks, or embeddings matter most
- the output is short enough to read linearly
- the artifact would be maintained by hand
- Markdown already gives enough structure

## Local Agent Pattern

Use cloud/frontier agents for reasoning and source-of-truth notes. Use local coding agents for cheap HTML rendering from compact Markdown or JSON briefs.

Local agent constraints:

- generate single-file HTML only
- inline CSS/JS only
- no npm, build step, CDN, or external assets by default
- include source metadata and generation timestamp
- include export/copy buttons only when useful
- keep canonical content in Markdown
- treat generated HTML as disposable output

## Prompt Pattern

```text
Read INPUT.md.
Generate a standalone interactive HTML artifact for exploration.
Preserve facts from the source.
Use filters/toggles/tabs only where they improve review.
Use inline CSS and JS only.
No npm, CDN, build step, or external assets.
Write output to OUTPUT.html.
Do not modify the source note.
Treat HTML as disposable; canonical insights must return to Markdown.
```

## Pi Coding Agent Setup

Recommended repo convention:

```text
3-Resources/outputs/       # generated artifacts
_templates/html-artifact/   # prompt/template snippets
```

Pi agent should receive compact inputs:

- one Markdown brief, or
- one JSON data file, or
- a short list of linked notes summarized first

Avoid asking Pi to reason over the full vault unless needed. Let it render from already-compressed material.
