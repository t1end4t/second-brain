#!/usr/bin/env bash
set -euo pipefail

SYNC_FILES=(Project.md Brief.md TODO.md Decisions.md Experiments.md Dead-ends.md Results.md)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ -f "$SCRIPT_DIR/../SYNC_STATUS.md" ]]; then
  VAULT_PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
elif [[ -n "${VAULT_PROJECT_DIR:-}" ]]; then
  VAULT_PROJECT_DIR="$(cd "$VAULT_PROJECT_DIR" && pwd)"
else
  printf 'ERROR: run from vault project scripts/ or set VAULT_PROJECT_DIR=/path/to/1-Projects/name.\n' >&2
  exit 2
fi
STATUS_FILE="$VAULT_PROJECT_DIR/SYNC_STATUS.md"

usage() {
  cat <<USAGE
Usage: $0 <status|push|pull> [target-folder]

Commands:
  status  Show current sync state and file differences.
  push    Copy vault project docs to target docs/.
  pull    Copy target docs/ back to vault project.

Target folder can be passed as arg or stored in SYNC_STATUS.md as:
- **Target folder**: /path/to/repo

From target repo:
  VAULT_PROJECT_DIR=/path/to/second-brain/1-Projects/name ./docs/sync-project-context.sh pull .
USAGE
}

read_target_dir() {
  if [[ $# -ge 1 && -n "${1:-}" ]]; then
    printf '%s\n' "$1"
    return
  fi

  if [[ -f "$STATUS_FILE" ]]; then
    local line value
    line="$(grep -E '^- \*\*Target folder\*\*:' "$STATUS_FILE" | head -n 1 || true)"
    value="${line#*: }"
    value="${value#\`}"; value="${value%\`}"
    if [[ -n "$value" && "$value" != TODO:* ]]; then
      printf '%s\n' "$value"
      return
    fi
  fi

  printf 'ERROR: target folder not configured. Pass it as an argument.\n' >&2
  exit 2
}

ensure_target_docs() {
  local target_dir="$1"
  mkdir -p "$target_dir/docs"
}

set_status() {
  local status="$1" direction="$2"
  local now
  now="$(date '+%Y-%m-%d %H:%M:%S %z')"
  perl -0pi -e "s/- \*\*Status\*\*: .*/- **Status**: $status/; s/- \*\*Last sync\*\*: .*/- **Last sync**: $now/; s/- \*\*Last direction\*\*: .*/- **Last direction**: $direction/" "$STATUS_FILE"
}

show_status() {
  local target_dir="$1"
  echo "Vault:  $VAULT_PROJECT_DIR"
  echo "Target: $target_dir"
  echo
  grep -E '^- \*\*(Status|Last sync|Last direction)\*\*:' "$STATUS_FILE" || true
  echo

  local changed=0
  for file in "${SYNC_FILES[@]}"; do
    local src="$VAULT_PROJECT_DIR/$file"
    local dst="$target_dir/docs/$file"
    if [[ ! -f "$src" ]]; then
      echo "missing vault:  $file"
      changed=1
    elif [[ ! -f "$dst" ]]; then
      echo "missing target: $file"
      changed=1
    elif cmp -s "$src" "$dst"; then
      echo "same:          $file"
    else
      echo "diff:          $file"
      changed=1
    fi
  done

  echo
  if [[ "$changed" -eq 0 ]]; then
    echo "Result: synced"
  else
    echo "Result: not synced"
    echo "Use: $0 push '$target_dir'   # vault -> target"
    echo "Use: $0 pull '$target_dir'   # target -> vault"
  fi
}

copy_files() {
  local from_dir="$1" to_dir="$2"
  for file in "${SYNC_FILES[@]}"; do
    if [[ -f "$from_dir/$file" ]]; then
      cp "$from_dir/$file" "$to_dir/$file"
      echo "copied: $file"
    else
      echo "skip missing: $from_dir/$file"
    fi
  done
}

main() {
  local command="${1:-}"
  shift || true

  case "$command" in
    status)
      local target_dir
      target_dir="$(read_target_dir "${1:-}")"
      show_status "$target_dir"
      ;;
    push)
      local target_dir
      target_dir="$(read_target_dir "${1:-}")"
      ensure_target_docs "$target_dir"
      copy_files "$VAULT_PROJECT_DIR" "$target_dir/docs"
      cp "$VAULT_PROJECT_DIR/../../_templates/execution-repo-AGENTS-snippet.md" "$target_dir/docs/AGENTS.md" 2>/dev/null || true
      cp "$VAULT_PROJECT_DIR/scripts/sync-project-context.sh" "$target_dir/docs/sync-project-context.sh" 2>/dev/null || true
      set_status synced "vault-to-target"
      echo "Status: synced"
      ;;
    pull)
      local target_dir
      target_dir="$(read_target_dir "${1:-}")"
      copy_files "$target_dir/docs" "$VAULT_PROJECT_DIR"
      set_status synced "target-to-vault"
      echo "Status: synced"
      ;;
    *)
      usage
      exit 2
      ;;
  esac
}

main "$@"
