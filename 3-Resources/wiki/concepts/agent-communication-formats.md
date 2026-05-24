# Agent Communication Formats

## Definition

Agent communication formats are the file types LLM agents use to produce structured human-readable outputs. The two dominant formats are Markdown (plain, portable, easy to edit) and HTML (rich, interactive, visually structured). The choice of format affects information density, readability, shareability, and whether the human can stay "in the loop" with the agent's reasoning.

## Key Principles

- **Markdown dominance**: Markdown is the default for most agent→human communication due to its simplicity, token efficiency, and native editability.
- **Readability cliff**: Markdown files beyond ~100 lines lose human engagement; HTML's visual structure extends the readable range.
- **Shareability gap**: Markdown requires a viewer/renderer; HTML opens in any browser, increasing the chance someone reads it.
- **Edit vs. review mode**: When the human edits the file themselves, Markdown wins; when the file is a spec or reference read by the agent, HTML wins.
- **Token cost vs. engagement tradeoff**: HTML uses more tokens, but higher reading compliance can offset the cost.

## Format Comparison

| Dimension | Markdown | HTML Artifacts |
|---|---|---|
| Richness | Headers, lists, code blocks, tables | + CSS, SVG, JS, interactivity |
| Ideal length | < 100 lines | 100s–1000s of lines with navigation |
| Shareability | Requires renderer | Browser-native, linkable |
| Editability | Direct human editing | Mostly agent-editable; humans interact via UI |
| Token cost | Lower | Higher, offset by context-window scale |

## Related Sources

- [[../_sources#unreasonable-effectiveness-of-html]] — case for HTML as superior agent output format

## Related Concepts

- [[html-artifacts]]
- [[claude-code-workflows]]

## Open Questions

- Should agents auto-select format based on task complexity?
- What hybrid approaches (MD for quick notes, HTML for deliverables) emerge in practice?
- How do format choices affect multi-session continuity and verification workflows?
