#!/usr/bin/env bash
# Formats and lints the file Claude Code just edited. Lint failures exit 2 so the
# findings go back to the agent; a missing toolchain exits 0 so a fresh clone is not
# blocked before `pnpm install`.
set -uo pipefail

repo_root="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null)}"
[[ -n "$repo_root" ]] || exit 0

file="$(jq -r '.tool_response.filePath // .tool_input.file_path // empty')"
[[ -n "$file" ]] || exit 0
[[ "$file" = /* ]] || file="$repo_root/$file"
[[ -f "$file" && "$file" = "$repo_root"/* ]] || exit 0

cd "$repo_root" || exit 0
bin="$repo_root/node_modules/.bin"
[[ -x "$bin/prettier" ]] || exit 0

"$bin/prettier" --write --ignore-unknown --log-level warn "$file"

case "${file##*.}" in
  ts | mts | js | mjs | astro)
    findings="$("$bin/eslint" --max-warnings 0 "$file" 2>&1)" || {
      printf '%s\n' "$findings" >&2
      exit 2
    }
    ;;
esac
