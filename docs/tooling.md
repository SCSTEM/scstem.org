# Tooling

## Setup

```sh
mise install      # installs the pinned node + pnpm from mise.toml / mise.lock
pnpm install
pnpm check        # typecheck + lint + format check + knip + repo checks
pnpm dev
```

`mise.toml` pins node and pnpm exactly and commits checksums to `mise.lock`, so every clone, CI
run, and Cloudflare Pages build gets the same tools. `package.json` scripts are the single
source of truth for commands.

Corepack's `pnpm` shim can shadow the mise-pinned pnpm and rewrite the lockfile with a different
resolver. `which pnpm` must resolve inside mise's shims directory; if not, `corepack disable pnpm`.

## Toolchain

| Concern     | Tool                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------- |
| Lint        | ESLint: `strictTypeChecked` + `stylisticTypeChecked`, `astro/jsx-a11y-strict`, anti-slop |
| Format      | Prettier, with the Astro and Tailwind plugins                                            |
| Types       | `astro check` for `src/` and config files; `tsc -p functions`, `tsc -p tools`            |
| Dead code   | knip                                                                                     |
| Repo checks | `tools/checks/*.ts`                                                                      |

TypeScript is the 6.x line everywhere, one compiler for `astro check`, `tsc`, and
`typescript-eslint`. `astro check` (Volar) needs the JavaScript compiler's API, which TypeScript 7
does not expose yet; when it does and `@astrojs/check` widens its peer range, bump the pin.

### `tools/`

TypeScript scripts run directly by Node (type stripping, no build step), each behind a
`package.json` script:

| Script            | Does                                                        | Runs in         |
| ----------------- | ----------------------------------------------------------- | --------------- |
| `check:content`   | Every content-collection `reference()` resolves             | `pnpm check`    |
| `check:meta`      | Every built page's head: unique title/description, og:image | CI, after build |
| `assets:optimize` | Downscale and re-encode camera masters in `src/assets/`     | by hand         |
| `assets:fonts`    | Subset Inter to the weights and scripts the site uses       | by hand         |
| `assets:og`       | Render the OG cards in `src/assets/og/`                     | by hand         |
| `assets:og-fonts` | Register the OG card fonts with fontconfig (one-time)       | by hand         |

Only erasable TypeScript syntax (no enums, namespaces, or parameter properties);
`tools/tsconfig.json` enforces it.

## Agent hook

`.claude/hooks/format-lint.sh` runs on every `Edit`/`Write` from Claude Code: Prettier on the
file, then ESLint if it is a file ESLint reads, exiting 2 with the findings so they go back to
the agent. It exits 0 when `node_modules` is missing.

## Environment variables

| Variable                    | Where                 | Purpose                               |
| --------------------------- | --------------------- | ------------------------------------- |
| `PUBLIC_TURNSTILE_SITE_KEY` | build (public)        | Turnstile widget on the contact form  |
| `PUBLIC_CF_BEACON_TOKEN`    | build (public)        | Cloudflare Web Analytics beacon       |
| `TS_SECRET_KEY`             | Pages Function secret | Turnstile server-side verification    |
| `SLACK_FORM_POST_GENERIC`   | Pages Function secret | Slack webhook for contact submissions |

The public ones are declared in `astro.config.ts`'s `env.schema` and imported from
`astro:env/client`. `PUBLIC_TURNSTILE_SITE_KEY` defaults to Cloudflare's always-passes test key
and `PUBLIC_CF_BEACON_TOKEN` to empty (no beacon), so a fresh clone and every preview deploy work
with no setup; production sets both in the Pages dashboard. `functions/api/form/submit.ts` carries
the matching test secret so the form round-trips locally.

## CI

Cloudflare Pages builds and deploys from git. `.github/workflows/ci.yml` runs on pull requests
and pushes to `main` and `staging`, in three jobs:

- **Check**: typecheck, lint, format, knip, and the repo checks as separate steps, all of which
  run even when an earlier one fails. ESLint findings become inline annotations on the PR.
- **Build**: `pnpm build`, `check:meta`, and an offline link check over `dist/` (lychee).
- **Lighthouse**: `@lhci/cli` via `pnpm dlx` against `astro preview` serving the build artifact
  (`docs/adr/0007`), three runs per URL over six page shapes. Median scores per URL and every
  failed assertion go to the job summary; full reports upload as an artifact.

### Performance budgets

`lighthouserc.json`, every assertion an error on the median of three runs:

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

Mobile emulation with simulated throttling, so transfer size dominates. `astro preview` gzips,
which keeps the measurement comparable to Cloudflare. Locally:

```sh
pnpm build
pnpm dlx @lhci/cli@0.15.1 autorun
pnpm exec astro preview stop   # the preview server outlives lhci
```
