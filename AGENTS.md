# AGENTS.md

## What this is

The website of the South Central STEM Collective (SC2), a 501(c)(3) running FIRST robotics
and hands-on STEM programs in Franklin County, PA. Static Astro site, deployed by Cloudflare
Pages. **Zero client-side framework runtime** — `.astro` components and plain `<script>` only.

## Commands

| Command                        | What it does                                                               |
| ------------------------------ | -------------------------------------------------------------------------- |
| `mise install && pnpm install` | Set up (mise pins node + pnpm; see `docs/tooling.md`)                      |
| `pnpm dev`                     | Dev server                                                                 |
| `pnpm check`                   | Typecheck + lint + format check + knip. **Must pass before every commit.** |
| `pnpm build`                   | Static build to `dist/`                                                    |
| `pnpm fmt` / `pnpm lint:fix`   | Write formatting / autofix lint                                            |

`mise run <task>` forwards to the same `package.json` scripts, which are the single source of truth.

## Toolchain ownership

| Extensions                            | Linter                                         | Formatter |
| ------------------------------------- | ---------------------------------------------- | --------- |
| `.ts .js .mjs .cjs .json .jsonc .css` | oxlint (type-aware, vendored nkzw + anti-slop) | oxfmt     |
| `.astro`                              | ESLint (typed, jsx-a11y-strict)                | Prettier  |
| `.md`                                 | —                                              | Prettier  |

The Claude Code hook in `.claude/hooks/format-lint.sh` runs the right pair on every file you
edit, and feeds lint failures back to you. Do not reach for the other toolchain by hand.

## Architecture

- `src/pages/` — routes (file-based). Every page supplies `title` + `description`.
- `src/layouts/` — `BaseLayout` (chrome + SEO), `ProgramLayout`, `EventLayout`.
- `src/components/ui/` — composed, site-level components. `ui/primitives/` — low-level,
  shadcn-convention, zero-JS-by-default.
- `src/content/` — markdown content collections (sponsors, events, faq, news, robots, photos).
- `src/data/site.ts` — org facts, external URLs, calendar and analytics IDs. No hardcoded constants.
- `functions/` — Cloudflare Pages Functions (form submit, calendar proxy). Own tsconfig.
- `legacy/` — the old Next.js site. **Reference only; never import from it.**

## Rules

- `cn` comes from `cnfast` only. `clsx`, `classnames`, `tailwind-merge` are banned imports.
- No new dependencies without an ADR in `docs/adr/`.
- No client-side frameworks, no framework islands.
- Content changes go in `src/content/` — see `docs/content.md`.
- Visual decisions come from `DESIGN.md`. When code and the doc disagree, the doc wins; when
  the doc is silent, add to it before building (its §11 change process).
- Implementation plan and phase acceptance criteria live in `plan/`.

## Comments

Describe what is there, never what is not. No narrating your edits ("changed X to Y"), no
"as requested", no placeholders for work you did not do. Rejected alternatives and the
reasoning behind a decision go in `docs/adr/`, not in a comment.
