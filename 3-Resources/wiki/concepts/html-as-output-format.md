# HTML as AI Output Format

## Definition

Using HTML instead of Markdown as the primary output format for AI agent-generated documents. HTML offers richer information density, visual clarity, shareability, and interactivity compared to Markdown's simpler text-based format.

## Key Principles

- **Information density:** HTML can represent tabular data, CSS-styled layouts, SVG illustrations, interactive elements, spatial data, and embedded media — far exceeding Markdown's capabilities
- **Visual clarity:** HTML documents can be organized with tabs, responsive layouts, and visual structure that makes large documents (100+ lines) actually readable
- **Shareability:** HTML files render natively in any browser, can be shared via links, and don't require special viewers
- **Two-way interaction:** HTML supports sliders, knobs, forms, and copy-to-clipboard buttons that let users tune parameters and feed results back to the AI
- **Context ingestion:** Claude Code can generate HTML from codebases, MCPs, git history, and web context — richer inputs than Claude.ai alone

## When to Use HTML Over Markdown

- Specs, plans, and explorations (multiple design options side by side)
- Code review artifacts (rendered diffs with annotations)
- Design prototypes (interactive components with parameter tuning)
- Reports and explainers (SVG diagrams, annotated code snippets)
- Custom editing interfaces (drag-and-drop, form editors, live preview)

## Tradeoffs

- Higher token usage than Markdown (negligible with 1MM+ context windows)
- Less suitable for quick, throwaway notes
- Requires browser to view (vs plain-text Markdown)

## Related Sources

- [[../_sources#unreasonable-effectiveness-of-html]] — original article by Thariq Shihipar

## Related Concepts

- [[claude-code-workflows]]
- [[interactive-documents]]

## Open Questions

- When is Markdown still preferable over HTML for AI outputs?
- How does HTML output compare to Claude's native artifact rendering?
- What skill templates work best for recurring HTML patterns?
