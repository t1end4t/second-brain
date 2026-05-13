# AI Interface Evolution

**Status:** Active
**Created:** 2026-05-13

---

## Core Idea

LLM outputs are evolving from static text documents into generated interfaces: explorable, visual, interactive environments for thought.

Progression:

```text
plain text → markdown → HTML → generated interactive interfaces → agentic UI
```

The important shift is not “HTML vs Markdown.” It is:

```text
documents → artifacts → workspaces
```

## Working Model

Keep durable knowledge in Markdown or structured data. Generate HTML only as a temporary comprehension layer.

```text
Markdown/JSON source → generated HTML artifact → human exploration → insights back to Markdown
```

## Key Notes

- [[AI-Outputs-as-Interfaces]] — article summary and conceptual shift
- [[HTML-Artifact-Workflow]] — when to generate HTML and how local agents should do it
- [[Attention-Bottleneck]] — why human comprehension, not tokens, becomes the bottleneck

## Current Position

- Markdown remains the source of truth for this vault.
- HTML artifacts are useful but should stay disposable.
- Local coding agents are better suited for cheap HTML rendering than frontier agents.
- Generate artifacts only when interaction materially improves review, comparison, or understanding.

## Open Questions

- What should be canonical: Markdown, JSON, database records, or another semantic layer?
- Which generated interfaces are worth preserving, and which should stay ephemeral?
- How should local agents generate useful artifacts without bloating cloud-agent context?
- When do neural simulations become reliable enough for serious reasoning?

## Resources

- [Thariq's X thread](https://x.com/trq212/status/2052809885763747935)
- [Simon Willison — The unreasonable effectiveness of HTML](https://simonwillison.net/2026/May/8/unreasonable-effectiveness-of-html/)
- [Reddit discussion — HTML > Markdown for Claude Code outputs](https://www.reddit.com/r/ClaudeCode/comments/1t8vni3/html_markdown_for_claude_code_outputs_thariqs/)
- [Hackobar — Using Claude Code: The unreasonable effectiveness of HTML](https://hackobar.com/item/hn-using-claude-code-the-unreasonable-effectiveness-of-html-e8b6)

## See Also

- [[AI-Usage-Archetypes]]
- [[Building-as-Research]]
- [[Fundamentals-in-the-AI-Era]]
