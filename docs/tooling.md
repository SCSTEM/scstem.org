# Tooling

## Setup

```sh
mise install      # the pinned node, pnpm, and hk from mise.toml / mise.lock, and the pre-commit hook
pnpm install
pnpm check        # every hk.pkl step: typecheck, lint, format, knip
pnpm dev
```

`mise.toml` pins node, pnpm, and hk exactly and commits checksums to `mise.lock`, so every clone, CI
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
| Hygiene     | hk's built-in trailing-whitespace, final-newline, and merge-conflict-marker steps        |
| Repo checks | `tools/checks/*.ts`                                                                      |
| Runner      | hk: every check above is a step in `hk.pkl`                                              |

TypeScript is the 6.x line everywhere, one compiler for `astro check`, `tsc`, and
`typescript-eslint`. `astro check` (Volar) needs the JavaScript compiler's API, which TypeScript 7
does not expose yet; when it does and `@astrojs/check` widens its peer range, bump the pin.

### `tools/`

TypeScript scripts run directly by Node (type stripping, no build step), each behind a
`package.json` script:

| Script              | Does                                                           | Runs in         |
| ------------------- | -------------------------------------------------------------- | --------------- |
| `check:meta`        | Every built page's head: unique title/description, og:image    | CI, after build |
| `check:calendar`    | Recurrence, daylight saving, exceptions, and feed merging      | hk / CI         |
| `check:events`      | Isolated future-event build, metadata, and Lighthouse fixtures | CI, after build |
| `assets:og`         | Render the OG cards in `src/assets/og/`                        | by hand         |
| `assets:underlines` | Write the link underline strokes into `src/styles/tokens.css`  | by hand         |

Two more under `tools/ci/` have no script because Lighthouse CI runs them: `serve.ts` serves
`dist/` over HTTP/2 and TLS for the audit, and `lighthouse-summary.ts` writes the job summary.

Only erasable TypeScript syntax (no enums, namespaces, or parameter properties);
`tools/tsconfig.json` enforces it.

### Hand-made assets

Committed binaries that no script regenerates.

**Fonts** in `src/styles/fonts/` are the files the Google Fonts CSS API serves for DESIGN.md §3's
weights. Request the CSS with a full browser user agent, or it answers with TTF:

```sh
curl -A "Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Orbitron:wght@600..700&family=Source+Code+Pro:wght@400..600&family=Architects+Daughter&display=swap"
```

Download the `latin` file of each face (and Inter's `latin-ext`) over the existing one, and copy
its `font-weight` and `unicode-range` into `src/styles/fonts.css`.

**The FRC hero video** in `public/video/biohazard/` is a 10.5 s loop cut from the 1080p master
(git history has it) at the one steady stretch, whose first and last frames match. 720p because
the footage is soft and 1080p looks identical at more than twice the size:

```sh
ffmpeg -ss 8.0 -t 10.5 -i master.mp4 -an -vf "scale=1280:720:flags=lanczos" \
  -c:v libx264 -profile:v high -preset slower -crf 21 -pix_fmt yuv420p \
  -g 60 -movflags +faststart home-video.mp4

ffmpeg -ss 8.0 -t 10.5 -i master.mp4 -an -vf "scale=1280:720:flags=lanczos" \
  -c:v libvpx-vp9 -crf 30 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 \
  -g 60 -pix_fmt yuv420p home-video.webm
```

The poster, `src/assets/frc/hero-video-poster.webp`, is the encoded MP4's first frame.

## hk

`hk.pkl` defines every check once, and each entry point runs a slice of it:

| Entry point                     | Runs                                                               |
| ------------------------------- | ------------------------------------------------------------------ |
| git pre-commit hook             | `hk run pre-commit`: fixes and restages the staged files           |
| `pnpm check`, CI's Check job    | `hk check --all --slow`: every step over every file                |
| `pnpm fix`                      | `hk fix --all`: every step but the slow ones, fixing what they can |
| Claude Code, after `Edit/Write` | `hk fix` on the edited file                                        |
| Claude Code, at the end of turn | `hk fix --slow` over the modified and untracked files              |

`astro check`, `tsc`, and knip read the whole program, so they carry the `slow` profile and run
only where `--slow` is passed; each runs once when a selected file matches its glob. ESLint
waits for `astro check`, whose type generation into `.astro/` its typed rules read.

mise's `postinstall` hook runs `hk install --mise`, so every `mise install` outside CI installs
the pre-commit hook; it runs hk through `mise x`, so Git needs mise on its `PATH`.
`HK=0 git commit` skips it.

Both Claude Code hooks are inline in `.claude/settings.json` and exit 2 with hk's output when a
step fails, which hands the findings back to the agent. The edit hook ignores files outside the
repo. The end-of-turn hook does not run again on the stop it forced (`stop_hook_active`), so a
problem the agent cannot fix reaches the user instead of looping.

## Browser automation

Agents drive a real browser through [agent-browser](https://agent-browser.dev/), a CLI pinned in
`mise.toml`. The vendored skill stub at `.claude/skills/agent-browser/SKILL.md` points agents at
`agent-browser skills get core`, which prints the usage guide for the installed version;
`.claude/settings.json` allows the command.

```sh
mise install              # the pinned agent-browser
mise run install:browser  # Chrome for Testing into ~/.agent-browser/browsers
agent-browser doctor      # confirms Chrome launches
```

On Linux, WSL included, `install:browser` runs `agent-browser install --with-deps`, which
apt-installs the libraries Chrome for Testing links against (`libasound2` is the one a bare WSL
Ubuntu lacks) and asks for `sudo`. macOS needs nothing beyond the download.

Verify against the production build: `pnpm build && pnpm preview`, then
`agent-browser open http://localhost:4321`. When `pnpm dev` already holds 4321, `astro preview`
moves to 4322; dev serves `/@vite/client` and the preview does not.

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
with no setup; production sets both in the Pages dashboard.

The Function secrets have no defaults: `functions/api/form/submit.ts` answers an error when either
is unset, so a deploy missing one never tells a visitor their message arrived. To run the Function
locally (`wrangler pages dev`), put them in a git-ignored `.dev.vars` at the repo root, with
Turnstile's always-passes test secret matching the test site key:

```sh
TS_SECRET_KEY=1x0000000000000000000000000000000AA
SLACK_FORM_POST_GENERIC=https://hooks.slack.com/triggers/…
```

## CI

Cloudflare Pages builds and deploys from git. `.github/workflows/ci.yml` runs on pull requests
and pushes to `main` and `staging`, in two parallel jobs; draft pull requests run nothing until
they are marked ready:

- **Check**: `pnpm check`, every `hk.pkl` step over every file, each running even when another
  fails. ESLint (through `eslint-formatter-gha`), knip (its `github-actions` reporter under
  `GITHUB_ACTIONS`), and `tsc` and `astro check` (`.github/typescript-matchers.json`) report
  findings as inline annotations on the PR; Prettier and the hygiene steps list the files in the
  log.
- **Build**: `pnpm build`, then `check:meta`, an offline link check over `dist/` (lychee, which
  writes its own job summary), and Lighthouse. Lighthouse runs `@lhci/cli` via `pnpm dlx`
  against `tools/ci/serve.ts`, which serves the build over HTTP/2 and TLS the way Cloudflare
  does, three runs per URL including FLL, donation, joining, and both event layouts.
  `check:events` builds a temporary copy with future dates, validates its metadata and discovery,
  and stores it in `.lighthouseci/events/`. The audit server exposes those pages under
  `/__event-fixture/`; production `dist/` and source dates stay unchanged. The
  job summary and the log carry the median scores per URL, every failed assertion, and for each
  URL the LCP element, its phases, and the request waterfall; full reports upload as an artifact.
  A `dist/` byte-identical to one that already passed skips Lighthouse.

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

Mobile emulation with simulated throttling, so transfer size and request count dominate, and the
simulation follows the protocol it observes: HTTP/2 with gzip, as served. Locally (`openssl` on
the path for the self-signed certificate):

The Google Forms embed on `/get-involved/` starts loading when it enters the viewport; the
initial-load audit excludes that later third-party transfer. Check the embedded form and its
direct-link fallback during the staging soak.

```sh
pnpm build
pnpm check:events
pnpm dlx @lhci/cli@0.15.1 autorun --config=tools/ci/lighthouserc.json
node tools/ci/lighthouse-summary.ts
```
