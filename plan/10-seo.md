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

- [ ] Sitemap live on preview, excludes styleguide/hidden events; robots.txt points at it.
- [ ] `verify-meta` script green across the full build and wired into CI.
- [ ] Every distinct JSON-LD shape validates; OG images resolve absolute and render in a card debugger (e.g. opengraph.xyz) on preview.
- [ ] `/llms.txt` serves accurate, collection-backed content.
- [ ] All legacy redirects verified working on preview; `_headers` reduced to preview/staging noindex only (D25) and verified.
- [ ] GA4 + CF Analytics fire on production hostname only (verified via GA DebugView on a hostname-spoofed check or temporary debug flag), events in taxonomy fire; `docs/analytics.md` written with audit results.
- [ ] `pnpm check && pnpm build` green; Lighthouse SEO = 1.0 holds.
