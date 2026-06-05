# Claude Code HTML Use Cases — Baseline NDT Example

## Question

Using the `Baseline-Model-for-NDT-Data` project as the concrete example: when should Claude Code generate HTML instead of only text or Markdown for better reading?

## Short Answer

Claude Code should generate HTML when the output is not just something to *read*, but something to *inspect, compare, filter, review, or tune*. For the baseline NDT project, HTML is better whenever the work involves many plots, multidimensional datasets, QA decisions, or side-by-side options. Markdown is still better for simple notes, task lists, decisions, and short summaries.

## Decision Rule

Use HTML when at least one is true:

- The reader must compare many visual states.
- The answer contains plots, tables, heatmaps, PCA, waveforms, or sensor maps.
- The user needs filters, tabs, toggles, sliders, forms, or copy/export buttons.
- A wrong decision is easy if information is only linear text.
- The artifact should keep the user “in the loop” during agent work.

Use Markdown when:

- The output is mostly prose.
- The structure is a checklist, decision log, or project update.
- The user needs git-friendly diffable text.
- No interaction or visual comparison is needed.

## Best HTML Use Cases in Baseline NDT

| Use case | Why HTML beats Markdown | Concrete NDT example |
|---|---|---|
| Dataset QA dashboard | Combines counts, warnings, filters, and drilldowns | Raw TDMS inventory: file counts, short files, missing files, orientation, sensor/specimen/condition filters |
| Signal statistics report | Plots and summary cards are easier to scan visually | Existing `tdms_npy_stats_report.html`: waveform IQR bands, peak timing scatter, TSNR, PCA, feature heatmap |
| Rotate/crop review | Visual decision-making cannot be represented well in text | Show raw peak map, corrected raster, rotation options, crop rectangle, mask overlay |
| LOI window selection | Needs waveform inspection plus saved choices | Compare lift-off curves, candidate windows, chosen start/end, notes, export CSV row |
| Best-LOI per file review | Many repeated decisions need compact UI | Table of TDMS files with preview plot, candidate LOI windows, accept/reject buttons |
| Corrosion mask review | Spatial overlay matters more than prose | Display feature map + corrosion mask + opacity slider + per-sensor tabs |
| Model result comparison | Multiple models/metrics need side-by-side reading | 1DCNN vs RF vs logistic regression vs MLP: metrics, confusion matrices, calibration, per-condition errors |
| Experiment plan comparison | Keeps agent plans readable and contestable | HTML page with 2–4 proposed preprocessing/modeling paths, tradeoffs, effort, risk, expected output |
| Error audit report | Helps find patterns in failures | Sort/filter files by bad waveform length, low TSNR, bad crop, label mismatch, outlier embedding |
| Paper/report deliverable | Better for dense visuals and navigation | Interactive research report with tabs: data, preprocessing, training, results, next experiments |

## Baseline NDT Pattern Library

### 1. One-File QA Report

Use when Claude Code runs analysis and returns findings.

Good HTML layout:

- Header: dataset scope, timestamp, command, config files.
- Summary cards: total files, complete/short/missing, sensors, conditions.
- Warning panel: stale inventory, suspicious waveform length, missing metadata.
- Tabs: inventory, waveform stats, feature maps, PCA, outliers.
- Embedded static plots: PNG/SVG/base64 or local relative paths.
- Export section: exact commands to reproduce.

Best for:

- `ndt-8-export-stats-report`
- raw inventory audit
- preprocessing verification
- training sanity report

### 2. Human Review Interface

Use when the user must make labeling or preprocessing choices.

Good HTML layout:

- Left panel: file list + filters.
- Main panel: plot/map preview.
- Right panel: metadata + decision form.
- Controls: crop sliders, opacity sliders, LOI start/end fields, accept/reject buttons.
- Export: CSV/JSON rows that Claude Code or scripts can ingest.

Best for:

- rotate/crop review
- LOI selection
- corrosion mask review
- outlier triage

### 3. Side-by-Side Plan Explorer

Use before implementation when there are competing paths.

Good HTML layout:

- Cards for each plan.
- Columns: goal, steps, expected artifact, risk, time cost, validation.
- Highlight recommendation.
- “What Claude should do next” button/text block.

Best for:

- deciding whether to continue preprocessing QA or restart modeling
- choosing baseline models
- choosing dataset split strategy
- comparing HTML report vs Streamlit app vs Markdown report

## What Should Stay Markdown

Keep these as Markdown in the vault:

- `project.md`: motivation, constraints, open questions.
- `tasks.md`: Now / Next / Later / Waiting / Done.
- `decisions.md`: stable choices and rationale.
- `results.md`: concise history of outputs and commands.
- Short experiment notes that do not need plots or interaction.

Reason: these are durable, diffable, searchable project memory. HTML should be an output artifact, not the canonical project state.

## Practical Recommendation

For `Baseline-Model-for-NDT-Data`, ask Claude Code for HTML in this wording:

> Generate a single-file HTML review report, not just Markdown. Include summary cards, tabs, sortable tables, plots, warnings, and exact reproduction commands. Optimize it for quickly deciding what to inspect next.

For interactive review tasks:

> Generate a browser-based HTML review UI with filters, visual previews, decision controls, and CSV/JSON export. Keep it single-file unless external assets are already produced by the pipeline.

For normal project updates:

> Write Markdown only. Update `tasks.md`, `results.md`, or `decisions.md` with concise project memory.

## Bottom Line

In the NDT baseline project, HTML is best when Claude Code is helping you *see the data or make decisions from many signals*. Markdown is best when Claude Code is helping you *remember the decision afterward*.

