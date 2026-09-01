# Tooling

## Setup

```sh
mise install      # installs the pinned node + pnpm from mise.toml / mise.lock
pnpm install
pnpm check        # typecheck + lint + format check + knip
pnpm dev
```

`mise.toml` pins node and pnpm exactly and commits checksums to `mise.lock`, so every clone and
CI run gets byte-identical tools. `mise.toml`'s `[tasks]` are thin forwarders — **`package.json`
scripts are the single source of truth**; never put a real command in a mise task.

### Node version

Pinned to the node 26 line, matching what the legacy site already ran (`legacy/.nvmrc` was
v26.5.0) and what Cloudflare Pages already serves. Node 26 is the Current line today; move the
pin to 26.x LTS once that line is promoted.

### The corepack footgun

Corepack's `pnpm` shim can shadow the mise-pinned pnpm and silently rewrite the lockfile with a
different resolver. `which pnpm` must resolve inside the mise shims directory. If it does not:

```sh
corepack disable pnpm
```

### Supply-chain cooldown

Two independent cooldowns, both intentional:

- `mise.toml` → `minimum_release_age = "7d"` for node and pnpm themselves.
- `pnpm-workspace.yaml` → `minimumReleaseAge: 10080` (minutes) for every npm dependency.

Consequence: **pins are the newest version that is at least a week old**, not the newest version.
`pnpm install` refuses fresher ones by design. To take a newer version early, add a
`minimumReleaseAgeExclude` entry and comment why in `pnpm-workspace.yaml`.

Install scripts are denied by default; `allowBuilds` lists the exceptions (`sharp`, `esbuild`).

`sharp` is a direct dependency rather than one inherited from Astro: pnpm's isolated layout keeps
Astro's copy where the bundled image service cannot resolve it, so `astro:assets` falls back to
unoptimized passthrough with one warning per image. See `docs/adr/0003-sharp-direct-dependency.md`.

## Toolchain ownership

| Extensions                            | Linter                                                   | Formatter |
| ------------------------------------- | -------------------------------------------------------- | --------- |
| `.ts .js .mjs .cjs .json .jsonc .css` | oxlint — type-aware, vendored nkzw config + anti-slop    | oxfmt     |
| `.astro`                              | ESLint — typed (`strictTypeChecked`) + `jsx-a11y-strict` | Prettier  |
| `.md`                                 | —                                                        | Prettier  |

Rationale and the migration seam for collapsing onto oxc: `docs/adr/0001-toolchain-split.md`.

### Invocation quirks worth knowing

- **oxfmt reads `.prettierignore` by default.** Since that file exists for Prettier, every oxfmt
  invocation passes `--ignore-path .gitignore` — otherwise oxfmt would skip every file it owns.
- **Prettier is called with an explicit `**/*.{astro,md}` glob.** A blanket `*` in
  `.prettierignore` prunes whole directories, and gitignore semantics cannot un-prune individual
  files inside them, so the glob does the scoping and `.prettierignore` only holds real exclusions.
- **ESLint's global ignores cannot use `ignores: ["**/*", "!**/*.astro"]`** for the same reason.
  Scoping comes from every config block being `files: ["**/*.astro"]`.
- **oxlint ignores `**/*.astro`** so the two linters never both own a file.
- **`eslint-plugin-jsx-a11y` is a direct devDependency.** It is an _optional_ peer of
  `eslint-plugin-astro`, so without it `astroConfigs["jsx-a11y-strict"]` degrades to `{ rules: {} }`
  silently — no install warning, no accessibility linting. Its published peer range stops at
  eslint `^9`; `pnpm-workspace.yaml` allows eslint 10 there, and the rules do fire (check with
  `eslint --print-config` on any `.astro` file — expect ~33 `jsx-a11y/*` entries, not zero).
- **The `clsx`/`tailwind-merge` and `legacy/*` import bans are declared twice** — once in
  `.oxlintrc.json` and again in `eslint.config.ts`. oxlint ignores `.astro`, so the ESLint copy is
  what enforces them in the file type the site is built from. Both copies must change together.
- **`functions/` has its own tsconfig** and is typechecked separately (`tsgo -p functions`, part of
  `pnpm typecheck`). It uses `moduleResolution: "bundler"` because Cloudflare bundles Functions
  with esbuild, which resolves the extensionless `@/*` path aliases the source already uses. It
  restates the root tsconfig's strictness flags rather than extending
  `astro/tsconfigs/strictest` (which pulls in DOM and Astro types the Workers runtime lacks) —
  this is the only code handling untrusted request input, so it must not typecheck more loosely
  than `src/`.

### TypeScript: two compilers, on purpose

| What                      | Compiler                                                          |
| ------------------------- | ----------------------------------------------------------------- |
| `src/**` and `.astro`     | `astro check` → JavaScript TypeScript (`typescript`)              |
| `functions/**`            | `tsgo` → TypeScript 7, the Go port (`@typescript/native-preview`) |
| oxlint's type-aware rules | `tsgolint` → also Go (`oxlint-tsgolint`)                          |

`functions/` runs on TypeScript 7. Measured on this tree: `tsc -p functions` 961 ms, `tsgo -p functions`
182 ms.

**`astro check` cannot move yet, and that is why `typescript` is still a dependency.**
`@astrojs/check` declares `peerDependencies: { "typescript": "^5.0.0 || ^6.0.0" }` and its language
server is built against the JavaScript compiler's Language Service API.
`@typescript/native-preview` exports only `version` and `versionMajorMinor` — there is no
`typescript.js` or `tsserver.js` in it — so nothing can substitute it there.

This is not an Astro backlog item; it is upstream. From Astro's own tracking discussion
([withastro/roadmap#1321](https://github.com/withastro/roadmap/discussions/1321)), maintainer
delucis:

> TypeScript 7 does not yet expose a stable programmatic API, and so tools (such as Volar) which
> embed TypeScript into their own compilers and language services can only currently rely on
> TypeScript 6.0.

Astro's language server is Volar-based, so the same blocker hits Vue and Svelte. The TypeScript
team is building a replacement for the deprecated JS ("Strada") API and reportedly targets it for
**7.1**; no date is committed. **Watch that discussion** — when the API lands and `@astrojs/check`
widens its peer range, `astro check` can move and `typescript` can be dropped.

`js/ts.experimental.useTsgo` in `.vscode/settings.json` routes plain `.ts` files to tsgo. That is
independent of the Astro extension, which keeps using its own TS 6 language server for `.astro`.
The tracking discussion does carry reports of import/export resolution oddities in editors with
tsgo enabled — if `.astro` intellisense misbehaves, that setting is the first thing to turn off.

`@typescript/native-preview` is a `7.0.0-dev.*` build; it is pinned exactly, like every other tool
here, and `pnpm-workspace.yaml`'s `minimumReleaseAge` still applies.

In the editor, `js/ts.experimental.useTsgo` routes `.ts` files to tsgo while `js/ts.tsdk.path` keeps
the JavaScript compiler available for the Astro language server — the same split as the table above.

### Lint rule sources

oxlint's rule set comes from three places, layered:

1. **`tools/lint/nkzw/oxlintrc.json`** — a vendored copy of
   [`@nkzw/oxlint-config`](https://github.com/nkzw-tech/oxlint-config) (MIT), extended by path from
   `.oxlintrc.json`. 146 general-purpose rules: unicorn, typescript-eslint, oxc, import-x,
   perfectionist, and the core set. See its `VENDOR.md` for what was dropped (React, Relay and
   test-runner rules that do not apply here) and how to update it.
2. **`tools/lint/anti-slop/`** — the vendored plugin below.
3. **`.oxlintrc.json`'s own `rules`** — the `legacy/**` import ban and the anti-slop rule list.

**Every rule is an error.** `perf` was a warning and is now an error; `style` is off. A warning
nobody has to fix is a rule nobody obeys, so the choice is error or off — which is also the reason
for adopting the nkzw set, whose severities are all `error` upstream.

**`perfectionist/sort-objects` is off**, and it is the one rule from upstream that is disabled on
its merits rather than for inapplicability. Its autofix reorders an object's keys but leaves leading
comments where they were, so on any object whose keys carry doc comments it silently produces false
documentation. Reproduced on `src/data/site.ts` in a single `--fix` pass: `shortName`'s comment
ended up labelling `description`, `titleTemplate`'s ended up on `email`, and the multi-line comment
for `calendars` ended up on `analytics`. AGENTS.md requires a comment to describe what is there, and
a rule that rewrites them to describe something else cannot be a `--fix` away from green.

The sibling rules do not have this flaw — `sort-interfaces` and `sort-object-types` were checked
against a commented interface and a commented type literal and carried each comment with its member
— so they stay on, as do `sort-imports`, `sort-enums`, `sort-heritage-clauses` and `sort-jsx-props`.

Two deliberate exceptions live in `.oxlintrc.json`'s `overrides`:

- `no-console` is off under `functions/**` and `tools/**`. A Cloudflare Worker's console is its
  log stream — `wrangler tail` and the dashboard read nothing else — and a CLI check script's
  console is how it reports to the developer running it. Neither is the shipped-debug-logging case
  the rule guards. Everywhere else it stays an error.
- Upstream's own `.ts` override is kept, which turns off the correctness rules TypeScript already
  covers (`no-undef`, `no-redeclare`, …). That is the config's speed principle, not a gap.

**Import bans use `**`, not `*`.** A single star matches one path segment, so `legacy/*` allowed
`legacy/data/config` and every deep relative path. Both linters use `["legacy/**", "**/legacy/**"]`
and both are verified against a deep relative import.

### Vendored lint rules

`tools/lint/anti-slop/` is a copy of [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop)
(MIT), registered as an oxlint `jsPlugin`. See its `VENDOR.md` for the upstream commit and update
procedure. It is excluded from this repo's own lint, format, and typecheck — it is upstream source.

## Agent hooks

`.claude/hooks/format-lint.sh` runs on every `Edit`/`Write` from Claude Code: it routes the edited
file to the owning formatter, then the owning linter, and exits 2 with the findings on a lint
failure so they go back to the agent. Files in `legacy/`, `dist/`, `.astro/`, `plan/`, and the
vendored rule directory are skipped.

## Environment variables

| Variable                    | Where                 | Purpose                               |
| --------------------------- | --------------------- | ------------------------------------- |
| `PUBLIC_TURNSTILE_SITE_KEY` | build (public)        | Turnstile widget on the contact form  |
| `PUBLIC_CF_BEACON_TOKEN`    | build (public)        | Cloudflare Web Analytics beacon (D21) |
| `TS_SECRET_KEY`             | Pages Function secret | Turnstile server-side verification    |
| `SLACK_FORM_POST_GENERIC`   | Pages Function secret | Slack webhook for contact submissions |

`PUBLIC_CF_BEACON_TOKEN` defaults to empty, and an empty token means the beacon is simply not
injected — so a fresh clone and every preview run with GA4 alone. Setting it is an owner task in
`docs/analytics.md`.

`PUBLIC_TURNSTILE_SITE_KEY` is declared in `astro.config.ts`'s `env.schema`, so pages import it
from `astro:env/client` rather than reaching into an untyped `import.meta.env`. It **defaults to
Cloudflare's documented always-passes test key** (`1x00000000000000000000AA`), which is why a
fresh clone and every preview deploy have a working form with no setup — and why the production
value has to be set deliberately, in the Cloudflare Pages dashboard, alongside the `TS_SECRET_KEY`
its server half checks against. A site key is public by design: it ships in the page's HTML.

The secret half has a matching always-passes test value baked into `functions/api/form/submit.ts`
for the same reason, so the whole round trip works locally without credentials.

## CI

`.github/workflows/ci.yml` runs on every pull request: mise install → `pnpm install
--frozen-lockfile` → `pnpm check` → `pnpm build` → offline link check over `dist/`. All steps
block. Deploys are **not** driven by Actions — Cloudflare Pages' dashboard git integration owns
them (D14).

### Performance budgets

`.github/workflows/lighthouse.yml` is the second required check. It builds, serves `dist/` with
`astro preview`, and runs `pnpm dlx @lhci/cli@0.15.1 autorun` three times against six URLs — one
of each page shape: `/`, `/programs/frc/`, `/programs/frc/robots/`, `/sponsors/`, `/openhouse/`,
`/contact/`. Every assertion in `lighthouserc.json` is an error, so a regression blocks the merge.

| Assertion                | Budget    |
| ------------------------ | --------- |
| Performance              | ≥ 0.95    |
| Accessibility            | = 1.00    |
| SEO                      | = 1.00    |
| Best Practices           | ≥ 0.95    |
| Largest Contentful Paint | < 2000 ms |
| Cumulative Layout Shift  | < 0.05    |
| Total Blocking Time      | < 100 ms  |
| Script transfer size     | < 35 KB   |
| Total page transfer size | < 1 MB    |

Assertions aggregate on the **median** of the three runs. Lantern's LCP for this site carries one
slow run per page — a ~500 ms step in simulated FCP that appears run to run even on an idle
machine — and median-of-three absorbs exactly that. Every run on every budgeted URL is currently
under the 2000 ms LCP budget, the worst being 1953 ms; the tightest medians are `/` and
`/openhouse/` at 1807 ms. Getting there was two font changes, not the image work — see
`plan/09-assets-performance.md` for the before/after and `docs/adr/0008` and `0011` for the
reasoning.

Mobile emulation with simulated throttling (1.6 Mbps, 150 ms RTT) — the default preset, and the
reason transfer size dominates every metric here. `astro preview` gzips, which is what makes the
measurement comparable to what Cloudflare serves; a server that did not would fail budgets
production meets.

To run it locally, with a Chrome that Lighthouse can find:

```sh
pnpm build
pnpm dlx @lhci/cli@0.15.1 autorun
pnpm exec astro preview stop   # LHCI kills its wrapper; the preview server outlives it
```

Reports land in `.lighthouseci/reports/` (gitignored) as HTML and JSON, and CI uploads them as an
artifact on every run. Why `pnpm dlx` rather than a devDependency or a marketplace action:
`docs/adr/0007-lighthouse-ci-gate.md`.

The hero video on `/programs/frc/` is `preload="none"` and only arms after the `load` event, so it
does not count against that page's transfer budget during a run — see
`docs/adr/0006-hero-video-encode.md`.

### Known environment limitation

The sandboxed environment this repo is sometimes developed in cannot reach
`tuf-repo-cdn.sigstore.dev`, so mise's GitHub artifact-attestation check for the pnpm download
fails there. The committed configuration keeps verification **on**; only that environment relaxes
it via `MISE_AQUA_GITHUB_ATTESTATIONS=false`, and the tool checksums in `mise.lock` still apply.
Real developers and CI verify normally.
