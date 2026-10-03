# Lab reports

Markdown content and result images for twice-weekly lab meetings. Use `$frontend-slides` to turn a prepared meeting folder into an HTML deck.

These are plain working documents, not Thinking OS records. Keep them here, outside synchronized collection directories. No JSON sidecars are needed. They are not shown in the app.

## Layout

```text
reports/
  AGENTS.md
  README.md
  _template/
    content.md
    images/
  YYYY-Www/                 ISO week, including the ISO week-year
    meeting-1/
      content.md            Meeting date, research narrative, figure sources
      images/               Actual plots, tables, screenshots, diagrams
      slides.html           Generated only when requested
    meeting-2/
      content.md
      images/
      slides.html
```

No dated meeting or deck has been created yet. The two meetings have separate content and image snapshots; do not overwrite meeting 1 when preparing meeting 2.

## Prepare a meeting

Run from the workspace root:

```bash
week="$(date +%G-W%V)"
meeting="reports/$week/meeting-1"
test ! -e "$meeting" && mkdir -p "$(dirname "$meeting")" && cp -R reports/_template "$meeting"
```

Change `meeting-1` to `meeting-2` for the second meeting. Set `week` explicitly for a different week. If the destination exists, the command leaves it unchanged; edit that meeting instead.

1. Fill in `content.md`, including the actual meeting date and links to earlier work.
2. Copy real result images into `images/`. Use descriptive names such as `accuracy-by-budget.png`. Do not generate images that pretend to be experimental results.
3. For every figure, fill in the source, setup, caption, observation, interpretation, and limits. Use paths relative to `content.md`, such as `images/accuracy-by-budget.png`. Preserve the original artifact path or run ID too.
4. Remove unused template sections. Mark missing evidence explicitly. If there are no new results, report the blocker or method change; do not imply a completed experiment.

## Generate slides

After the content is ready, replace the folder below with the actual meeting path:

```text
Use $frontend-slides to create reports/YYYY-Www/meeting-1/slides.html
from reports/YYYY-Www/meeting-1/content.md and its images/ folder.
Read reports/AGENTS.md. Inspect the figures, confirm the outline,
then show the skill's style previews. Do not invent results or citations.
```

Fill in density and approximate length before generation, or answer the skill's discovery questions. Style remains unselected until you choose a preview. Once a style is chosen, name the previous deck in later requests if you want to reuse it.

The output is a self-contained HTML deck with embedded figures, a fixed 1920×1080 stage, and no build setup. PDF export is optional. Deployment requires a separate request because lab material may be private.

## After the meeting

Record feedback in that meeting's `content.md`. Distinguish accepted decisions from suggestions and deferred questions. Carry unresolved items into the next meeting with a reference to their source; keep earlier evidence intact.
