# Phase 10 — SEO completion, AI SEO, analytics

**Prerequisites:** Phases 05–09 (all pages + budgets in place).
**Stack layer:** `overhaul/10-seo`, stacked on `overhaul/09-assets-performance` (D23).

## Objective

Finish everything discoverability: sitemap/robots, per-page OG images, structured-data completion, llms.txt for AI agents, redirects parity, and the analytics stack (D21) with an audited event taxonomy.

## Tasks

### 1. Sitemap & robots

- `@astrojs/sitemap` (installed Phase 01; the `/styleguide` filter already exists in `astro.config.ts`): extend the filter to hidden events (use `getVisibleEvents()` from Phase 08). Verify `<lastmod>` behavior; set `changefreq` only if honest.
- Replace `public/robots.txt` (still the legacy file): `User-agent: *` allow-all, plus `Sitemap: https://scstem.org/sitemap-index.xml`. **Changes from legacy:** drop `Disallow: /image` and `/video` (blocks Google Images/video indexing of team content — we want that traffic). Do not block AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) — being in AI answers is an objective. Record this in `docs/adr/` as a deliberate posture alongside D25.
- `/styleguide` noindex already ships (Phase 05, Seo prop) — verify it held; nothing to add.

### 2. Metadata verification (CI teeth)

- Small build-check script (`tools/checks/verify-meta.mjs`, run in `check` or CI after build): parse every `dist/**/*.html` and assert — exactly one `<title>` (unique across pages), meta description present (unique, 50–160 chars), exactly one canonical, one `<h1>`, OG image resolves to a real file. Fail loudly with the offending page list.

### 3. OG images

- Produce a curated set of 1200×630 OG images from brand photography + logo treatment (per DESIGN.md; created during this phase, stored `src/assets/og/` → emitted to `public/og/` or referenced via astro:assets `getImage`): one default, one per major section (programs/FRC, FLL, sponsors, events/openhouse, donate).
- Wire per-page via the Seo `ogImage` prop. **Every custom `ogImage` requires `ogImageAlt`** — `Seo.astro` throws at build without it, so write each image's alt when you create it. Verify absolute URLs in output. (A generated-per-page satori pipeline is deliberately out of scope — note as future work in `12-content-strategy.md`.)

### 4. Structured data completion

- Audit: NGO org (site-wide, from Phase 05), WebSite (home), BreadcrumbList (all nested pages), Event + FAQPage (events, Phase 08). Add `FAQPage` anywhere else FAQs render.
- Validate every distinct JSON-LD template with Google's Rich Results test + schema.org validator; record results in the PR.

### 5. AI SEO (llms.txt + agent-readability)

- `src/pages/llms.txt.ts` endpoint emitting the llms.txt convention: H1 site name, blockquote summary of SC2, then sectioned link lists (Programs, Get Involved, Sponsors, Events, Contact) with one-line descriptions — sourced from a small manifest + collections so it never goes stale. Include the sitemap URL and contact email.
- Optional `llms-full.txt` only if cheap: concatenated page descriptions; skip if it adds maintenance burden.
- Agent-readability audit across pages: meaningful heading hierarchy (one h1, ordered h2/h3), all key facts (dates, addresses, program names, sponsor tiers) present as text in static HTML (never image/JS-only — the calendar fallback link from Phase 07 covers the one dynamic surface), descriptive link text (no bare "click here"), `<time datetime>` on all dates.

### 6. Redirects/headers parity

- Carry over `public/_redirects` verbatim (`/join`, `/biohazard/*`, `/calendar`, `/wiki` rules).
- Rewrite `public/_headers` per **D25**: keep ONLY the preview/staging noindex rules (`https://scstem-org.pages.dev/*`, `https://*scstem-org.pages.dev/*`, `https://staging.scstem.org/*`). The legacy `/team/*`, `/image/*`, `/video/*` noindex rules are **dropped** — no private/internal content lives on the main domain, and media indexing is wanted. Verify nothing on the new site serves content that should be private (grep routes/assets for anything internal — meeting docs, rosters, etc.); anything found goes to the owner, not onto the domain.
- Confirm behavior on the preview deploy (spot-check each redirect + a preview-host noindex header).
- Verify apex/www canonical behavior at the Cloudflare level; note the finding (dashboard config, not repo).

### 7. Analytics (D21)

- **GA4**: direct `gtag.js` snippet (measurement ID from `site.ts`), loaded with `defer`/`partytown-free`, after-load init; replaces the legacy GTM-component oddity (a GA4 ID was being passed to the GTM loader — works, but non-standard; fix = plain gtag).
- **Cloudflare Web Analytics**: beacon snippet. Add `cloudflareBeaconToken` to `site.analytics` with its real value — the midpoint review removed the `undefined` placeholder, so this is a new key, not a fill-in.
- Both load only in production (`import.meta.env.PROD`) **and** only on the production hostname (guard against preview/staging polluting data — check `location.hostname === "scstem.org"`).
- **Consent Mode v2 defaults** set before gtag config (`analytics_storage: granted`-by-default is acceptable for a US nonprofit today; set the default explicitly so adding a banner later is config, not surgery).
- **Event taxonomy** (delegated single listener script, `data-track` attributes): `donate_click`, `wishlist_click`, `sponsor_packet_download`, `get_involved_click`, `contact_submit` (fired on successful form response), `outbound_sponsor_click`. Document in `docs/analytics.md`.
- **Audit/upgrade checklist** (execute + document outcomes in `docs/analytics.md`): GA4 property settings reviewed (data retention, internal-traffic filter for staging IPs if any, unwanted-referral exclusions), Search Console verified + linked to GA4, Bing Webmaster Tools verified, GA4 key events configured for the taxonomy above.

## Acceptance criteria

- [x] Sitemap live on preview, excludes styleguide/hidden events; robots.txt points at it. Verified by flipping `openhouse.md` to `hidden: true` and watching the URL leave `sitemap-0.xml`.
- [x] `verify-meta` script green across the full build and wired into CI. It failed on four pages when first run; those descriptions are fixed below.
- [~] Every distinct JSON-LD shape validates; OG images resolve absolute and render in a card debugger. **Partly blocked** — see "Intentional gaps".
- [x] `/llms.txt` serves accurate, collection-backed content, and CI link-checks it.
- [~] All legacy redirects verified working on preview; `_headers` reduced to preview/staging noindex only (D25) and verified. `_headers`/`_redirects` are done in the repo; the preview spot-check is an owner task.
- [~] GA4 + CF Analytics fire on production hostname only, events in taxonomy fire; `docs/analytics.md` written with audit results. GA4 and the taxonomy are verified in a real browser (below); the Cloudflare beacon has no token yet and the property-side audit needs account access.
- [x] `pnpm check && pnpm build` green; Lighthouse SEO = 1.0 holds (100 on all six budgeted URLs).

Everything marked `~` is finished as far as this repository can take it, with the remainder in
`plan/todo.md`.

## Intentional gaps

Each of these is a task for the project owner, not unfinished work; `plan/todo.md` is the list.

- **Cloudflare Web Analytics has no token.** §7 asks for `cloudflareBeaconToken` in `site.analytics`
  "with its real value" — there is no value to commit. It is a `PUBLIC_CF_BEACON_TOKEN` env field
  instead, defaulting to empty, with the beacon skipped on an empty token: the same shape as
  `PUBLIC_TURNSTILE_SITE_KEY`, so the owner sets it in the Pages dashboard rather than in a commit.
  D21 is not fully satisfied until they do.
- **Google's validators are unreachable from this environment.** The Rich Results Test and
  `validator.schema.org` are both Google-hosted, and this development environment's network policy
  returns 403 for `*.google.com` (confirmed against the agent proxy's own status endpoint). The
  five shapes were inventoried and asserted locally instead — every block parses, carries
  `@context: https://schema.org`, and has an `@type`, now checked in CI by `verify-meta`.
- **The card debuggers and the preview deploy** need a deployed URL. `verify-meta` proves every
  `og:image` is absolute and resolves to a built file; how a given network crops it is a look.
- **GA4 property settings, Search Console, Bing Webmaster Tools, key events** all need account
  access. `docs/analytics.md` lists what to change and why.
- **Apex/www canonical behaviour** is Cloudflare dashboard configuration, as §6 says.

**Two gaps closed during review**, both by the project owner's decision:

- **The JS budget excludes analytics.** `plan/00-overview.md` budgeted "< 35 KB gzipped per page
  *including* analytics", which `gtag.js` cannot fit alone. The overview now reads "first-party",
  and `docs/analytics.md` states what the Lighthouse gate does and does not measure.
- **Events retire on date**, rather than waiting for someone to set `hidden: true`. See below.

## As built

### The sitemap filter is "noindex pages are not in the sitemap"

§1 asks for the filter to be extended with `getVisibleEvents()`. It cannot be: `astro:content` is
a virtual module of the build's own module graph and `astro.config.ts` is loaded before it exists.

The filter reads the emitted page instead. A retired event's route is a redirect page, which Astro
writes with `<meta name="robots" content="noindex">`; `/styleguide` sets the same tag through its
`Seo` prop. One predicate covers both — and anything that grows a `noindex` later — with no second
list of what is hidden, and the sitemap integration filters in `astro:build:done`, after every page
is on disk. The `/styleguide` special case is gone.

### Four meta descriptions were too long

`verify-meta`'s first run failed on `/donate/` (173), `/programs/frc/` (162), `/sponsors/` (195)
and `/openhouse/` (288). Three were trimmed. `/sponsors/` was the interesting one: its description
was also its hero copy, which is legacy's verbatim (D8) — so the two are now separate strings, one
written for the page and one for a search result.

### `/llms.txt` needs a route manifest

An `events` entry cannot know its own URL: `/openhouse` and `/programs/frc/kickoff` are
hand-written routes, not a `[slug]`. `src/data/events.ts` pairs entry id to path, and the endpoint
throws at build on an entry with no route. The other direction — a path that stops matching its
route — is covered by adding `dist/llms.txt` to the CI link check.

No `llms-full.txt`: §5 makes it optional, and it would be a second copy of every page's prose to
keep in sync.

### Analytics reads destinations, not `data-track` everywhere

§7 specifies "`data-track` attributes". Twenty call sites link to `/get-involved` alone, and
tagging each one would be a second list to keep in step with `src/data/site.ts` — the exact
pattern the midpoint review's first standing rule exists to prevent. The delegated listener maps
**destination to event name** from a table built out of `site.ts`, and `data-track` is still read
first, for the two clicks a URL cannot identify (a sponsor's own site, from `SponsorCard` and
`SponsorStrip`). `contact_submit` has neither a click nor a destination, so `ContactForm`
dispatches a custom event whose name both ends import from `src/lib/analytics.ts`.

Verified in Chromium against a production build with the emitted hostname rewritten to
`localhost`: consent defaults, `js`, and `config` land in that order; `gtag.js` is injected async;
the CTA and a `/donate` link push their events and an `/about` link pushes nothing; the dispatched
event arrives. Without the rewrite, on `localhost`, there is no `dataLayer` and no tag request on
any page. Full transcript in `docs/analytics.md`.

### The social cards are committed artifacts

Seven cards from one template, `docs/adr/0010-og-cards.md`. `sharp` resolves an SVG `font-family`
through fontconfig, which reads neither the variable woff2 the site ships nor a weight axis, so a
build-time pipeline would need a font cache on every build machine to render files that change
about never. `pnpm assets:og-fonts` then `pnpm assets:og`, by hand, output committed. 34–52 KB
each, against the 456 KB PNG they replace.

### Events retire themselves (owner-requested, after review)

Asked for during PR review: an event dated in the past should drop out of generated content on the
next build rather than sit there as live copy. `inService()` in `src/lib/events.ts` now also
excludes an entry whose `end` has passed, which flows through every consumer already built — the
route redirects to its parent, the sitemap filter drops it because the redirect page is `noindex`,
and `/llms.txt` drops it because it reads `getVisibleEvents()`.

The rule is `hasPassed(end)`, moved into `src/lib/event-date.ts` and **shared with `Countdown`**,
which already had exactly this definition. Two copies would have let a page say "this event has
passed" while still being in the sitemap. An entry with no `end` never retires on its own, which is
the rule `Countdown` established in Phase 08 and the reason `docs/content.md` tells editors to
always set one. `hidden: true` remains the way to retire one early.

Both current entries are dated in the past, so this ships with **no live event page** — verified:
`/openhouse/` and `/programs/frc/kickoff/` are redirect stubs, both are absent from
`sitemap-0.xml`, `/llms.txt` omits the Events section rather than printing a bare heading, and
nothing in the built HTML links to either. Two knock-ons: `lighthouserc.json` budgeted `/openhouse/`
as its event-landing page shape and now budgets `/about/` instead (a seasonal URL cannot be a
stable budget target — noted in `plan/todo.md`), and the countdown's "passed" state is now only
reachable in the window between an event ending and the next deploy.

### Agent-readability audit

Driven across all fourteen routes in Chromium: exactly one `h1` each, no skipped heading level on
any page, no bare "click here"/"read more" link text, no page errors. `<time datetime>` was
missing from the one surface that builds its dates in the browser — the calendar agenda — and now
carries it on both the day heading and each entry's time range, with an all-day entry stamped as a
date rather than a midnight timestamp.

Nothing on the domain is private, which is D25's precondition for dropping the legacy `/team/*`,
`/image/*` and `/video/*` noindex rules: `src/content/` and `src/pages/` hold marketing copy,
sponsor records, robot history, a published FAQ, and a public event's published schedule.
`docs/adr/0009-open-crawling-posture.md` records the posture, AI crawlers included.
