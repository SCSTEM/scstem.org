#!/usr/bin/env bash
# Formats and lints one edited file with whichever toolchain owns its extension
# (docs/tooling.md). Lint failures exit 2 so the findings go back to the agent.
set -uo pipefail

repo_root="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null)}"
[[ -n "$repo_root" ]] || exit 0

payload="$(cat)"
file="$(printf '%s' "$payload" | jq -r '.tool_response.filePath // .tool_input.file_path // empty')"
[[ -n "$file" ]] || exit 0
[[ -f "$file" ]] || exit 0

# Absolute, and inside this repo.
case "$file" in
  /*) ;;
  *) file="$repo_root/$file" ;;
esac
case "$file" in
  "$repo_root"/*) ;;
  *) exit 0 ;;
esac

rel="${file#"$repo_root"/}"
case "$rel" in
  legacy/* | dist/* | .astro/* | node_modules/* | plan/* | tools/lint/anti-slop/* | pnpm-lock.yaml)
    exit 0
    ;;
esac

cd "$repo_root" || exit 0

# Use the installed binaries directly so the hook works without pnpm on PATH.
run() {
  local tool="$1"; shift
  local bin="$repo_root/node_modules/.bin/$tool"
  [[ -x "$bin" ]] || { command -v pnpm >/dev/null && pnpm exec "$tool" "$@" 2>&1; return; }
  "$bin" "$@" 2>&1
}

case "${file##*.}" in
  ts | tsx | js | jsx | mjs | cjs | json | jsonc | css)
    # Without --ignore-path, oxfmt also reads .prettierignore, which excludes
    # every extension oxfmt owns.
    run oxfmt --ignore-path .gitignore "$file" >/dev/null
    if ! findings="$(run oxlint --type-aware "$file")"; then
      printf '%s\n' "$findings" >&2
      exit 2
    fi
    ;;
  astro)
    run prettier --write "$file" >/dev/null
    if ! findings="$(run eslint --max-warnings 0 "$file")"; then
      printf '%s\n' "$findings" >&2
      exit 2
    fi
    ;;
  md)
    run prettier --write "$file" >/dev/null
    ;;
esac

exit 0
