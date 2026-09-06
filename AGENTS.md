# AGENTS.md

## What this is

The website of the South Central STEM Collective (SC2), a 501(c)(3) running FIRST robotics
and hands-on STEM programs in Franklin County, PA. Static Astro site, deployed by Cloudflare
Pages. **Zero client-side framework runtime** — `.astro` components and plain `<script>` only.

## Commands

| Command                        | What it does                                                                             |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| `mise install && pnpm install` | Set up (mise pins node + pnpm; see `docs/tooling.md`)                                    |
| `pnpm dev`                     | Dev server                                                                               |
| `pnpm check`                   | Typecheck + lint + format check + knip + repo checks. **Must pass before every commit.** |
| `pnpm build`                   | Static build to `dist/`                                                                  |
| `pnpm fmt` / `pnpm lint:fix`   | Write formatting / autofix lint                                                          |

## Toolchain

ESLint (typed `strictTypeChecked` + `stylisticTypeChecked`, `eslint-plugin-astro` with
`jsx-a11y-strict`, the vendored anti-slop rules in `tools/lint/`) lints every `.ts`, `.js`, and
`.astro` file. Prettier formats everything (`docs/adr/0012-single-toolchain.md`).
TypeScript 6 throughout: `astro check` covers `src/` and the config files, `tsc` covers
`functions/` and `tools/`.

The Claude Code hook in `.claude/hooks/format-lint.sh` formats and lints every file you edit and
feeds lint failures back to you.

Repo-specific checks and asset pipelines are TypeScript scripts under `tools/`, run directly by
Node (`node tools/checks/verify-meta.ts`); every one has a `package.json` script.

## Architecture

- `src/pages/` — routes (file-based). Every page supplies `title` + `description`.
- `src/layouts/` — `BaseLayout` (chrome + SEO), `ProgramLayout`, `EventLayout`.
- `src/components/ui/` — composed, site-level components. `ui/primitives/` — low-level,
  shadcn-convention, zero-JS-by-default.
- `src/content/` — markdown content collections (sponsors, events, faq, news, robots, photos).
- `src/data/site.ts` — org facts, external URLs, calendar and analytics IDs. No hardcoded constants.
- `functions/` — Cloudflare Pages Functions (form submit, calendar proxy). Own tsconfig.
- `tools/` — repo checks, asset pipelines, and CI helpers. Own tsconfig.

## Rules

- `cn` comes from `@/lib/cn` only — a `cnfast` merge configured with the DESIGN.md §3 type scale
  (see the docstring). `clsx`, `classnames`, `tailwind-merge` are banned imports.
- The `font-size` group in `src/lib/cn.ts` mirrors the `--text-*` tokens in `src/styles/global.css`
  by hand. Adding, renaming, or removing a size token means the same edit in both files, in the
  same commit; nothing checks them, and a missing entry shows up only as a wrong size in the
  browser.
- No new dependencies without an ADR in `docs/adr/`.
- No client-side frameworks, no framework islands.
- Content changes go in `src/content/` — see `docs/content.md`. **Never inline a content array
  in a page** where a collection exists (the legacy site's habit): query the collection. New
  repeating content earns a collection, not a `const` in frontmatter.
- Collection schemas stay flat (strings, enums, booleans, dates, numbers, images) so a git-backed
  CMS stays a later addition. A schema change needs an ADR.
- Visual decisions come from `DESIGN.md`. When code and the doc disagree, the doc wins; when
  the doc is silent, add to it before building (its §11 change process).
- Implementation plan and phase acceptance criteria live in `plan/`.

## Comments

Describe what is there, never what is not. No narrating your edits ("changed X to Y"), no
"as requested", no placeholders for work you did not do. Rejected alternatives and the
reasoning behind a decision go in `docs/adr/`, not in a comment.
