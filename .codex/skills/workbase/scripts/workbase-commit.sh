#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
REPOS_FILE="${SYNC_REPOS_FILE:-$REPO_ROOT/sync-repos.txt}"
MODE="${1:-status}"
INCLUDE_UNTRACKED=0

usage() {
  cat <<USAGE
Usage: .codex/skills/workbase/scripts/workbase-commit.sh [status|commit] [--all]

Modes:
  status  Show dirty repos and submodules from sync-repos.txt.
  commit  Commit dirty submodules first, then parent submodule pointers.

Options:
  --all   Include untracked files. Default commits tracked changes only.

Safety:
  - Never pushes.
  - Skips repos with merge/rebase/conflict state.
  - Skips parent working-tree changes unrelated to submodule pointers.
USAGE
}

if [ "${2:-}" = "--all" ]; then
  INCLUDE_UNTRACKED=1
elif [ -n "${2:-}" ]; then
  usage >&2
  exit 2
fi

expand_path() {
  local path="$1"
  path="${path/#\~/$HOME}"
  path="${path//\$HOME/$HOME}"
  printf '%s\n' "$path"
}

is_git_repo() {
  git -C "$1" rev-parse --git-dir >/dev/null 2>&1
}

has_conflict_state() {
  local repo="$1" git_dir
  git_dir="$(git -C "$repo" rev-parse --git-dir 2>/dev/null)"
  [ -f "$git_dir/MERGE_HEAD" ] || [ -d "$git_dir/rebase-merge" ] || [ -d "$git_dir/rebase-apply" ] || [ -n "$(git -C "$repo" diff --name-only --diff-filter=U)" ]
}

has_dirty_tracked() {
  ! git -C "$1" diff --quiet || ! git -C "$1" diff --cached --quiet
}

has_untracked() {
  [ -n "$(git -C "$1" ls-files --others --exclude-standard)" ]
}

has_committable_changes() {
  has_dirty_tracked "$1" || { [ "$INCLUDE_UNTRACKED" -eq 1 ] && has_untracked "$1"; }
}

commit_repo_changes() {
  local repo="$1" label="$2"

  if ! has_committable_changes "$repo"; then
    return 0
  fi

  if has_conflict_state "$repo"; then
    printf 'SKIP conflict/rebase: %s\n' "$repo"
    return 0
  fi

  printf '\n==> commit %s\n' "$repo"
  if [ "$INCLUDE_UNTRACKED" -eq 1 ]; then
    git -C "$repo" add -A
  else
    git -C "$repo" add -u
  fi

  if git -C "$repo" diff --cached --quiet; then
    printf 'SKIP no staged changes: %s\n' "$repo"
    return 0
  fi

  git -C "$repo" diff --cached --stat
  git -C "$repo" commit -m "Update $label"
}

submodule_paths() {
  local repo="$1"
  git -C "$repo" submodule foreach --quiet --recursive 'printf "%s\n" "$displaypath"' 2>/dev/null || true
}

status_repo() {
  local repo="$1"
  if ! is_git_repo "$repo"; then
    printf 'MISSING  %s\n' "$repo"
    return 0
  fi

  local state="clean"
  if [ -n "$(git -C "$repo" status --short)" ]; then
    state="dirty"
  fi
  printf '%-7s  %s\n' "$state" "$repo"
  git -C "$repo" submodule foreach --quiet --recursive '
    if [ -n "$(git status --short)" ]; then
      printf "  dirty submodule: %s/%s\n" "$toplevel" "$sm_path"
      git status --short | sed "s/^/    /"
    fi
  ' 2>/dev/null || true
}

commit_repo() {
  local repo="$1" path name
  if ! is_git_repo "$repo"; then
    printf 'SKIP missing: %s\n' "$repo"
    return 0
  fi

  while IFS= read -r path; do
    [ -n "$path" ] || continue
    name="$(basename "$path")"
    commit_repo_changes "$repo/$path" "$name"
  done < <(submodule_paths "$repo")

  if [ -n "$(git -C "$repo" submodule summary --files 2>/dev/null)" ]; then
    printf '\n==> commit parent pointers %s\n' "$repo"
    while IFS= read -r path; do
      [ -n "$path" ] || continue
      git -C "$repo" add "$path"
    done < <(submodule_paths "$repo")

    if ! git -C "$repo" diff --cached --quiet; then
      git -C "$repo" diff --cached --submodule=short --stat
      git -C "$repo" commit -m "Update submodule pointers"
    fi
  fi

  if has_committable_changes "$repo"; then
    commit_repo_changes "$repo" "$(basename "$repo")"
  elif [ -n "$(git -C "$repo" status --short)" ]; then
    printf 'LEFT dirty parent: %s\n' "$repo"
  fi
}

for_each_repo() {
  local callback="$1"
  [ -f "$REPOS_FILE" ] || { printf 'Repo list not found: %s\n' "$REPOS_FILE" >&2; exit 1; }
  while IFS= read -r line || [ -n "$line" ]; do
    line="${line%%#*}"
    line="${line%$'\r'}"
    [ -n "${line//[[:space:]]/}" ] || continue
    set -- $line
    shift   # drop URL
    "$callback" "$(expand_path "$*")"
  done < "$REPOS_FILE"
}

case "$MODE" in
  status) for_each_repo status_repo ;;
  commit) for_each_repo commit_repo ;;
  -h|--help|help) usage ;;
  *) usage >&2; exit 2 ;;
esac
