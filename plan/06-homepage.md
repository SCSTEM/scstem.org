# Phase 06 — Homepage + visual review gate

**Prerequisites:** Phase 05.
**Branch:** `overhaul/06-homepage` off `astro-rewrite`.
**Gate:** ⛔ **Owner visual sign-off required before Phase 07 starts.** This is the checkpoint where "good → great" is settled while only one page is at stake.

## Objective

The homepage rebuilt to DESIGN.md quality with existing marketing copy (D8), plus the composed `ui/` components the rest of the site will reuse. Then a structured visual review loop with the owner.

## Reference

`legacy/src/app/page.tsx` (323 LOC): hero with background video + CTA, `programCards` array, `joinCards` array, sponsors strip, video CTA section. Copy is ported verbatim; layout/polish follows DESIGN.md, not the legacy page.

## Tasks

### 1. Composed components (in `src/components/ui/`)

Built from primitives; these are the reusable section vocabulary for all later pages:
- `Hero.astro` — full-bleed hero with media slot (video or image), heading, subhead, CTA group. Video handling per D20: `<video muted loop playsinline preload="none" poster>` with the existing MP4/WebM sources *for now* (re-encode lands in Phase 09 — structure the component so only the source files change), poster shown until user interaction/in-view, `prefers-reduced-motion` → poster only.
- `Section.astro` — consistent vertical rhythm wrapper (replaces `legacy/src/components/page/Section.tsx`), optional heading/eyebrow/intro slots.
- `FeatureCard.astro` / `FeatureGrid.astro` — replaces `legacy/src/components/cards/FeatureCard.tsx`; used for program cards and join cards.
- `SponsorStrip.astro` — pulls **active** sponsors from the `sponsors` collection, ordered by level; logos via astro:assets with fixed dimensions (no CLS); links out with `rel="sponsored noopener"`.
- `CtaBanner.astro` — the "get involved / donate" band.
- Page-local data (program cards, join cards) lives as a typed const in the page frontmatter — fine for layout-coupled copy (D18 note: collections are for *repeating, editor-owned* content).

### 2. Assemble `src/pages/index.astro`

- BaseLayout with title = site name, homepage description (port legacy meta description), `webSite()` JSON-LD added.
- Sections per legacy content order unless DESIGN.md argues otherwise: hero → programs → sponsors → join/CTA. The `/openhouse` fork is *not* consulted (Phase 08 handles events).
- LCP element (hero poster/heading) must not depend on JS; hero image/poster gets `fetchpriority="high"` + eager loading; everything below the fold lazy.

### 3. Visual review loop (the gate)

1. Merge-ready PR → CF Pages preview URL on `astro-rewrite` after merge, or the PR's own preview.
2. Produce a review pack for the owner: full-page screenshots at 360px, 768px, 1440px (light on nothing — dark only), plus side-by-side with production scstem.org (use the pre-installed Chromium/Playwright).
3. Owner critiques → iterate on the homepage **and fold every generalizable decision back into DESIGN.md** (that's the deliverable that keeps Phase 07 fast). Repeat until explicit sign-off.
4. Record sign-off: check the box below, note date + iteration count in the PR.

### 4. Housekeeping

- Local Lighthouse run (mobile) recorded in PR description — targets: Perf ≥ 90 at this stage (video not yet re-encoded), A11y = 100, SEO = 100. Note the video weight as the known gap closed by Phase 09.

## Acceptance criteria

- [ ] Homepage copy parity with legacy (diff the visible text; intentional omissions listed in PR).
- [ ] All sections built from `ui/` + `ui/primitives/` — zero one-off styling that bypasses tokens.
- [ ] Sponsors render from the collection; deactivating a sponsor file removes it without code changes.
- [ ] Zero client JS except the video poster/in-view script and nav toggle; reduced-motion shows poster.
- [ ] Lighthouse A11y = 100, SEO = 100 (mobile) on the preview.
- [ ] ⛔ **Owner visual sign-off recorded; DESIGN.md updated with review outcomes.**
- [ ] `pnpm check && pnpm build` green.
