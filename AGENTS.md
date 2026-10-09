# AGENTS.md

## What this is

The website of the South Central STEM Collective (SC2), a 501(c)(3) running FIRST robotics
and hands-on STEM programs in Franklin County, PA. Static Astro site, deployed by Cloudflare
Pages. **Zero client-side framework runtime** — `.astro` components and plain `<script>` only.

## Commands

| Command                        | What it does                                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| `mise install && pnpm install` | Set up (mise pins node, pnpm, and hk, and installs the pre-commit hook; see `docs/tooling.md`) |
| `pnpm dev`                     | Dev server                                                                                     |
| `pnpm check`                   | Every `hk.pkl` step: typecheck, lint, format, knip. **Must pass before every commit.**         |
| `pnpm build`                   | Static build to `dist/`                                                                        |
| `pnpm fix`                     | Write formatting and lint autofixes (`hk fix --all`)                                           |

## Toolchain

ESLint (typed `strictTypeChecked` + `stylisticTypeChecked`, `eslint-plugin-astro` with
`jsx-a11y-strict`, the vendored anti-slop rules in `tools/lint/`) lints every `.ts`, `.js`, and
`.astro` file; `@shadcn/lint`'s token rules check every class in `src/` against the `@theme`.
Prettier formats everything.
TypeScript 6 throughout: `astro check` covers `src/` and the config files, `tsc` covers
`functions/` and `tools/`.

Every check is a step in `hk.pkl`, and the same steps back the git
pre-commit hook, `pnpm check` / `pnpm fix`, CI, and the Claude Code hooks in
`.claude/settings.json`: each file you edit is formatted and linted, and the end of each turn
runs the full set, typecheck and knip included, over the modified files. Unfixable failures
come back to you.

Browser verification goes through `agent-browser` (the `agent-browser` skill; setup in
`docs/tooling.md`), against `pnpm preview`, not the dev server.

Repo-specific checks and asset pipelines are TypeScript scripts under `tools/`, run directly by
Node (`node tools/checks/verify-meta.ts`); every one has a `package.json` script.

## Architecture

- `src/pages/` — routes (file-based). Every page supplies `title` + `description`.
- `src/layouts/` — `BaseLayout` (chrome + SEO), `ProgramLayout`, `EventLayout`.
- `src/components/ui/` — composed, site-level components. `ui/primitives/` — low-level,
  shadcn-convention, zero-JS-by-default.
- `src/content/` — markdown content collections (sponsors, events, faq, robots, photos).
- `src/data/site.ts` — org facts, external URLs, calendar and analytics IDs. No hardcoded constants.
- `src/styles/tokens.css` — every design token, as plain CSS the wiki and apps import too;
  `global.css` maps it onto Tailwind. `/styleguide` gates its contrast at build time.
- `functions/` — Cloudflare Pages Functions (form submit, calendar proxy). Own tsconfig.
- `tools/` — repo checks, asset pipelines, and CI helpers. Own tsconfig.

## Rules

- `cn` comes from `@/lib/cn` only — a [`cn`](https://github.com/shadcn-ui/cn) merge configured
  with the DESIGN.md §3 type scale (see the docstring). `clsx`, `classnames`, `tailwind-merge`
  are banned imports.
- The `font-size` group in `src/lib/cn.ts` mirrors the `--text-*` names that `src/styles/global.css`
  maps from `tokens.css`, by hand. Adding, renaming, or removing a size token means the same edit
  in all three files, in the same commit. The lint rejects a class that names no token, but nothing checks the mirror: a
  token missing from `cn.ts` shows up only as a wrong size in the browser.
- No client-side frameworks, no framework islands.
- Content changes go in `src/content/` — see `docs/content.md`. **Never inline a content array
  in a page** where a collection exists (the legacy site's habit): query the collection. New
  repeating content earns a collection, not a `const` in frontmatter.
- Collection schemas stay flat (strings, enums, booleans, dates, numbers, images) so a git-backed
  CMS stays a later addition.
- Visual decisions come from `DESIGN.md`. When code and the doc disagree, the doc wins; when
  the doc is silent, add to it before building (its §11 change process).
- Implementation plan and phase acceptance criteria live in `plan/`.

## Comments

Describe what is there, never what is not. No narrating your edits ("changed X to Y"), no
"as requested", no placeholders for work you did not do, no rejected alternatives.

Comment only where the code cannot speak for itself: behavior that is ambiguous or unclear
from reading it, or a deliberate break from convention or an uncommon path that a reader would
otherwise "fix". A comment never restates what the code already says, never justifies a
one-off decision, and never names anything that can go stale (a file path, a function, a
component, a person). When in doubt, leave it out.
