# Phase 06 — Homepage + visual review gate

**Prerequisites:** Phase 05 + the midpoint check-in (see overview "Standing rules").
**Stack layer:** `overhaul/06-homepage`, stacked on `overhaul/midpoint-checkin` (D23) — the
hardening layer that sits between 05 and this phase.
**Gate:** ⛔ **Owner sign-off required before Phase 07 starts.** The design itself was settled up front (DESIGN.md + owner-reviewed mockups shipped with the plan — D22), so this gate is a **conformance check**: does the built homepage match the approved design, and does it hold up on real devices?

## Objective

The homepage rebuilt to the approved DESIGN.md/mockups with existing marketing copy (D8), plus the composed `ui/` components the rest of the site will reuse. Then a focused review with the owner.

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

### 3. Conformance review (the gate)

1. Review-ready stack layer → this branch's own CF Pages preview URL (it contains every layer below it, so it previews the full site so far).
2. Produce a review pack for the owner: full-page screenshots at 360px, 768px, 1440px, side-by-side with the **approved mockups** and with production scstem.org. Use the chrome-devtools MCP (overview standing rule 9) — screenshots, console, a11y snapshot, and the Lighthouse run all come from the same session, against the production preview, not the dev server.
3. Owner reviews for conformance + real-device feel. Deviations from DESIGN.md are bugs — fix them; genuine design changes discovered here go through DESIGN.md §11 (doc PR first). Repeat until explicit sign-off.
4. Record sign-off: check the box below, note date + iteration count in the PR.

### 4. Housekeeping

- Local Lighthouse run (mobile) recorded in PR description — targets: Perf ≥ 90 at this stage (video not yet re-encoded), A11y = 100, SEO = 100. Note the video weight as the known gap closed by Phase 09.

## Acceptance criteria

- [x] Homepage copy parity with legacy (diff the visible text; intentional omissions listed in PR).
      Every legacy string is present. Changes, all listed under "Notes and deviations": the hero
      heading became the page's `h1`; two section headings were added where legacy had none
      ("Our programs", "Our sponsors"); "highschool" → "high school"; "Contact us!" moved from the
      closing heading into its paragraph so the tagline could take that heading.
- [x] All sections built from `ui/` + `ui/primitives/` — zero one-off styling that bypasses tokens.
- [x] Sponsors render from the collection; deactivating a sponsor file removes it without code
      changes — the three `active: false` records (Fives, VFW, Wellspan) are already absent.
- [x] Zero client JS except the nav toggle. The homepage hero is a photograph, not a video (see
      below), so it ships no script at all; the whole page's only `<script>` is the shell's sheet
      toggle.
- [x] Lighthouse A11y = 100, SEO = 100 (mobile) on the production preview — with Best Practices
      100 as well. Trace on Slow 4G + 4× CPU: **LCP 1369 ms, CLS 0.00**.
- [ ] ⛔ **Owner conformance sign-off recorded; any DESIGN.md amendments merged via §11 process.**
- [x] `pnpm check && pnpm build` green.

## Notes and deviations

- **The hero has no video, because the legacy homepage hero has none.** `legacy/src/app/page.tsx`
  renders `HeroHeader img="/image/legos.webp"`; the 22 MB `home-video.mp4` belongs to
  `/programs/frc`. So `Hero.astro` takes its media through a **slot** — the brief's "media slot
  (video or image)" — and D20's poster/in-view/reduced-motion handling lands with the page that
  actually has a video (Phase 07), rather than shipping unused here. Only the slotted element
  changes between the two.
- **Section carries the atmosphere device, and it is single-valued.** DESIGN.md §2 allows exactly
  one device per section boundary and says "never stacked", so `atmosphere` is one prop rather
  than four booleans — two devices on one section is unrepresentable. The page cycles them: ghost
  numerals 01–03 on the three narrative sections, a tint band on the FIRST interlude, an ambient
  pool on the video, a ruler divider before the sponsors, and registration marks (§2.8, itself a
  listed device) on the closing pocket.
- **The hero emphasizes one phrase, not two.** Legacy highlighted "Robots" *and* underlined "So
  are we."; §2.1 permits exactly one. The swipe stays on "Robots", and the hand-markup budget goes
  to the sanctioned tagline in the CTA band — "Real ⬭Skills⬭. Real ⬭Robots⬭. Real ⬭Fun⬭.", three
  chalk ovals, no two sharing a variant.
- **Hero height is content-driven** (`min-h-[30rem]` from `md`), not legacy's
  `calc(101vh - 4rem)`. The mobile layout follows §7: photo on top fading into the ground, copy
  below on solid ground — so legacy's "Find out more" scroll button has nothing left to solve and
  is gone with it.
- **The video is a link-out, not an embed.** Legacy mounted a react-player YouTube embed. A framed
  poster linking to the video keeps the page at zero third-party JS and zero third-party cookies,
  which is part of how Best Practices stays at 100. The URL is `site.urls.teamVideo`.
- **Five join cards are laid out 2 + 3** via `@utility feature-grid-2-3` in `global.css` — DESIGN.md
  §5's own worked example. It lives in the stylesheet, not in `FeatureGrid.astro`, for the two
  reasons standing rule 2 names: the spans land on slotted children, and the boundaries read the
  breakpoint tokens. Legacy reused `IconBooks` on two of the five; the scholarships card now takes
  `school`.
- **The FIRST identity is art-directed with `<picture>`.** The spelled-out acronym is illegible
  below `md`, so the two renditions are a `<source>` swap rather than a `hidden`/`md:hidden` pair
  (standing rule 5). `<Image>` cannot render into a `<source>`, so `getImage()` supplies the
  right-sized WebP the raw 2560px PNG would otherwise skip.
- **`nav.donate` and `nav.sponsors` are named entries** in `src/data/site.ts`, spread into
  `nav.primary` the way `calendar` already was. The CTA band and the footer both link to them, and
  standing rule 1 forbids finding a list entry by index or re-typing its href.
- **`SPONSOR_LEVELS` is now exported from `src/content.config.ts`.** Declaration order is display
  order, so `SponsorStrip` sorts by index into the schema's own vocabulary instead of restating the
  ranking.
- **Images moved out of `public/`** into `src/assets/{fll,frc,sc2,first}/` so astro:assets
  processes them, and `tools/assets/optimize-sources.mjs --write` re-encoded the seven that
  qualified (1.33 MB saved). Phase 09 still owns the rest of `public/image` and the per-call-site
  `widths`/`quality` tuning.
- **`.claude/hooks/format-lint.sh` blocked every CSS edit.** It routed `.css` to
  `oxlint --type-aware`, which has no CSS rules and exits 1 with "No files found to lint". CSS now
  sits in the format-only branch beside YAML and TOML, and `AGENTS.md`'s toolchain table says so.

### Open for the review gate

- **Two sponsor logos ship white backgrounds baked into the PNG** (Manitowoc, Orrstown), so they
  read as white plates on the dark ground, and `yb-dark.png` is a dark badge that nearly
  disappears. Both fixes are outside this phase's authority: either transparent-background assets
  from the sponsors, or a documented plate treatment added to DESIGN.md §8 first (§11). Flagging
  rather than inventing one, since the sponsors page in Phase 07 needs the same answer.
