# Inbox Processing Skill

Use this skill when the user says "process inbox", "clean up inbox", or during daily planning when inbox has items.

## Steps

1. **Read inbox** — read `inbox.md`.
2. **For each item**, categorize and move:
   - `[task]` → move to relevant project `tasks.md` (Now/Next/Later based on urgency)
   - `[idea]` → move to relevant project `project.md` under Open Questions, or create new project
   - `[read]` → move to `2-Areas/reading/TODO.md` or project tasks
   - `[thought]` → move to relevant project `project.md` or daily file
3. **Clear processed items** from `inbox.md`.

## Categorization Rules

- If item belongs to an existing project → move to that project's `tasks.md`
- If item is a new project idea → add to `inbox.md` as `[idea]` or create new project
- If item is reading → `2-Areas/reading/TODO.md`
- If unsure → ask the user

## After Processing

Confirm with user what was moved and where. Suggest next actions if any items need immediate attention.
