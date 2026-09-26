# 0001 — Split the lint/format toolchain between oxc and ESLint/Prettier

- **Status:** superseded by [0012](0012-single-toolchain.md)
- **Date:** 2026-08-28
- **Decision reference:** D12, D24 (`plan/00-overview.md`)

## Context

We want oxc (oxlint + oxfmt) everywhere: it is fast, type-aware, and configured in one place.
It does not support `.astro` yet. Astro files are the bulk of this site's UI, and they need both
a typed linter for their frontmatter and an accessibility ruleset for their markup.

## Decision

Split ownership by extension, with no overlap:

| Extensions                            | Linter                                                                 | Formatter |
| ------------------------------------- | ---------------------------------------------------------------------- | --------- |
| `.ts .js .mjs .cjs .json .jsonc .css` | oxlint (`typeAware`, `typeCheck`, vendored anti-slop)                  | oxfmt     |
| `.astro`                              | ESLint (`strictTypeChecked` + `eslint-plugin-astro` `jsx-a11y-strict`) | Prettier  |
| `.md`                                 | —                                                                      | Prettier  |

Import sorting is enabled on both halves — oxfmt's `sortImports` and
`eslint-plugin-perfectionist`'s `sort-imports` for `.astro` frontmatter — so the whole repo is
sorted the same way regardless of which tool touched a file.

## Consequences

- Two linters, two formatters, two configs, and a hook script that routes files between them.
- Every invocation carries a workaround: oxfmt must be given `--ignore-path .gitignore` (it reads
  `.prettierignore` by default), and Prettier must be given an explicit `**/*.{astro,md}` glob
  (gitignore-style blanket ignores prune directories irreversibly). Both are documented in
  `docs/tooling.md`.
- A file could in principle be claimed by both tools. It is not: oxlint ignores `**/*.astro`, and
  every ESLint config block is scoped to `files: ["**/*.astro"]`.

## The migration seam

When oxlint and oxfmt ship Astro support, collapsing onto oxc is a deletion, not a refactor:

1. Delete `eslint.config.ts`, `.prettierrc.json`, `.prettierignore`.
2. Remove these devDependencies: `eslint`, `eslint-plugin-astro`, `eslint-plugin-perfectionist`,
   `astro-eslint-parser`, `typescript-eslint`, `prettier`, `prettier-plugin-astro`,
   `prettier-plugin-tailwindcss`, `jiti`.
3. Remove `**/*.astro` and `**/*.md` from `.oxfmtrc.json`'s `ignorePatterns`, and `**/*.astro`
   from `.oxlintrc.json`'s `ignorePatterns`.
4. Simplify `package.json`: `lint` → `oxlint --type-aware`, `fmt` → `oxfmt`, `fmt:check` →
   `oxfmt --check` (the `--ignore-path` workaround goes away with `.prettierignore`).
5. Reduce `.claude/hooks/format-lint.sh` to the oxc branch and delete the ESLint/Prettier branches.
6. Update the ownership tables in `docs/tooling.md` and `AGENTS.md`.
7. Check whether the a11y rules `eslint-plugin-astro`'s `jsx-a11y-strict` provided have oxlint
   equivalents. **Do not drop accessibility coverage to finish the migration** — if oxlint has no
   equivalent, keep ESLint for that ruleset alone and record a follow-up ADR.

## Notes

- The anti-slop rules use the ESLint rule API, and `@oxlint/plugins`' `eslintCompatPlugin` adapts
  them for oxlint. Registering them a second time as a local ESLint plugin for `.astro` frontmatter
  was considered and skipped: the rules are type-aware and would need a second type-checking pass
  over Astro frontmatter for little gain. Frontmatter is thin by convention in this codebase — the
  logic that anti-slop is worth running against lives in `.ts` files, which oxlint owns.
- `typescript` is pinned to the 6.x line, not 7.x: `typescript-eslint` peers on `<6.1.0` and
  `@astrojs/check` on `^5 || ^6`. `oxlint-tsgolint` bundles its own type checker and is unaffected.
