# {Project Name} — Sync Status

- **Status**: not-configured
- **Vault project**: `1-Projects/{project-name}/`
- **Target folder**: `TODO: set execution repo path`
- **Target docs**: `docs/`
- **Last sync**: never
- **Last direction**: none

## Status Values

- `not-configured` — target folder not set yet.
- `synced` — vault project docs and target `docs/` match.
- `vault-ahead` — vault changed; push to target needed.
- `target-ahead` — target docs changed; pull to vault needed.
- `conflict` — both sides changed; manual review needed.

## Synced Files

- `Brief.md`
- `TODO.md`
- `Decisions.md`
- `Results.md`

## Notes

Use `scripts/sync-project-context.sh status` from this project folder.
