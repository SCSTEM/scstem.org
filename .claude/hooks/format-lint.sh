#!/usr/bin/env bash
# Formats and lints the file Claude Code just edited with the hk.pkl steps the pre-commit hook
# and CI run. Unfixable findings exit 2 so they go back to the agent; a missing toolchain exits 0
# so a fresh clone is not blocked before `mise install && pnpm install`.
set -uo pipefail

repo_root="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null)}"
[[ -n "$repo_root" ]] || exit 0

file="$(jq -r '.tool_response.filePath // .tool_input.file_path // empty')"
[[ -n "$file" ]] || exit 0
[[ "$file" = /* ]] || file="$repo_root/$file"
[[ -f "$file" && "$file" = "$repo_root"/* ]] || exit 0

cd "$repo_root" || exit 0
command -v hk >/dev/null && [[ -x node_modules/.bin/eslint ]] || exit 0

findings="$(hk fix --quiet --no-progress --no-stage "$file" 2>&1)" || {
  printf '%s\n' "$findings" >&2
  exit 2
}
