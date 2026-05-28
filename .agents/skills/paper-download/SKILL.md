---
name: paper-download
description: Download accepted papers from top-venue conferences using Paper Copilot data. Search by venue-year (e.g., NeurIPS 2025, ICLR 2026), filter by status (Poster/Spotlight/Oral) and keywords, then download PDFs from OpenReview. Use when user says "download papers from X", "get NeurIPS papers", "fetch accepted papers", or needs venue-specific paper collections.
---

Download accepted papers from top ML/NLP/CV conferences using Paper Copilot's processed data.

## When to use
- User asks to download papers from a specific conference (NeurIPS, ICLR, ICML, etc.)
- User wants accepted papers from a venue-year
- User needs to filter papers by status (Oral/Spotlight/Poster) and keywords
- Before `kb-ingest` — papers must be downloaded first

## Script
Use the bundled script from this skill directory:

```sh
python .agents/skills/paper-download/download_papers.py <venue> <year> [options]
```

Examples:

```sh
python .agents/skills/paper-download/download_papers.py NeurIPS 2025 --dry-run -k reasoning "test-time compute"
python .agents/skills/paper-download/download_papers.py NeurIPS 2025 -k "inference-time compute" reasoning -n 10
python .agents/skills/paper-download/download_papers.py ICLR 2026 --composite-filter llm-science -n 20 -o 3-Resources/raw
```

Options:
- `-k, --keywords` — filter by title + Paper Copilot keywords
- `--composite-filter` — ranked preset filter requiring matches from multiple term groups (e.g., `llm-science`)
- `-n, --max-papers` — limit downloads
- `-o, --output-dir` — output dir; default `3-Resources/raw`
- `--dry-run` — list matches only
- `--no-index` — skip appending `3-Resources/wiki/_sources.md`

### Composite filters (recommended)

Use `--composite-filter` for topic-based searches where papers must match terms from **multiple** groups. Papers are ranked by match strength across all groups.

Available presets:
- `llm-science` — LLMs applied to scientific domains (drug discovery, materials, genomics, chemistry, physics, etc.)

**Why use composite filters?** Exact phrase matching (e.g., "LLM for scientific discovery") often returns zero results because paper titles use varied terminology. Composite filters decompose phrases into atomic terms and require matches from each group, then rank by total hits.

## Data source
Paper Copilot raw JSON: `https://raw.githubusercontent.com/Papercopilot/paperlists/main/{venue}/{venue}{year}.json`

Venue mapping:
- NeurIPS/NIPS → `nips/nips{year}.json`
- ICLR → `iclr/iclr{year}.json`
- ICML → `icml/icml{year}.json`
- CVPR → `cvpr/cvpr{year}.json`
- EMNLP → `emnlp/emnlp{year}.json`
- ACL → `acl/acl{year}.json`

Schema fields:
- `title`, `abstract`, `keywords`, `primary_area`, `track`, `status`
- `site` — OpenReview forum URL
- `author`, `aff`, `bibtex`
- `rating_avg`, `confidence_avg`

## Workflow
1. Run `--dry-run` first to inspect matches.
2. Use `--composite-filter` instead of exact phrases for broad research areas.
3. Download accepted papers with `-n` if the match set is large.
4. Confirm PDFs are in `3-Resources/raw/`.
5. Confirm `3-Resources/wiki/_sources.md` was appended.
6. Use `kb-ingest` next if user wants to process papers into wiki.

## Rules
- Only download accepted papers: `Poster`, `Spotlight`, `Oral`.
- Respect rate limits: script sleeps 2s between downloads.
- Save PDFs to `3-Resources/raw/` unless user specifies another output dir.
- Update `_sources.md` after each batch unless `--no-index` is used.
- Never delete existing raw papers.

## Error handling
The script skips missing OpenReview IDs and 404s, retries timeouts/errors, waits on 429 rate limits, and rejects invalid PDFs without `%PDF` headers.
