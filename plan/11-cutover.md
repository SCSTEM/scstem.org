# Phase 11 — Cutover: parity verification, staging QA, launch, cleanup

**Prerequisites:** all Phase 01–10 stack layers pushed, reviewed, and green (CI + Lighthouse) — the full stack intact from `claude/website-overhaul-plan-38czl6` to the top layer, nothing merged yet (D23).
**Stack layer:** `overhaul/11-cutover` (top of the stack), stacked on `overhaul/10-seo`.
**Gate:** ⛔ Owner approves staging before merge to `main`. This phase touches production.

## Tasks

### 1. Pre-flight parity verification (on the top-of-stack preview — it contains every layer)

- **URL parity**: script or manual table — every legacy route returns 200 on the new build at the identical path (`/`, `/about`, `/contact`, `/donate`, `/get-involved`, `/openhouse`, `/sponsors`, `/programs/fll`, `/programs/frc`, `/programs/frc/robots`, `/programs/frc/kickoff`, `/calendar/frc`, `/calendar/sc2`, 404 behavior). Every `_redirects` rule verified.
- **Copy parity spot-check**: owner-visible text diff per page against production (intentional changes were logged in phase PRs — compile them into one summary for the owner).
- **Functionality**: contact form end-to-end (Slack message arrives), calendars live, video plays, event pages correct, styleguide noindexed.
- Full `pnpm check && pnpm build` + Lighthouse CI green on the final merge commit.

### 2. Cloudflare Pages configuration (dashboard — coordinate with owner; not in repo)

- Build command: `pnpm build` (or `pnpm install --frozen-lockfile && pnpm build` per Pages' pnpm handling — it respects `packageManager`); output directory: `dist` (was `build`); Node version env var matching the mise pin.
- Confirm preview deployments still noindexed (`_headers` covers `*.pages.dev` + `staging.scstem.org`; per D25 those are the only noindex rules left — `/team/*`, `/image/*`, `/video/*` are gone deliberately).
- Env vars: set `PUBLIC_TURNSTILE_SITE_KEY` (real key for production, test key acceptable for previews), confirm `SLACK_FORM_POST_GENERIC` secret still bound for Functions, CF Web Analytics token if env-injected.
- Apply settings to a **preview first**: trigger a deploy of the top stack branch with the new settings and verify before touching branch mappings.

### 3. Staging soak

- **Land the stack**: merge the top-of-stack PR — gh-stack cascades every unmerged PR below it, bottom-up, into `staging` in one action. Never merge layers individually or hand-sequence; the cascade _is_ the merge plan. Full QA on https://staging.scstem.org:
  - Device pass: physical phone (small Android/iPhone), tablet, desktop; keyboard-only pass; screen-reader smoke (VoiceOver/NVDA on nav + form).
  - Lighthouse against staging (real CF serving): budgets hold.
  - Forms with production-mode Turnstile.
  - Analytics: confirm staging does NOT report (hostname guard), using GA DebugView.
- Fix-forward: before the cascade, fixes land on the layer they belong to (restack above per D23); after the cascade, fixes are normal PRs to `staging`.
- ⛔ **Owner sign-off on staging.**

### 4. Launch

- Merge `staging` → `main`. Verify production deploy: spot-check pages, redirects, form, calendar, analytics now firing (GA Realtime + CF dashboard).
- Google Search Console: submit new sitemap; URL-inspect 3–4 key pages; confirm no coverage regressions over the following days. Bing: submit sitemap.
- Validate live structured data (Rich Results test on production URLs) and OG cards (share-debugger on the domain).

### 5. Cleanup (same day or immediately after)

- Delete `legacy/` entirely; delete `plan/` files' obsolete TODO markers (plan stays in-repo as history or moves to `docs/` — owner's call, ask in PR).
- Final `knip` + dependency audit: dependency tree contains no React, HeroUI, framer-motion, embla, Biome, or Next remnants.
- Rewrite `README.md`: what the site is, prerequisites (mise), `mise install && pnpm install && pnpm dev`, links to `AGENTS.md`, `DESIGN.md`, `docs/content.md`, `docs/tooling.md`, deploy model (CF Pages, staging→main).
- Confirm `.claude/` hooks + skill and CI all still green post-deletion.

### 6. Post-launch watch (first 2 weeks)

- Search Console: coverage, Core Web Vitals field data trending, 404 reports (add `_redirects` entries for any missed URLs).
- GA4: traffic continuity vs. pre-launch baseline; key events flowing.
- CF Analytics/Pages: error rates on Functions.
- File follow-ups as issues; content work proceeds via `12-content-strategy.md`.

## Acceptance criteria

- [ ] URL + redirect parity table complete, all green.
- [ ] Staging QA checklist complete; owner sign-off recorded.
- [ ] Production live on Astro; sitemap submitted; structured data + OG validated on prod URLs.
- [ ] `legacy/` deleted; dependency tree clean; README rewritten.
- [ ] Post-launch watch notes captured after two weeks (Search Console + GA4 baselines recorded in `docs/analytics.md`).
