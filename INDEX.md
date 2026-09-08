# Research workspace

Thinking OS reads this repository as a dashboard source.

| Path | Purpose |
|---|---|
| `questions/*.md` | Research question text |
| `questions/*.json` | Question tags |
| `claims/*.md` | User assertion text |
| `claims/*.json` | Claim state |
| `evidence/*.md` | Finding text |
| `evidence/*.json` | Finding source metadata |
| `papers/*.md` | Readable paper content |
| `papers/*.json` | Citation and paragraph identity metadata |
| `links/*.json` | Explicit question→claim and claim→evidence connections |
| `survey/**/*.md` | Survey text |
| `survey/**/*.json` | Survey metadata |

Connections carry `parent_id`, `child_id`, `status`, the user-written reason,
and any model check.
