# Interactive Documents

## Definition

HTML documents enhanced with JavaScript and CSS that enable two-way interaction — users can adjust parameters, trigger actions, and export results back to AI tools or codebases. Distinct from static Markdown or plain HTML in that they serve as purpose-built editing environments rather than passive reading material.

## Key Characteristics

- **Parameter tuning:** Sliders, knobs, dropdowns for adjusting values visually
- **Live preview:** Changes render in real-time as parameters change
- **Export actions:** "Copy as JSON", "Copy as prompt", "Copy diff" buttons that convert UI state into text for pasting back into AI tools or committing to files
- **Drag-and-drop:** Card-based interfaces for reordering, triaging, bucketing
- **Form-based editing:** Structured editors for config files, feature flags, env vars with validation and dependency warnings

## Example Use Cases

- Reprioritizing tickets with drag-and-drop columns (Now / Next / Later / Cut)
- Feature flag editor with dependency graph and prerequisite warnings
- Prompt template editor with live preview and token counter
- Dataset curation with approve/reject/tag workflow and export

## Design Principle

The document is not a product or reusable tool — it's a single-purpose interface for one specific piece of data. The goal is to tighten the loop between human judgment and AI execution by making it easier to express preferences that are "painful to express in text" (colors, easing curves, crop regions, cron schedules, regexes).

## Related Sources

- [[../_sources#unreasonable-effectiveness-of-html]] — custom editing interfaces pattern

## Related Concepts

- [[html-as-output-format]]
- [[claude-code-workflows]]

## Open Questions

- When does an interactive document justify the overhead vs. a simple text prompt?
- How to template common interactive patterns for reuse?
