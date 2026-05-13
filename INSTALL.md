# Install

## 1. Set up workbase repos

Repos are listed in `sync-repos.txt`. Use the workbase sync script to clone,
update, and refresh submodules:

```bash
scripts/sync-workbase.sh status
scripts/sync-workbase.sh pull
```

`pull` only updates clean repos. Dirty repos are skipped so Codex/Claude Code can
review and commit them safely first.

Submodule projects are pinned by the parent repo. After committing and pushing
inside a submodule, run `git status` in the parent repo and commit the changed
submodule pointer, usually with a message like `Update <submodule>`. The sync
status command shows dirty parent repos plus submodule pointer summaries so this
step is harder to miss.

## 2. Set up npm global prefix

`home-manager/ai-tools.nix` installs `nodejs`, not global npm tools.

```bash
npm set prefix ~/.npm-global
```

Make sure this is in `PATH`:

```bash
npm config get prefix
command -v npm
```

Expected prefix:

```text
/home/tiendat/.npm-global
```

If global bins are missing from `PATH`, add this to shell config:

```bash
export PATH="$HOME/.npm-global/bin:$PATH"
```

## 3. Install AI coding tools not managed by Nix

### Claude Code

```bash
if ! command -v claude >/dev/null 2>&1; then
  curl -fsSL https://claude.ai/install.sh | bash
else
  echo "Claude Code already installed: $(claude --version 2>/dev/null || echo ok)"
fi
```

### OpenAI Codex

```bash
if ! command -v codex >/dev/null 2>&1 || [ "$(npm info @openai/codex version 2>/dev/null)" != "$(npm list -g --depth=0 @openai/codex 2>/dev/null | grep @openai/codex | sed 's/.*@//')" ]; then
  npm install -g @openai/codex
else
  echo "Codex up-to-date"
fi
```

### Gemini CLI

```bash
if ! command -v gemini >/dev/null 2>&1 || [ "$(npm info @google/gemini-cli version 2>/dev/null)" != "$(npm list -g --depth=0 @google/gemini-cli 2>/dev/null | grep @google/gemini-cli | sed 's/.*@//')" ]; then
  npm install -g @google/gemini-cli
else
  echo "Gemini CLI up-to-date"
fi
```

Open it with:

```bash
gemini
```

### OpenCode

```bash
if ! command -v opencode >/dev/null 2>&1; then
  curl -fsSL https://opencode.ai/install | bash
else
  echo "OpenCode already installed: $(opencode --version 2>/dev/null || echo ok)"
fi
```

### 9router

```bash
if ! command -v 9router >/dev/null 2>&1 || [ "$(npm info 9router version 2>/dev/null)" != "$(npm list -g --depth=0 9router 2>/dev/null | grep 9router | sed 's/.*@//')" ]; then
  npm install -g 9router
else
  echo "9router up-to-date"
fi
```

### Claude sandbox runtime

```bash
if ! npm list -g --depth=0 @anthropic-ai/sandbox-runtime >/dev/null 2>&1; then
  npm install -g @anthropic-ai/sandbox-runtime
else
  echo "Sandbox runtime up-to-date"
fi
```

### pi-coding-agent

```bash
if ! command -v pi >/dev/null 2>&1 || [ "$(npm info @earendil-works/pi-coding-agent version 2>/dev/null)" != "$(npm list -g --depth=0 @earendil-works/pi-coding-agent 2>/dev/null | grep pi-coding-agent | sed 's/.*@//')" ]; then
  npm install -g @earendil-works/pi-coding-agent
else
  echo "pi up-to-date"
fi
```

Check after install:

```bash
command -v pi
pi --help
```

## 4. Install coding-agent configs

`dev-sandbox` contains the `dotcode` submodule for shared coding-agent configs.
After syncing the workbase, install core configs from that submodule:

```bash
cd ~/codebases/dev-sandbox
git submodule update --init --recursive dotcode
cd dotcode
./install.sh --all-agents --core
```

This installs core config for Codex CLI, Claude Code, and Pi Coding Agent.

Smoke check:

```bash
ls ~/.codex/AGENTS.md ~/.codex/skills/
ls ~/.claude/CLAUDE.md ~/.claude/skills/
ls ~/.pi/agent/AGENTS.md ~/.pi/agent/skills/
```

## 5. Smoke test

```bash
for cmd in node npm bun uv python claude codex gemini opencode 9router pi; do
  if command -v "$cmd" >/dev/null 2>&1; then
    echo "OK: $cmd"
  else
    echo "MISSING: $cmd"
  fi
done
```

If anything is missing, check whether it is installed by Nix/Home Manager or by npm/curl above.
