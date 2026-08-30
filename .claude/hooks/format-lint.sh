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
# Status 127 means the tool itself is missing, which callers must not report as
# lint findings: on a fresh clone, before `pnpm install`, every edit would
# otherwise be rejected with an empty message.
readonly TOOL_MISSING=127

run() {
  local tool="$1"; shift
  local bin="$repo_root/node_modules/.bin/$tool"
  if [[ -x "$bin" ]]; then
    "$bin" "$@" 2>&1
    return
  fi
  command -v pnpm >/dev/null || return "$TOOL_MISSING"
  [[ -d "$repo_root/node_modules" ]] || return "$TOOL_MISSING"
  pnpm exec "$tool" "$@" 2>&1
}

# Runs a linter and exits 2 with its findings. A missing toolchain exits 0 so the
# edit is allowed through un-linted rather than blocked with nothing to act on.
lint() {
  local findings status
  findings="$(run "$@")"
  status=$?
  case "$status" in
    0) return 0 ;;
    "$TOOL_MISSING") exit 0 ;;
    *)
      printf '%s\n' "$findings" >&2
      exit 2
      ;;
  esac
}

case "${file##*.}" in
  ts | tsx | js | jsx | mjs | cjs | json | jsonc | json5)
    # Without --ignore-path, oxfmt also reads .prettierignore, which excludes
    # every extension oxfmt owns.
    run oxfmt --ignore-path .gitignore "$file" >/dev/null
    lint oxlint --type-aware "$file"
    ;;
  # oxfmt's directory scan formats these too, so `pnpm check` fails on an unformatted one —
  # but oxlint has no rules for them, so they are formatted and not linted. Passing one to
  # oxlint is not a no-op: it reports "No files found to lint" and exits non-zero.
  css | yaml | yml | toml)
    run oxfmt --ignore-path .gitignore "$file" >/dev/null
    ;;
  astro)
    run prettier --write "$file" >/dev/null
    lint eslint --max-warnings 0 "$file"
    ;;
  md)
    run prettier --write "$file" >/dev/null
    ;;
esac

exit 0
