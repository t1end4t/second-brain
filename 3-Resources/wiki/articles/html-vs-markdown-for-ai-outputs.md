# HTML vs Markdown for AI Agent Outputs

## Overview

A growing preference among AI-assisted developers — particularly on the Claude Code team — for using HTML instead of Markdown as the primary output format for AI-generated documents. The shift is driven by Markdown's limitations at scale: poor readability beyond 100 lines, inability to represent rich visual information, and difficulty sharing.

## Core Argument

As AI agents tackle increasingly complex work, their outputs grow larger and richer. Markdown's simplicity becomes a liability:

- **Readability ceiling:** Most people won't read a Markdown file longer than 100 lines
- **Information poverty:** ASCII diagrams and unicode color approximations are clunky workarounds for what HTML handles natively (SVG, CSS, tables, interactions)
- **Sharing friction:** Markdown requires special viewers; HTML works in any browser
- **Editing shift:** Users increasingly prompt AI to edit files rather than editing manually, removing Markdown's biggest advantage (easy human editing)

## HTML Advantages

| Capability | Markdown | HTML |
|---|---|---|
| Text formatting | ✅ | ✅ |
| Tables | Basic | Full |
| Diagrams | ASCII art | SVG |
| Styling | None | CSS |
| Interactivity | None | JS + CSS |
| Sharing | Needs viewer | Browser-native |
| Mobile responsive | No | Yes |

## Use Case Mapping

| Task | HTML Approach | Why Better |
|---|---|---|
| Planning | Multi-design grid, mockups | Side-by-side comparison |
| Code review | Rendered diffs with annotations | Color-coded severity, inline notes |
| Design | Interactive prototypes | Sliders, knobs, parameter tuning |
| Reports | SVG diagrams, annotated snippets | Visual hierarchy, shareability |
| Editing | Purpose-built forms | Drag-and-drop, live preview, export |

## Tradeoffs

- **Token cost:** HTML uses more tokens than Markdown — negligible with 1MM+ context windows
- **Viewing:** Requires browser (vs plain-text Markdown)
- **Overkill:** Not worth it for quick notes or simple lists

## Key Insight

> "The real reason I use HTML instead of Markdown is that it helps me feel much more in the loop with Claude. As Claude takes on more, I'd noticed I was reading plans less closely, and I wanted a way to stay engaged with its choices rather than just hand them off." — Thariq Shihipar

## Sources

- [[../_sources#unreasonable-effectiveness-of-html]]

## Related Concepts

- [[../concepts/html-as-output-format]]
- [[../concepts/claude-code-workflows]]
- [[../concepts/interactive-documents]]
