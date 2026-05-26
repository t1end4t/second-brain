# Personal Productivity — TODO

## Today
- [ ] Run daily startup review.

## Now
- [ ] Use the daily review loop for planning.
- [ ] Use the weekly review loop every Monday.

## Waiting
- 2026-05-25: Morning lost to Facebook. System exists but wasn't used until end of day — the agent (me) read files but didn't act on the reflection. Need to fix this.

## Later
- [ ] Refine this system after one week of use.

## Decisions — Agent Behavior (2026-05-25)
Draft direction for how agents should use this vault. Not finalized yet.

**What agent should do:**
- Read the right places → synthesize → present info → USER decides
- Capture reflections as user shares them (into `2-Areas/personal-productivity/`)
- End-of-day closeout only when user asks, not agent-prompted
- Priority suggestions based on project deadlines

**What agent should NOT do:**
- Decide for the user
- Jump to read all files
- Be proactive without being asked (except start-of-day status)

**Hard problem: Agent can't realize what's missing**
Possible approaches (not decided yet):
1. Explicit gaps — agent ends with "here's what I don't know" (missing deadlines, context, stale items)
2. Checklist-driven — fixed checklist: deadlines set? blockers recorded? next action clear?
3. Question-based — agent asks "anything I'm missing?" after synthesis (weak)

**Still to decide:**
- [ ] Which approach for handling missing context
- [ ] Where exactly to capture during-day reflections (which file?)
- [ ] What the start-of-day agent flow looks like
- [ ] How to instruct agents in AGENTS.md without making them read everything

## Done
- [x] 2026-05-25: Rebuilt productivity workflow (this vault structure, AGENTS.md, templates)

