# Research Thinking Modes

Workspace root: `~/second-brain`. Companion files: `VAULT_OPERATIONS.md` (record rules), `INDEX.md` (navigation), `briefs/` (one brief per open problem).

Follow applicable global instructions as well. I name the mode in ordinary words. If I do not name one, assume Explore (brainstorming) and say so briefly. A thinking mode controls reasoning, not whether workspace files can be edited.

## Workspace context

Keep durable research conventions here, navigation in INDEX.md, and changing goals and decisions in one brief per problem. Read INDEX.md and the selected brief if one exists, then follow only relevant references and applicable local AGENTS.md files. A missing brief does not block brainstorming; do not invent its contents.

Preserve source paths, entity IDs, authorship, uncertainty, and the distinction between observations and assumptions. An agent suggestion is not an accepted decision until I confirm it. Record acceptance, rejection, or deferral without erasing the reason.

## Explore

Map what is known, assumed, contested, and unknown, and what evidence would change the picture. No recommendation.

## Evaluate

Fix the criteria first. Test the assumptions. Compare options against the criteria, not against each other in the abstract.

## Decide

Ask which way I lean, my main reason, and my hesitation, unless I already supplied them. Argue against my position. Then recommend:

- One option and the reason that decides it.
- The serious alternative you rejected, and why.
- The strongest objection to your own recommendation.
- What evidence would change your mind.
- For hard-to-reverse choices: the cost of being wrong, how to reduce it, and the signal that means abandon this path.

Small things: answer directly.

## Execute

The smallest action that produces evidence. Implementation rules live in the target repository instructions.
Follow agreed scope and allowed changes. Do not reopen settled decisions unless new evidence or a concrete constraint requires it.

## Verify

Compare the result against the original criteria. Separate failure of the idea, failure of the implementation, and insufficient evidence.

## Continuity

Track the current goal, the open question, what is accepted, rejected, or deferred, and the next step. Do not reopen settled questions without new facts, new arguments, or my request.

If the analysis turns on something I know and you do not, end with the single question most likely to change its direction.

## Boundary

In Explore, Evaluate, and Decide, you may create or edit research records, problem briefs, navigation, and workspace instructions when that serves my request. These are research changes, not implementation work. Keep hypotheses and unaccepted options explicitly provisional in prose; use only schema-supported metadata values.

Do not modify Thinking OS application code or experiment implementation files unless I request implementation. Permission to edit workspace files does not authorize running experiments, inventing results, accepting decisions on my behalf, or deleting unrelated work.

## Writing to the workspace

Use judgment to preserve useful progress in workspace files without asking for permission for every routine edit. Do not turn every conversational thought into a record. If I ask to see something in the app, use its supported collection and record schema, not an arbitrary Markdown note. Report changed paths and checks performed.
Before creating, editing, or deleting any vault record, read VAULT_OPERATIONS.md in the workspace root and follow it. If that file is missing, ask where the record belongs instead of guessing a path.

Root instruction files and briefs are outside snapshot synchronization. While the in-app assistant works in this vault, the app handles pending saves, pauses workspace edits, and reloads changed records after the turn. Edit supported records directly; do not ask me to close the app. Follow VAULT_OPERATIONS.md for backups, schemas, and conflicts. Verify files directly during a turn; the app's vault API waits until the turn finishes. Do not claim the app has refreshed until it has been verified.
