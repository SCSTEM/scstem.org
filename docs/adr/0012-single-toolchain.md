# 0012 — One toolchain: ESLint and Prettier for every file

- **Status:** accepted
- **Date:** 2026-09-01
- **Supersedes:** [0001](0001-toolchain-split.md)

## Context

ADR 0001 split lint and format ownership by extension: oxlint and oxfmt for `.ts`/`.js`/`.json`/
`.css`, ESLint and Prettier for `.astro` and `.md`. The split bought speed on the half of the repo
oxc could read, and cost two configs, two sets of ignore rules, a routing hook, a `--ignore-path`
workaround on every oxfmt call, an explicit glob on every Prettier call, and import bans declared
twice. `.astro` files are the bulk of the site, and oxc still cannot read them.

## Decision

ESLint and Prettier own every file until oxlint and oxfmt support `.astro`.

- `eslint.config.ts`: `typescript-eslint` `strictTypeChecked` + `stylisticTypeChecked` over
  `**/*.{ts,mts,js,mjs,astro}` with `projectService`; `eslint-plugin-astro` `recommended` +
  `jsx-a11y-strict` over `.astro`; `perfectionist/sort-imports` throughout.
- `.prettierrc.json`: `prettier-plugin-astro` and `prettier-plugin-tailwindcss` (class sorting
  in markup and in `cn`/`cva` calls, resolved against `src/styles/global.css`). No per-directory
  ignore list for Markdown: tables and lists are formatted like everything else.
- The vendored `tools/lint/` (nkzw's oxlint config, the anti-slop oxlint plugin) is removed with
  the runtime it was written for. Its type-safety intent is carried by `strictTypeChecked`.
- `tsgo` (`@typescript/native-preview`) is dropped too: `functions/` and `tools/` typecheck with
  the `tsc` the repo already ships for `astro check`. Two compilers for one small tree was not
  worth a dependency.

## Consequences

- One linter, one formatter, one hook branch. `pnpm lint` is `eslint`, `pnpm fmt` is `prettier`.
- Lint is slower than oxlint on `.ts` files: about 15 s for the repo, type-aware. Acceptable for
  a site this size.
- Reversal is the migration seam from ADR 0001, applied once oxc reads `.astro`: swap the
  binaries, keep the rules. Accessibility coverage (`jsx-a11y-strict`) must survive the swap.
