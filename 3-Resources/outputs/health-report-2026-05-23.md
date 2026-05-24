# Wiki Health Report — 2026-05-23

## Summary
- Total concepts: 2
- Total articles: 4
- Raw source files present: 1
- Source index entries: 60
- Broken links: 2 real links, plus 2 template/example links inside comments
- Inconsistencies: 1 structural inconsistency
- Gaps identified: 7
- New connections: 4
- Auto-fixed: 0

## Broken Links
- `3-Resources/wiki/concepts/html-artifacts.md:40` links to `[[claude-code-workflows]]`, but no matching wiki file exists.
- `3-Resources/wiki/concepts/agent-communication-formats.md:32` links to `[[claude-code-workflows]]`, but no matching wiki file exists.
- `3-Resources/wiki/_index.md:7` contains example link `[[concepts/name]]` inside an HTML comment. This is not a real content link, but naive link checkers flag it.
- `3-Resources/wiki/_index.md:13` contains example link `[[articles/name]]` inside an HTML comment. This is not a real content link, but naive link checkers flag it.

## Inconsistencies
- `_sources.md` lists 59 backticked source paths under PDFs/DOCX, but none of those files exist under `3-Resources/raw/`. The only raw file currently present is `unreasonable-effectiveness-of-html.md`.
- `_index.md` says `Raw sources: 1`, which matches the filesystem, but it does not match the apparent 60 entries in `_sources.md`. This suggests `_sources.md` contains planned, external, or previously removed sources.

## Suggested New Articles
- `concepts/claude-code-workflows.md` — needed because two existing concept pages link to `[[claude-code-workflows]]`.
- `concepts/ai-agent-output-formats.md` — could unify HTML artifacts, Markdown, interactive reports, and review surfaces if this topic grows beyond the current two concept pages.
- `concepts/diffusion-language-models.md` — many indexed ICLR 2026 source entries are diffusion LLM papers, but there is no compiled concept page.
- `concepts/computer-use-agents.md` — multiple indexed source entries cover CUA reliability, adversarial testing, and cross-platform data.
- `concepts/agent-rl-training.md` — multiple indexed source entries cover multi-turn RL, trust regions, active reasoning, and RL compute.
- `concepts/llm-agent-monitoring.md` — indexed source entries include reliable weak-to-strong monitoring and dormant adversarial behavior.
- `concepts/ai-writing-detection.md` — `articles/AI-ghostwriter-detection-editorial-system.md` is substantial but has no supporting concept page.

## Suggested New Connections
- Link `articles/AI-ghostwriter-detection-editorial-system.md` to a future `[[concepts/ai-writing-detection]]`.
- Link `articles/three-llm-research-bets-compass.md` to future concepts for `[[concepts/diffusion-language-models]]`, `[[concepts/agent-rl-training]]`, and `[[concepts/computer-use-agents]]`.
- Link `articles/reddit-pi-qwen36-35b.md` to a future local inference or coding-agent concept if more local-model notes are added.
- Link `concepts/html-artifacts.md` and `concepts/agent-communication-formats.md` through a concrete `[[concepts/claude-code-workflows]]` page or remove the unresolved link.

## Sources Not Yet Compiled
- The 59 PDF/DOCX entries listed in `_sources.md` are not present in `3-Resources/raw/`, so they cannot be verified or compiled from local source material.
- `articles/AI-ghostwriter-detection-editorial-system.md` cites external sources and product capabilities, but the cited materials are not represented as local raw sources.
- `articles/three-llm-research-bets-compass.md` appears to synthesize many research directions without local raw source files behind the article.
- `articles/reddit-pi-qwen36-35b.md` names a source URL, but the source is not represented in `3-Resources/raw/` or `_sources.md`.

## Completeness Check
- `_index.md` statistics are accurate against the current filesystem: 2 concepts, 4 articles, 1 raw file.
- `_sources.md` has a complete entry for `unreasonable-effectiveness-of-html.md`, including summary, key topics, and wiki links.
- Three article files are not linked from `_sources.md`: `AI-ghostwriter-detection-editorial-system.md`, `reddit-pi-qwen36-35b.md`, and `three-llm-research-bets-compass.md`.
- Both concept pages currently rely on only one local source, so confidence is low until more sources are compiled.

## High-Priority Actions
- Decide whether the 59 missing PDF/DOCX entries in `_sources.md` are expected external inventory or stale entries. If stale, remove or archive them through the ingest/compile pipeline; if expected, add the files to `3-Resources/raw/`.
- Create `concepts/claude-code-workflows.md` or remove the two `[[claude-code-workflows]]` links.
- Add source-index entries or raw captures for the three non-HTML articles before relying on them as compiled knowledge.
