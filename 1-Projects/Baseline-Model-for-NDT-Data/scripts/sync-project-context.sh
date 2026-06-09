#!/usr/bin/env bash
set -euo pipefail

SYNC_FILES=(
  "project.md"
  "tasks.md"
  "decisions.md"
  "results.md"
  "workflow.md"
  "split_protocol.md"
  "LabelingSpec.md"
)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_VAULT_PROJECT_DIR="$HOME/second-brain/1-Projects/Baseline-Model-for-NDT-Data"

if [[ -f "$SCRIPT_DIR/../SYNC_STATUS.md" ]]; then
  VAULT_PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
  DEFAULT_TARGET_DIR=""
elif [[ -f "$DEFAULT_VAULT_PROJECT_DIR/SYNC_STATUS.md" ]]; then
  VAULT_PROJECT_DIR="$DEFAULT_VAULT_PROJECT_DIR"
  DEFAULT_TARGET_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
else
  VAULT_PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
  DEFAULT_TARGET_DIR=""
fi

STATUS_FILE="$VAULT_PROJECT_DIR/SYNC_STATUS.md"

usage() {
  cat <<USAGE
Usage: $0 <status|push|pull> [target-folder]

Commands:
  status  Show current sync state and file differences.
  push    Copy vault project docs to target docs/.
  pull    Copy target docs/ back to vault project.

When run from target docs/, target-folder defaults to the repo root.
Otherwise target-folder can be passed as arg or stored in SYNC_STATUS.md.
USAGE
}

read_target_dir() {
  if [[ $# -ge 1 && -n "${1:-}" ]]; then
    printf '%s\n' "$1"
    return
  fi

  if [[ -n "$DEFAULT_TARGET_DIR" ]]; then
    printf '%s\n' "$DEFAULT_TARGET_DIR"
    return
  fi

  if [[ -f "$STATUS_FILE" ]]; then
    local line value
    line="$(grep -E '^- \*\*Target folder\*\*:' "$STATUS_FILE" | head -n 1 || true)"
    value="${line#*: }"
    value="${value#\`}"; value="${value%\`}"
    if [[ -n "$value" && "$value" != TODO:* ]]; then
      value="${value/#\~/$HOME}"
      printf '%s\n' "$value"
      return
    fi
  fi

  printf 'ERROR: target folder not configured. Pass it as arg or set in SYNC_STATUS.md.\n' >&2
  exit 2
}

set_status() {
  local status="$1" direction="$2"
  local now
  now="$(date '+%Y-%m-%d %H:%M:%S %z')"
  if [[ -f "$STATUS_FILE" ]]; then
    perl -0pi -e "
      s/- \*\*Status\*\*: .*/- **Status**: $status/;
      s/- \*\*Last sync\*\*: .*/- **Last sync**: $now/;
      s/- \*\*Last direction\*\*: .*/- **Last direction**: $direction/;
    " "$STATUS_FILE"
  fi
}

show_status() {
  local target_dir="$1"
  echo "Vault:  $VAULT_PROJECT_DIR"
  echo "Target: $target_dir"
  echo
  grep -E '^- \*\*(Status|Last sync|Last direction)\*\*:' "$STATUS_FILE" 2>/dev/null || true
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
      echo "same:           $file"
    else
      echo "diff:           $file"
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

do_push() {
  local target_dir="$1"
  mkdir -p "$target_dir/docs"
  for file in "${SYNC_FILES[@]}"; do
    local src="$VAULT_PROJECT_DIR/$file"
    local dst="$target_dir/docs/$file"
    if [[ -f "$src" ]]; then
      cp "$src" "$dst"
      echo "pushed: $file"
    else
      echo "skip missing: $file"
    fi
  done

  local bridge="$VAULT_PROJECT_DIR/../../_templates/execution-repo-AGENTS-snippet.md"
  if [[ -f "$bridge" ]]; then
    local project_name
    project_name="$(basename "$VAULT_PROJECT_DIR")"
    sed "s/{project-name}/$project_name/g" "$bridge" > "$target_dir/docs/AGENTS.md"
    echo "pushed: AGENTS.md (bridge)"
  fi

  cp "$VAULT_PROJECT_DIR/scripts/sync-project-context.sh" "$target_dir/docs/sync-project-context.sh"
  chmod +x "$target_dir/docs/sync-project-context.sh"
  echo "pushed: sync-project-context.sh"

  set_status synced "vault-to-target"
  echo "Status: synced"
}

do_pull() {
  local target_dir="$1"
  for file in "${SYNC_FILES[@]}"; do
    local src="$target_dir/docs/$file"
    local dst="$VAULT_PROJECT_DIR/$file"
    if [[ -f "$src" ]]; then
      cp "$src" "$dst"
      echo "pulled: $file"
    else
      echo "skip missing: docs/$file"
    fi
  done

  set_status synced "target-to-vault"
  echo "Status: synced"
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
      do_push "$target_dir"
      ;;
    pull)
      local target_dir
      target_dir="$(read_target_dir "${1:-}")"
      do_pull "$target_dir"
      ;;
    *)
      usage
      exit 2
      ;;
  esac
}

main "$@"
