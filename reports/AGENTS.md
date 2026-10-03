# Report preparation

Root workspace instructions still apply. This folder contains plain report documents and presentation artifacts, not app records. Do not add schema sidecars or move drafts into synchronized collections.

## Scope and evidence

- Initialization creates templates only. Create a dated meeting, generate slides, export, or deploy only when requested.
- Read the selected meeting's `content.md` and inspect its `images/` before drafting slides. Follow relevant source references; do not scan unrelated research by default.
- Preserve source paths, run IDs, entity IDs, authorship, units, baselines, conditions, and uncertainty. Separate measurements from interpretation and hypotheses.
- Never fabricate results, plots, citations, meeting feedback, or accepted decisions. Missing evidence stays missing. Do not run experiments as part of report preparation.
- Keep each meeting independent. Do not overwrite earlier content or figures. Back up existing files outside synchronized collections before editing them.

## Slide generation

- Use `$frontend-slides` and read its installed `SKILL.md`; do not copy the skill into this repo.
- Purpose: internal lab research update. Length, density, style, and institutional identity remain unspecified unless supplied in the content or request. Ask only for missing discovery inputs.
- Inspect images and confirm the outline. Follow the skill's visual style discovery unless the user explicitly requests an existing style. Read its academic-theme reference; use no institutional logo without the correct affiliation.
- Keep visible sources and figure captions. Split crowded slides rather than shrinking evidence until it is unreadable. Do not turn a tentative interpretation into a proven finding.
- Write `slides.html` inside the selected meeting folder. Embed local figures so the HTML can travel alone; keep original images as source material. Include the skill's full viewport CSS, fixed 1920×1080 stage, and reduced-motion support.
- Verify the real deck in a browser at 1280×720 and a phone viewport: navigation, image loading, stage ratio, clipping, and overlap. Report actual checks and any unverified behavior.
- Keep temporary style previews inside the meeting folder's `.frontend-slides/slide-previews/`. Remove only previews generated for that request after delivery. Do not touch another meeting's previews.
- Do not deploy private lab material without an explicit request. PDF export and HTML generation do not authorize publication.
