#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPOS_FILE="${SYNC_REPOS_FILE:-$REPO_ROOT/sync-repos.txt}"
MODE="${1:-status}"

usage() {
  cat <<USAGE
Usage: scripts/sync-workbase.sh [status|pull]

Modes:
  status  Show configured repo state.
  pull    Pull only clean repos, then update submodules.

Env:
  SYNC_REPOS_FILE  Override repo list path. Default: $REPOS_FILE
USAGE
}

expand_path() {
  local path="$1"
  path="${path/#\~/$HOME}"
  path="${path//\$HOME/$HOME}"
  printf '%s\n' "$path"
}

is_git_repo() {
  git -C "$1" rev-parse --git-dir >/dev/null 2>&1
}

is_dirty() {
  [ -n "$(git -C "$1" status --short)" ]
}

status_repo() {
  local repo="$1"
  if ! is_git_repo "$repo"; then
    printf 'MISSING  %s\n' "$repo"
    return 0
  fi

  local branch state head
  branch="$(git -C "$repo" branch --show-current 2>/dev/null || true)"
  [ -n "$branch" ] || branch="detached"
  head="$(git -C "$repo" rev-parse --short HEAD 2>/dev/null || printf '?')"

  if is_dirty "$repo"; then
    state="dirty"
  else
    state="clean"
  fi

  printf '%-7s  %-14s  %-8s  %s\n' "$state" "$branch" "$head" "$repo"

  if [ "$state" = "dirty" ] && git -C "$repo" submodule status --recursive >/dev/null 2>&1; then
    git -C "$repo" submodule summary --files --summary-limit 20 2>/dev/null | sed 's/^/  /'
  fi
}

pull_repo() {
  local repo="$1"
  if ! is_git_repo "$repo"; then
    printf 'SKIP missing: %s\n' "$repo"
    return 0
  fi

  if is_dirty "$repo"; then
    printf 'SKIP dirty:   %s\n' "$repo"
    return 0
  fi

  printf '\n==> %s\n' "$repo"
  git -C "$repo" pull --recurse-submodules
  git -C "$repo" submodule update --init --recursive

  if is_dirty "$repo"; then
    printf 'DIRTY after sync: %s\n' "$repo"
  fi
}

for_each_repo() {
  [ -f "$REPOS_FILE" ] || { printf 'Repo list not found: %s\n' "$REPOS_FILE" >&2; exit 1; }
  while IFS= read -r line || [ -n "$line" ]; do
    line="${line%%#*}"
    line="${line%$'\r'}"
    [ -n "${line//[[:space:]]/}" ] || continue
    "$@" "$(expand_path "$line")"
  done < "$REPOS_FILE"
}

case "$MODE" in
  status) for_each_repo status_repo ;;
  pull) for_each_repo pull_repo ;;
  -h|--help|help) usage ;;
  *) usage >&2; exit 2 ;;
esac
