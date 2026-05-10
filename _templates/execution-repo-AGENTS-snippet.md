# Second Brain Sync

<!-- This file becomes docs/AGENTS.md in the execution repo to bridge from the vault. -->
<!-- Project context is synced from second-brain/1-Projects/{name}/ to docs/ -->

## Project Context

- **Vault**: `../../second-brain/1-Projects/{project-name}/`
- **Synced docs**: `./docs/` (Brief.md, TODO.md, Decisions.md, Results.md)
- **Sync status**: read vault `SYNC_STATUS.md` or run `./docs/sync-project-context.sh status .` with `VAULT_PROJECT_DIR` set.

Before starting work, read the synced docs in `./docs/` for project context, goals, and current status.

**Do NOT edit files in the vault.** The vault is read-only from here unless explicitly asked.

If you edit `docs/Brief.md`, `docs/TODO.md`, `docs/Decisions.md`, or `docs/Results.md`, tell the user target docs are ahead and should be synced back:

```sh
VAULT_PROJECT_DIR=/path/to/second-brain/1-Projects/{project-name} ./docs/sync-project-context.sh pull .
```

If both vault and target docs changed, do not overwrite. Mark the situation as a conflict in the handoff and ask the user to reconcile.

## After Completing Work

When finishing a task or session, remind the user to update the vault:

> Update your second-brain project notes:
> - Check off completed items in `TODO.md`
> - Log experiments in `Experiments.md`
> - Record key decisions in `Decisions.md`
> - Note dead ends in `Dead-ends.md`
> - Add results to `Results.md`
> - Update `Brief.md` if direction changed
> - Run the sync script if target docs changed
