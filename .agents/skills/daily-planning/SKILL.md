---
name: daily-planning
description: Plan the user's day in the PARA vault. Use when the user says "plan my day", "what should I work on", "start the day", or similar; read inbox, project tasks, area TODOs, and yesterday's daily note, then create today's daily plan.
---

# Daily Planning Skill

Use this skill when the user says "plan my day", "what should I work on", "start the day", or similar.

## Steps

1. **Read inbox** — read `inbox.md` for uncaptured items.
2. **Read all project tasks** — read `1-Projects/*/tasks.md` for active tasks.
3. **Read area tasks** — read `2-Areas/*/TODO.md` for area tasks.
4. **Check yesterday** — read the most recent `daily/` file for unfinished items.
5. **Create today's daily file** — `daily/{YYYY-MM-DD}.md` with:
   - Main outcome (1 thing — the most important work)
   - Secondary actions (2-3 things)
   - Time blocks (morning = deep work, afternoon = shallow/admin)
   - Capture section for the day
6. **Suggest priorities** — based on urgency and importance.
7. **Update tasks** — if priorities have shifted, update relevant `tasks.md` files.

## Priority Framework

- **Urgent + Important** → Now (do today)
- **Important, not urgent** → Next (this week)
- **Urgent, not important** → delegate or batch in afternoon
- **Neither** → Later or drop

## Time Block Convention

- Morning: deep work (research, writing, thinking) — protect this
- Afternoon: shallow work (email, admin, meetings, reading)

## Daily File Format

Use `_templates/planning/daily.md` as the daily file template.
