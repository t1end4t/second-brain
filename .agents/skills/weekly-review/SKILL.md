---
name: weekly-review
description: Run a weekly review in the PARA vault. Use when the user says "weekly review", "review the week", "end of week", or at the start of a week; review dailies, project tasks, and area TODOs, then create the weekly review note.
---

# Weekly Review Skill

Use this skill when the user says "weekly review", "review the week", "end of week", or at start of week.

## Steps

1. **Read week's dailies** — read all `daily/` files from the past 7 days.
2. **Read all project tasks** — read `1-Projects/*/tasks.md` for stale items, blockers, next actions.
3. **Read area tasks** — read `2-Areas/*/TODO.md`.
4. **Create weekly file** — `weekly/{YYYY-Www}.md` with:
   - What got done this week
   - What's blocked or stale
   - Outcomes for next week
   - Priority adjustments
5. **Clean up stale tasks** — move to Later, Waiting, or Done as appropriate.

## Weekly File Format

Use `_templates/planning/weekly.md` as the weekly file template.
