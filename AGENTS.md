# Research workspace rules

- User-visible prose lives in Markdown files in `questions/`, `claims/`, `evidence/`, `papers/`, and `survey/`.
- Machine metadata lives in a same-name JSON sidecar beside each Markdown file.
- Parent-child connections live in `links/*.json`.
- Every claim and evidence file must have exactly one parent link.
- `user_reason` lives only in a link JSON file and must be written by the user.
- A link with a null user reason must keep `status: "missing"` and must not contain a model check.
- Evidence files describe findings. Papers remain separate source documents.
- Experiments do not live in this workspace yet.
- Keep IDs and filenames stable. Use Git history instead of silently replacing prior reasoning.

See `INDEX.md` for the folder map.
