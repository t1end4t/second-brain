---
name: kb-health
description: Run LLM "health checks" over the wiki to maintain data integrity, find inconsistencies, identify gaps, and suggest improvements. Incrementally cleans up and enhances the wiki.
---

Run LLM "health checks" over the wiki to maintain data integrity, find inconsistencies, identify gaps, and suggest improvements. Incrementally cleans up and enhances the wiki.

## When to use
- User asks to "check the wiki", "lint", "health check", or "clean up"
- Periodic maintenance (e.g., weekly or after a batch of new sources)
- User suspects the wiki has stale, inconsistent, or incomplete entries
- Before a major compile to ensure clean state

## Health Check Types

### 1. Broken Link Check
- Scan all wiki files for `[[wiki-links]]` that point to non-existent files
- Report broken links and suggest fixes
- Auto-fix if the target exists under a different name

### 2. Consistency Check
- Compare summaries across related concept articles for contradictions
- Check that source citations in articles actually match the source content
- Flag articles that cite sources not yet compiled into the wiki
- Report: "Inconsistency found: Concept A says X, but source Y says Z"

### 3. Gap Analysis
- Identify concepts that have only 1 source (low confidence)
- Find topics mentioned in multiple articles but without a dedicated concept page
- Suggest new concept articles that would improve coverage
- Flag areas where the wiki is thin compared to the raw sources

### 4. Connection Discovery
- Find unexpected connections between concepts that aren't yet linked
- Identify sources that might belong to multiple concepts
- Suggest new cross-links to strengthen the wiki graph
- Look for emerging themes not yet captured

### 5. Completeness Check
- Verify `_sources.md` entries have at least a 1-sentence summary
- Check that newly added sources have corresponding wiki articles
- Find raw sources that haven't been compiled yet
- Ensure `_index.md` statistics are accurate

## Workflow

### 1. Run selected health checks
- Ask user which checks to run, or run all if unspecified
- For each check type, scan the wiki systematically

### 2. Generate health report
Create `3-Resources/outputs/health-report-{date}.md`:
```markdown
# Wiki Health Report — {date}

## Summary
- Total concepts: {N}
- Total articles: {M}
- Total sources: {K}
- Broken links: {count}
- Inconsistencies: {count}
- Gaps identified: {count}
- New connections: {count}

## Broken Links
- ...

## Inconsistencies
- ...

## Suggested New Articles
- ...

## Suggested New Connections
- ...

## Sources Not Yet Compiled
- ...
```

### 3. Auto-fix where safe
- Fix broken links that have obvious alternatives
- Update statistics in `_index.md`
- Add missing source entries to `_sources.md`

### 4. Suggest actions for ambiguous cases
- Present inconsistencies for user review
- List new article candidates with brief rationale
- Suggest follow-up web searches for gap-filling

### 5. Output
- Report: "Health check complete. Found {N} issues, auto-fixed {M}, {K} need review."
- Save report to `3-Resources/outputs/`
- Suggest 2-3 high-priority actions

## Rules
- Auto-fix only unambiguous issues (broken links with clear alternatives, stats)
- Present all ambiguities to the user — don't make editorial decisions
- When suggesting new articles, include a brief rationale
- Use web search (`research-lookup` skill) when gap-filling requires external info
- Health checks should be non-destructive — always preserve existing content
