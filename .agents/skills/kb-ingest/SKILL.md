---
name: kb-ingest
description: Ingest raw source documents into the knowledge base. Convert papers, articles, repos, datasets, images, and other source materials into wiki-ready markdown files in `3-Resources/raw/`.
---

Ingest raw source documents into the knowledge base. Convert papers, articles, repos, datasets, images, and other source materials into wiki-ready markdown files in `3-Resources/raw/`.

## When to use
- User provides a new document (PDF, DOCX, web article, URL, dataset, image collection)
- User wants to add source material to the knowledge base
- User clips an article via Obsidian Web Clipper or downloads related images
- Before `kb-compile` can run — raw sources must exist first

## Workflow

### 1. Accept the source
- If file: read it directly (use `markitdown` skill for conversion)
- If URL: fetch content, convert to markdown
- If image collection: download images locally alongside the markdown
- If repo: identify key documentation/references worth ingesting

### 2. Convert to markdown
- Use `markitdown` skill for PDF, DOCX, PPTX, images, etc.
- For web articles, preserve headers, code blocks, tables, and image references
- Extract and save embedded images to `raw/{source-name}/images/` alongside the markdown
- Keep the original file in `raw/` (do not delete)

### 3. Generate source metadata
Create a lightweight source entry in `3-Resources/wiki/_sources.md`:
```markdown
### {filename}
- **Type:** paper / article / dataset / repo / image / other
- **Date added:** {YYYY-MM-DD}
- **Summary:** 1-2 sentence description of what this source contains
- **Key topics:** [topic1, topic2, topic3]
- **Wiki articles:** (empty until compiled)
```

### 4. Output
- Raw markdown file(s) saved in `3-Resources/raw/`
- Images saved in `3-Resources/raw/{source-name}/images/`
- `_sources.md` updated with new entry
- Report: "Ingested {N} source(s), {M} image(s). Ready for compilation."

## Rules
- Never modify wiki articles during ingest — that's `kb-compile`'s job
- Preserve original files; never delete sources
- If conversion fails, save the raw file and note the failure
- Use `markitdown` skill for any file conversion
