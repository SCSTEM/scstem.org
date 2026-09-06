# Phase 11 — Cutover: parity verification, staging QA, launch, cleanup

**Prerequisites:** all Phase 01–10 stack layers pushed, reviewed, and green (CI + Lighthouse) — the full stack intact from `claude/website-overhaul-plan-38czl6` to the top layer, nothing merged yet (D23).
**Stack layer:** `overhaul/11-cutover` (top of the stack), stacked on `overhaul/10b-carson-fixes`, the review-fixes layer above `overhaul/10-seo`.
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

- [~] URL + redirect parity table complete, all green. **The URL half is done below**, every legacy
  route answering on the production preview; the redirect rules are verified as far as a build
  can take them (every on-site target is a built page) and the live spot-check is the owner's,
  because Pages evaluates `_redirects`, not the build.
- [ ] Staging QA checklist complete; owner sign-off recorded.
- [ ] Production live on Astro; sitemap submitted; structured data + OG validated on prod URLs.
- [x] `legacy/` deleted; dependency tree clean; README rewritten.
- [ ] Post-launch watch notes captured after two weeks (Search Console + GA4 baselines recorded in `docs/analytics.md`).

Everything unchecked needs a deployment or a dashboard; `plan/todo.md` § Cutover is the list.

## As built

### URL parity

`pnpm build`, then `astro preview` serving `dist/` and one request per legacy route. Every URL the
Next.js site served (its `page.tsx` files under `app/`, the calendar's two static params spelled
out) answers, and an unknown path gets the branded `404.html`.

| Legacy route            | Preview | Note                                                     |
| ----------------------- | ------: | -------------------------------------------------------- |
| `/`                     |     200 |                                                          |
| `/about`                |     200 |                                                          |
| `/contact`              |     200 |                                                          |
| `/donate`               |     200 |                                                          |
| `/get-involved`         |     200 |                                                          |
| `/openhouse`            |     200 | Redirect stub to `/` today: the entry's `end` has passed |
| `/sponsors`             |     200 |                                                          |
| `/programs/fll`         |     200 |                                                          |
| `/programs/frc`         |     200 |                                                          |
| `/programs/frc/robots`  |     200 |                                                          |
| `/programs/frc/kickoff` |     200 | Redirect stub to `/programs/frc` today, same reason      |
| `/calendar/frc`         |     200 |                                                          |
| `/calendar/sc2`         |     200 |                                                          |
| `/anything-else`        |     404 | `404.html`, noindexed                                    |
| `/programs`             |     200 | New in Phase 07; no legacy counterpart                   |
| `/styleguide`           |     200 | Noindexed, out of the sitemap                            |

`_redirects` and `_headers` both reach `dist/`, which is where Pages reads them. Every on-site
redirect target is a built page:

| Rule                                      | Target is a built page                            |
| ----------------------------------------- | ------------------------------------------------- |
| `/join → /get-involved`                   | yes                                               |
| `/biohazard/get-involved → /get-involved` | yes                                               |
| `/biohazard/calendar → /calendar/frc`     | yes                                               |
| `/biohazard/* → /programs/frc/:splat`     | `/programs/frc/`, `/robots`, `/kickoff` all built |
| `/calendar → /calendar/sc2`               | yes                                               |
| `/wiki`, `/wiki/*`                        | external, `wiki.scstem.org`                       |

No redirect source collides with a built path: `dist/join`, `dist/biohazard`, `dist/wiki` do not
exist, and `/calendar` has no `index.html` of its own (only `/calendar/frc/` and `/calendar/sc2/`).

### Copy parity

Method: every visible string in the legacy TSX for a route (JSX text and prose-length literals),
checked against the rendered text of the new page, with the event pages compared against their
content entries because both are retired stubs today. Code fragments and class names were
discarded by hand; what follows is every real difference. Most were logged in the phase PR that
made them and are collected here so the owner reads one list; **the three marked "unlogged"
appear in no phase record and are the ones to look at.**

| Route                            | Differences from legacy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header and footer (every page)   | Programs panel rows describe each program by its full name; legacy's taglines "A Hands-On Approach to STEM Learning" and "Combining the excitement of sport with the rigors of science and technology" are gone (**unlogged**). The footer no longer carries sponsor logos or "Special thanks to our sponsors for powering our mission." (**unlogged**; the homepage sponsor strip is where sponsors appear). Footer Donate points at `/donate`, was `/wiki/donations`; a Programs column was added; the 501(c)(3) line is verbatim (Phase 05). `keywords` meta dropped (Phase 05).           |
| `/`                              | Hero heading reads "Robots are in Franklin County. So are we."; legacy read "Robots are cool. So are we." (**unlogged**, Phase 06). "Contact us!" is gone from the closing heading and does not appear in its paragraph either (Phase 06 recorded it as moved). FRC card "Ages 13 - 18" is now "Ages 14–18", the range legacy's own `/openhouse` and kickoff pages used. "highschool" → "high school"; "Our programs" and "Our sponsors" headings added; the team video is a framed link, not an embed; the "Find out more" scroll button is gone (all Phase 06). Everything else is present. |
| `/about`                         | Every legacy string present.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `/contact`, `/donate`            | Copy present, form names `Contact Us` and `Sponsor Question` preserved so the Slack post reads the same. Validation messages are the browser's own where legacy wrote "Please enter a valid email address"; the Turnstile failure text is kept and "Turnstile challenge expired." / "Error submitting form" have plainer successors (Phase 07).                                                                                                                                                                                                                                               |
| `/get-involved`                  | Present. The iframe's "Loading…" placeholder is gone with the lazy-load.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `/sponsors`                      | Ten sponsors, the three retired ones by name. The legacy file's commented-out "Test Sponsor" fixture was not migrated (Phase 04).                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `/programs/fll`                  | **The one page whose copy is new rather than ported.** Legacy was a placeholder: "This page is under construction. Contact us to learn more about our lego robotics program." Phase 07 wrote the page. D8 said verbatim copy, and there was none to port, so this page deserves a read.                                                                                                                                                                                                                                                                                                       |
| `/programs/frc`                  | Every legacy string present.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `/programs/frc/robots`           | Present; "2019 - Toxic Silver"-style headings are a year and a name in separate elements.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `/openhouse`                     | Against `events/openhouse.md` and the six `faq` entries: the hero sentence lost "Saturday, August 1 (1PM to 4PM)" (the countdown renders dates); the two program cards, the Google My Maps iframe, and its parking prose are gone, with a Directions link in their place (Phase 08).                                                                                                                                                                                                                                                                                                          |
| `/programs/frc/kickoff`          | Against `events/frc-kickoff.md`: title "2026 Kickoff \| Biohazard" → "2026 Season Kickoff"; "Kickoff - January 10." → "Kickoff."; the meeting-schedule modal is body copy; the two map-backed panels became the info card and closing banner; the live state's "🔴 Kickoff is live! / Watch live now" is the countdown's "Happening now" beside the "Watch on FIRST website" button; the hand-written "January 10, 2026 at 12:00 PM EST" is formatted from `start` (Phase 08).                                                                                                                |
| `/calendar/frc`, `/calendar/sc2` | Agenda plus the no-JS link to Google Calendar; "Loading..." is a skeleton.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 404                              | Rewritten in Phase 05: "Looks like you might be lost, or this page is still under construction..." / "Take me back" → "We can't find that page" with four destinations derived from `nav.primary`.                                                                                                                                                                                                                                                                                                                                                                                            |

Both event pages are stubs because both entries ended before this build; that is Phase 10's retire-
on-date rule, not a parity gap, and dating next season's entries forward brings both back.

### Dependency audit

`pnpm-lock.yaml` has no `react`, `react-dom`, `@heroui/*`, `framer-motion`, `embla-carousel*`,
`@biomejs/*`, or `next`. The only match on those names is `css-to-react-native`, a transitive
dependency of `satori` (the OG-card renderer). knip is green with the `legacy/**` ignore removed.

### `legacy/` is deleted

With it: the `legacy` entries in `tsconfig.json`, `knip.jsonc`, `.prettierignore`,
`.vscode/settings.json`, the ESLint global ignore and the `no-restricted-imports` pattern that
banned importing from it, the `@source not` line in `global.css`, and the architecture row in
`AGENTS.md`. Git history keeps the old site; `plan/` stays in the repository as the record of how
this one was built.

### Seen in passing, not changed here

Astro preserves `<!-- -->` comments from component templates in the built HTML: eleven ship on the
homepage, from `Navbar`, `Hero`, and friends. They are developer notes, not content, and cost a
few hundred bytes per page; moving them into frontmatter or `{/* */}` is a follow-up.
