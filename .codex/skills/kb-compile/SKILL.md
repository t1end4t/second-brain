---
name: kb-compile
description: 'Compile raw source documents into the knowledge base wiki. Read all files in 3-Resources/raw/, then generate or update wiki articles in 3-Resources/wiki/ with summaries, backlinks, concept categorization, and cross-references.'
---

"Compile" raw source documents into the knowledge base wiki. Read all files in `3-Resources/raw/`, then generate or update wiki articles in `3-Resources/wiki/` with summaries, backlinks, concept categorization, and cross-references.

## When to use
- After `kb-ingest` has added new raw sources
- User wants to "refresh" the wiki with latest sources
- User asks to compile, summarize, or organize the knowledge base
- Periodic maintenance to ensure wiki stays current with raw data

## Workflow

### 1. Scan raw/
- List all files in `3-Resources/raw/`
- Read `_sources.md` to see which sources are already indexed
- Identify new or updated sources since last compile

### 2. Read and summarize each source
For each raw source:
- Read the markdown (or convert if needed)
- Extract: key claims, methods, results, concepts, terminology
- Write a concise summary (200-500 words) in wiki format
- Identify which **concepts** this source relates to

### 3. Categorize into concepts
For each identified concept:
- Check if a concept article already exists in `wiki/concepts/`
- If **new concept**: create `wiki/concepts/{concept-name}.md` with:
  ```markdown
  # {Concept Name}
  ## Definition
  Clear, concise definition in 2-3 sentences.
  
  ## Key Principles
  - Principle 1
  - Principle 2
  
  ## Related Sources
  - [[../_sources#filename]] — specific contribution
  
  ## Related Concepts
  - [[other-concept]]
  
  ## Open Questions
  - What we don't know yet
  ```
- If **existing concept**: update with new source references and insights

### 4. Create topic articles
For significant topics that span multiple sources:
- Create `wiki/articles/{topic-name}.md` with synthesized analysis
- Include comparative insights, contradictions, consensus
- Link to all relevant concept articles and source summaries

### 5. Update index files
- Update `wiki/_index.md`: add new concepts and articles, update statistics
- Update `wiki/_sources.md`: link each source to its wiki articles
- Update statistics: concept count, article count, source count

### 6. Output
- Report: "Compiled {N} new sources, created/updated {M} concept(s), {K} article(s). Wiki now has {total concepts} concepts, {total articles} articles."
- List any sources that couldn't be processed

## Rules
- Wiki articles are written by the LLM — user rarely edits them directly
- Preserve existing wiki content; append or update, never overwrite without reason
- Use `[[wiki-links]]` format for all cross-references
- Keep concept articles focused on a single idea/technique/method
- Keep articles more synthetic and comparative than concept articles
- If a source doesn't fit any existing concept, create a new one rather than forcing it
