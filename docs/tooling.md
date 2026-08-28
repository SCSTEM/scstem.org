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

## Toolchain ownership

| Extensions                            | Linter                                                   | Formatter |
| ------------------------------------- | -------------------------------------------------------- | --------- |
| `.ts .js .mjs .cjs .json .jsonc .css` | oxlint — type-aware, plus vendored anti-slop             | oxfmt     |
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
- **`functions/` has its own tsconfig** and is typechecked separately (`tsc -p functions`, part of
  `pnpm typecheck`). It uses `moduleResolution: "bundler"` because Cloudflare bundles Functions
  with esbuild, which resolves the extensionless `@/*` path aliases the source already uses. It
  restates the root tsconfig's strictness flags rather than extending
  `astro/tsconfigs/strictest` (which pulls in DOM and Astro types the Workers runtime lacks) —
  this is the only code handling untrusted request input, so it must not typecheck more loosely
  than `src/`.

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

| Variable                    | Where                 | Purpose                                         |
| --------------------------- | --------------------- | ----------------------------------------------- |
| `PUBLIC_TURNSTILE_SITE_KEY` | build (public)        | Turnstile widget on the contact form (Phase 07) |
| `TS_SECRET_KEY`             | Pages Function secret | Turnstile server-side verification              |
| `SLACK_FORM_POST_GENERIC`   | Pages Function secret | Slack webhook for contact submissions           |

The dev/test Turnstile key that always passes is in `legacy/.env.development`.

## CI

`.github/workflows/ci.yml` runs on every pull request: mise install → `pnpm install
--frozen-lockfile` → `pnpm check` → `pnpm build` → offline link check over `dist/`. All steps
block. Lighthouse CI budgets join in Phase 09. Deploys are **not** driven by Actions — Cloudflare
Pages' dashboard git integration owns them (D14).

### Known environment limitation

The sandboxed environment this repo is sometimes developed in cannot reach
`tuf-repo-cdn.sigstore.dev`, so mise's GitHub artifact-attestation check for the pnpm download
fails there. The committed configuration keeps verification **on**; only that environment relaxes
it via `MISE_AQUA_GITHUB_ATTESTATIONS=false`, and the tool checksums in `mise.lock` still apply.
Real developers and CI verify normally.
