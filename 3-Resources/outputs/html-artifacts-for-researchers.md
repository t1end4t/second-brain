# HTML Artifacts for Researchers with Opencode/Claude Code

## Overview

As a researcher, you can use **HTML artifacts** instead of plain Markdown for richer, more interactive outputs. This approach lets you stay "in the loop" with AI-generated research artifacts rather than passively reading them.

## How to Get HTML Outputs

### 1. **Explicitly Request HTML**
When prompting, specify HTML as the output format:

```
Create an HTML artifact comparing these 3 experimental designs.
Include interactive tabs for each design and a comparison table.
```

```
Generate an HTML report summarizing this paper with:
- SVG diagram of the methodology
- Interactive parameter sliders for key variables
- Export button to copy findings as JSON
```

### 2. **Use HTML-Specific Prompts**
Leverage HTML's strengths for research tasks:

| Research Task | Prompt Pattern |
|---|---|
| Literature review | "Create an HTML matrix comparing papers with sortable columns" |
| Data exploration | "Build an HTML dashboard with sliders to tune model hyperparameters" |
| Methodology comparison | "Generate an HTML side-by-side diff of two approaches" |
| Experiment planning | "Create an HTML kanban board for experiment phases (Now/Next/Later)" |
| Results visualization | "Build an interactive HTML chart with tooltips and export" |

### 3. **Leverage Interactive Features**
Ask for two-way interaction:

```
Create an HTML artifact where I can:
- Adjust learning rate, batch size, epochs via sliders
- See live loss curve preview
- Copy optimal config as JSON
```

## Workflow for Researchers

### Step 1: Generate
```
Analyze this dataset and create an HTML artifact with:
- Distribution plots (SVG)
- Statistical summary table
- Interactive filters for subsetting
- Export button for cleaned data
```

### Step 2: Interact
- Open the HTML file in your browser
- Adjust parameters, filter data, reorder items
- Use export buttons to copy results back to clipboard

### Step 3: Iterate
```
Here's the exported JSON from the HTML artifact.
Now create a follow-up HTML with deeper analysis of the top 3 clusters.
```

## Best Practices for Research HTML

1. **Always include export** — "Copy as JSON" or "Copy as prompt" buttons
2. **Purpose-built, not reusable** — Each HTML is for one specific analysis
3. **Visual hierarchy** — Use tabs, cards, color-coded sections
4. **Parameter tuning** — Sliders for variables you want to explore
5. **Side-by-side comparison** — Multiple approaches in one view

## Limitations

- **Token cost**: HTML uses more tokens than Markdown (negligible with 1MM+ context)
- **Viewing**: Requires browser (vs plain-text Markdown)
- **Overkill**: Don't use for quick notes or simple lists

## Key Insight

> "The real reason I use HTML instead of Markdown is that it helps me feel much more in the loop with Claude. As Claude takes on more, I'd noticed I was reading plans less closely, and I wanted a way to stay engaged with its choices rather than just hand them off." — Thariq Shihipar (Claude Code team)

## Related Wiki Articles

- [[concepts/html-as-output-format]]
- [[concepts/interactive-documents]]
- [[concepts/claude-code-workflows]]
- [[articles/html-vs-markdown-for-ai-outputs]]

---

*Generated from wiki: 2026-05-27*
