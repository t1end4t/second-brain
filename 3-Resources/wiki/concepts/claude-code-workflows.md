# Claude Code Workflows

## Definition

Patterns and practices for using Claude Code effectively as an AI-assisted development tool. Encompasses planning, code review, prototyping, reporting, and building custom interfaces — often using HTML as the output format.

## Key Patterns

### Planning & Exploration
- Generate multiple design approaches as a single HTML file for side-by-side comparison
- Build mockups, data flow diagrams, and implementation plans in HTML
- Create a "web" of HTML files for different plan stages (exploration → mockups → implementation plan)
- Pass HTML files as context to new sessions for implementation or verification

### Code Review & Understanding
- Render diffs with inline annotations and color-coded severity
- Generate flowcharts and module diagrams from code
- Create PR explainers with annotated code snippets

### Design & Prototyping
- Sketch designs in HTML, then translate to target framework (React, Swift, etc.)
- Build interactive prototypes with sliders, knobs, and copy buttons
- Prototype animations with parameter tuning UI

### Reports & Research
- Synthesize information from Slack, codebase, git history, web into HTML reports
- Generate SVG illustrations, flowcharts, and technical diagrams
- Create interactive explainers or slideshows

### Custom Editing Interfaces
- Build throwaway editors purpose-built for specific data (not reusable tools)
- Always include export: "copy as JSON" or "copy as prompt" button
- Use for reordering tickets, editing config, tuning prompts, curating datasets

## Related Sources

- [[../_sources#unreasonable-effectiveness-of-html]] — workflow patterns from Claude Code team

## Related Concepts

- [[html-as-output-format]]
- [[interactive-documents]]

## Open Questions

- How to build reusable skills around recurring HTML workflow patterns?
- How to balance HTML richness with token efficiency?
