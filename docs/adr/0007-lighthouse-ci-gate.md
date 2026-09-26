# 0007 — Lighthouse CI is a blocking PR gate, run through `pnpm dlx`

- **Status:** accepted
- **Date:** 2026-09-01

## Context

Objective 8 is a 10/10 mobile experience "enforced by Lighthouse CI budgets", and the plan's
budgets have been aspirational since Phase 01. Phase 09 is where they get teeth.

Two things had to be decided: how `lhci` reaches CI, and what it serves.

**How it reaches CI.** `@lhci/cli` brings Lighthouse and Puppeteer with it — a browser download
and a large tree, on every `pnpm install`, for a tool nobody runs while writing a page. The repo
also forbids new dependencies without an ADR, which is this one.

**What it serves.** Lighthouse's mobile preset throttles to 1.6 Mbps with a 150 ms RTT, so
transfer size is most of the score. Cloudflare Pages compresses; a local server that does not
would measure a site nobody is served and would fail budgets that production meets. `astro
preview` gzips (verified: `Content-Encoding: gzip` on both the document and the stylesheet), which
makes it the honest local stand-in — and it is already a `package.json` script, so the gate runs
what a developer can run.

## Decision

- `.github/workflows/lighthouse.yml`, a second required PR check beside `ci.yml`, running
  `pnpm dlx @lhci/cli@0.15.1 autorun` after `pnpm build`. Exact version pin, no lockfile entry,
  no cost to `pnpm install`.
- `lighthouserc.json` at the repo root: `astro preview` on :4321, three runs per URL, and the six
  URLs `plan/09-assets-performance.md` §5 names — one of each page shape (home, program, gallery,
  sponsors, event, form).
- Assertions are the plan's, verbatim, all `error`. The budget table lives in `docs/tooling.md`.
- Reports upload as an artifact on every run, pass or fail, so a red gate can be read without
  reproducing it.

## Alternatives considered

- **`treosh/lighthouse-ci-action`.** Wraps the same CLI and would work. It is another third-party
  action to trust and pin, and it hides which `lhci` command ran; a one-line `run:` step does not.
- **`@lhci/cli` as a devDependency.** Puts Lighthouse and Puppeteer in every clone. `pnpm dlx`
  with an exact version gets the same reproducibility for CI, which is the only place it runs.
- **LHCI's own `staticDistDir` server.** Removes the `astro preview` process, but crawls every
  HTML file in `dist/` — sixteen pages times three runs — and the six representative URLs are
  what the plan budgets.

## Consequences

- `lhci` is fetched from the registry on each CI run; a registry outage fails the gate. It is a
  separate workflow from `ci.yml`, so that failure does not mask a real check failure.
- Running `autorun` locally leaves the preview server up, because LHCI kills the process it
  spawned and `astro preview` outlives its wrapper. `pnpm exec astro preview stop` clears it.
- The thresholds are close to the measured values on some pages (LCP especially). Loosening one
  is a decision to record here, not a quiet edit to `lighthouserc.json`.
