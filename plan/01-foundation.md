# Phase 01 — Foundation: branch, toolchain, scaffold, agent config, CI

**Prerequisites:** none (first implementation phase).
**Stack layer:** `overhaul/01-foundation`, stacked on `claude/website-overhaul-plan-38czl6` (the plan/DESIGN branch — bottom of the stack, targets `staging`). PR targets that branch (D23).

## Objective

An empty-but-real Astro project at the repo root with the complete final toolchain: pnpm + mise, oxlint/oxfmt + scoped ESLint/Prettier, strictest TypeScript, knip, Claude Code hooks, `AGENTS.md`, and blocking CI. The old site parked in `legacy/`. Everything later phases build on.

## Tasks

### 1. Park the old site

- `git mv` into `legacy/`: `src/`, `data/`, `next.config.ts`, `postcss.config.mjs`, `biome.json`, `components.json`, `tsconfig.json`, `package.json`, `package-lock.json`, `.nvmrc`, `.env.development`, `.env.production`, `next-env.d.ts`.
- **Keep at root:** `public/` (shared; pruned in Phase 09), `functions/` (kept as-is), `README.md`, `plan/`, `.vscode/` (rewritten below).
- Add `legacy/README.md`: "Reference only. Do not import, copy, or build. Deleted at cutover (Phase 11)."
- Ensure every tool configured below ignores `legacy/` (tsconfig exclude, oxlint/oxfmt ignorePatterns, eslint ignores, prettierignore, knip ignore, `.gitignore` untouched).

### 2. Runtime + package manager (mise, pnpm) — spark conventions

- `mise.toml`:
  - `[settings]`: `minimum_release_age = "7d"`, `npm.package_manager = "pnpm"`.
  - `[tools]`: pin exact current versions — `node` (latest LTS line matching or newer than legacy's v26.5.0; pick current at implementation time) and `pnpm` (latest).
  - `[env]`: `_.path = ["{{config_root}}/node_modules/.bin"]`.
  - `[tasks]`: thin forwarders only (`run = "pnpm run <name>"` + `description`) for: `install`, `dev`, `build`, `preview`, `check`, `typecheck`, `lint`, `lint:fix`, `fmt`, `fmt:check`, `knip`. **mise tasks never hold real commands; `package.json` scripts are the single source of truth.**
- Commit `mise.lock` (`mise install` generates it).
- Root `package.json`: `"private": true`, `"type": "module"`, `"packageManager": "pnpm@<exact>"` (must match mise pin), `"engines": { "node": ">=<major>" }`.
- `pnpm-workspace.yaml` (install policy only, no `packages:` key):
  ```yaml
  minimumReleaseAge: 10080 # 7 days, supply-chain cooldown
  allowBuilds:
    sharp: true    # astro:assets image processing
    esbuild: true
  ```
  Add `minimumReleaseAgeExclude` entries only when a specific fix is needed; comment why.
- Document the corepack footgun in `docs/tooling.md`: corepack's pnpm shim can shadow the mise-pinned one and rewrite the lockfile — `which pnpm` must resolve to mise shims; otherwise `corepack disable pnpm`.

### 3. Astro scaffold

- Dependencies (latest stable at implementation time): `astro`, `@astrojs/check`, `@astrojs/sitemap`, `typescript`, `tailwindcss` + `@tailwindcss/vite` (Tailwind v4, CSS-first — no tailwind.config file), `cnfast`.
- `astro.config.ts`: `site: "https://scstem.org"`, `output: "static"`, `outDir: "dist"`, `integrations: [sitemap()]`, vite plugin for tailwind. Match current URL shape (no trailing slashes in links; default `build.format: "directory"` is fine — CF Pages serves both).
- `src/pages/index.astro` placeholder ("rewrite in progress" — never deployed to prod) and `src/styles/global.css` with `@import "tailwindcss";` (tokens come in Phase 02).
- `src/lib/cn.ts`: `export { cn } from "cnfast";` — the only sanctioned import site.
- `tsconfig.json`: `extends: "astro/tsconfigs/strictest"` plus explicitly ensure: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`, `isolatedModules`, `forceConsistentCasingInFileNames`. Path alias `@/*` → `./src/*`. Exclude `legacy`, `dist`, `functions` (functions keep their own tsconfig).

### 4. Lint/format toolchain (D12, D24)

**oxlint + oxfmt own `.ts/.js/.mjs/.cjs/.json/.jsonc/.css`. ESLint + Prettier own `.astro` and `.md`.** Write this ownership table into `docs/tooling.md` and `AGENTS.md`.

- Vendor anti-slop: `npx skills add dmmulroy/anti-slop --skill install-anti-slop`, or manually copy the plugin's `src/` into `tools/lint/anti-slop/` (skip the Effect-specific rule). Excluded from lint/format ignores like spark does.
- `.oxlintrc.json` (model on spark's):
  - `plugins`: `typescript`, `unicorn`, `oxc`, `import`.
  - `options`: `typeAware: true`, `typeCheck: true` (add `oxlint-tsgolint` if required by the oxlint version).
  - `categories`: `correctness: "error"`, `suspicious: "error"`, `perf: "warn"`, `style: "off"`.
  - `jsPlugins`: `{ "name": "anti-slop", "specifier": "./tools/lint/anti-slop/index.ts" }`, all its rules `error`.
  - `no-restricted-imports` (error): `clsx`, `classnames`, `tailwind-merge` (message: "use cn from @/lib/cn (cnfast)"), and any path matching `legacy/`.
  - `ignorePatterns`: `legacy/**`, `dist/**`, `.astro/**`, `tools/lint/anti-slop/**`, `.claude/**`, `plan/**`.
- `.oxfmtrc.json`: `sortTailwindcss: true`, `sortImports: true`, `sortPackageJson: true`; ignore `legacy/**`, `dist/**`, `.astro/**`, `.claude/**`, `tools/lint/anti-slop/**`, `**/*.md`, `**/*.astro`.
- ESLint (flat, `eslint.config.ts`), **scoped to `**/*.astro` only**:
  - `eslint-plugin-astro` flat recommended + its `jsx-a11y-strict` config; `typescript-eslint` parser for frontmatter with type-aware rules (`strictTypeChecked` applied to astro files).
  - Import sorting for `.astro` frontmatter: `eslint-plugin-perfectionist` `sort-imports` (autofixable) — mirrors oxfmt's `sortImports` so the whole repo is sorted.
  - Best-effort task: register the vendored anti-slop rules as a local ESLint plugin for `.astro` frontmatter (the rules use the ESLint rule API). If any rule fails to load under ESLint, skip that rule and note it in `docs/adr/0001-toolchain-split.md` — do not fork the rule source.
  - Global ignores: everything except `**/*.astro` (plus `legacy/**`, `dist/**`, `.astro/**`).
- Prettier: `.prettierrc` with `plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"]` (tailwind plugin last), astro override (`parser: "astro"`). `.prettierignore`: everything except `**/*.astro`, `**/*.md` (`*`, `!*.astro`, `!*.md`, plus re-ignore `legacy/**`, `dist/**`, `plan/**` markdown stays formatted-by-hand: ignore `plan/**` and `docs/adr/**` if churn is unwanted — implementer's call, document it).
- `.editorconfig` for what neither formatter covers (yaml/toml/shell): utf-8, lf, 2-space, final newline, trim trailing whitespace except `*.md`.
- `knip.json`: all rules `"error"`; entry points: `astro.config.ts`, `src/pages/**`, `functions/**`, `eslint.config.ts`; ignore `legacy/**`, `tools/lint/anti-slop/**`.
- `package.json` scripts (single source of truth):
  ```jsonc
  {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "typecheck": "astro check",
    "lint": "oxlint --type-aware && eslint --max-warnings 0 .",
    "lint:fix": "oxlint --type-aware --fix && eslint --max-warnings 0 --fix .",
    "fmt": "oxfmt && prettier --write .",
    "fmt:check": "oxfmt --check && prettier --check .",
    "knip": "knip",
    "check": "pnpm run typecheck && pnpm run lint && pnpm run fmt:check && pnpm run knip"
  }
  ```
- `docs/adr/0001-toolchain-split.md`: record D24 and the exact oxc-Astro migration seam — "when oxlint/oxfmt ship Astro support: delete `eslint.config.ts`, Prettier config + plugins and their devDependencies; remove `.astro`/`.md` from oxfmt ignores; move anti-slop ESLint registration (if any) back to jsPlugins-only; update hook script and `docs/tooling.md` ownership table."

### 5. Editor + agent config

- `.vscode/settings.json`: Prettier as default formatter for `astro`/`markdown`, oxc extension (`oxc.oxc-vscode`) as default for ts/js/json/css with `source.fixAll.oxc` + `source.organizeImports.oxc` on save, `formatOnSave: true`, Tailwind `classRegex` for `cn(...)` and `cva(...)`, `files.associations: {"*.css": "tailwindcss"}`. `.vscode/extensions.json`: `astro-build.astro-vscode`, `oxc.oxc-vscode`, `esbenp.prettier-vscode`, `bradlc.vscode-tailwindcss`, `hverlin.mise-vscode`.
- `AGENTS.md` (concise — aim for one screen) with sections:
  1. What this is (3 lines: static Astro site for South Central STEM Collective, Cloudflare Pages, zero client frameworks).
  2. Commands (`mise run check` / `pnpm check`, dev, build).
  3. Toolchain ownership table (which linter/formatter owns which extensions) + "hooks run them automatically on every edit."
  4. Architecture map (5 lines: pages, layouts, ui vs ui/primitives, content collections, data/site.ts, functions/).
  5. Rules: `cn` only from `@/lib/cn`; no new dependencies without an ADR; no client-side frameworks; content edits go in `src/content/` (see `docs/content.md`); design decisions come from `DESIGN.md`.
  6. Comments policy (adopt spark's): describe what is there, never what is not; no narrating edits; rejected alternatives go in `docs/adr/`.
- `ln -s AGENTS.md CLAUDE.md` (symlink, committed).
- `.claude/settings.json` PostToolUse hook on `Edit|Write|NotebookEdit` → `.claude/hooks/format-lint.sh` (timeout 60).
- `.claude/hooks/format-lint.sh` (adapt spark's `oxc.sh`): read hook JSON from stdin; resolve `.tool_response.filePath // .tool_input.file_path`; exit 0 for files outside repo, in `legacy/`, `dist/`, `.astro/`, `node_modules/`, `plan/`, or vendored rule dirs. Route by extension:
  - `ts|tsx|js|jsx|mjs|cjs|json|jsonc|css` → `oxfmt <file>` then `oxlint --type-aware <file>`; on lint failure print findings to stderr and `exit 2` (feeds back to the agent).
  - `astro` → `prettier --write <file>` then `eslint --max-warnings 0 <file>`; same exit-2 behavior.
  - `md` → `prettier --write <file>` only.

### 6. CI (D14)

- `.github/workflows/ci.yml` — on `pull_request` (every stack layer's PR gets checks; a stacked PR's diff is only that layer's changes, which keeps reviews and CI focused):
  1. Checkout; install mise (`jdx/mise-action`) → tools from `mise.toml`/`mise.lock`.
  2. `pnpm install --frozen-lockfile`.
  3. `pnpm check`.
  4. `pnpm build`.
  5. Link check over output: `lycheeverse/lychee-action` in `--offline` mode against `dist/` (internal links + anchors).
  All steps blocking. (Lighthouse workflow arrives in Phase 09.)
- Do NOT touch Cloudflare Pages settings yet (Phase 11).

## Acceptance criteria

- [x] `mise install && pnpm install && pnpm check && pnpm build` all green on a fresh clone.
- [x] `legacy/` contains the entire old app; no tool reads it; `git grep -l "from \"legacy" src` is empty.
- [x] Deliberately adding `import clsx from "clsx"` to a `.ts` file fails `pnpm lint`; same for a chained type assertion (anti-slop active).
- [x] Editing a `.ts` and an `.astro` file via Claude Code triggers the hook and auto-formats each with the correct toolchain; a lint error is fed back to the agent.
- [ ] CI workflow runs and blocks on a seeded lint error (verify once, then fix). — **verified on the phase PR, not locally.**
- [x] `AGENTS.md` + `CLAUDE.md` symlink, `docs/tooling.md`, `docs/adr/0001-toolchain-split.md` exist.

### Deviations from this brief

- `typescript` pinned to 6.0.3, not latest (7.x): `typescript-eslint` peers `<6.1.0`,
  `@astrojs/check` peers `^5 || ^6`. Recorded in `docs/adr/0001-toolchain-split.md`.
- Every dependency is pinned to the newest version **at least a week old**, because
  `minimumReleaseAge` rejects fresher ones. Pins are therefore not "latest".
- `pnpm typecheck` is `astro check && tsc -p functions`; `functions/` moved to
  `moduleResolution: "bundler"` + `strict` so its existing `@/*` imports typecheck. That
  surfaced one real bug (a `null` `CF-Connecting-IP` was being sent to Turnstile as
  `"null"`), fixed in `functions/util.ts`.
- oxfmt is invoked with `--ignore-path .gitignore` and Prettier with an explicit
  `**/*.{astro,md}` glob; ESLint scopes by `files:` rather than a blanket ignore. All three
  are gitignore-semantics workarounds documented in `docs/tooling.md`.
- The anti-slop rules are **not** re-registered as a local ESLint plugin for `.astro`
  frontmatter; rationale in `docs/adr/0001-toolchain-split.md`.
- `docs/adr/0002-tabler-icons-direct.md` supersedes Phase 03's icon dependency choice.
