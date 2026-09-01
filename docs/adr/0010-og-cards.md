# 0010 — Social cards are committed artifacts from one template

- **Status:** accepted
- **Date:** 2026-09-01

## Context

Every page shared a single 456 KB PNG of the logo over a team photo. DESIGN.md §7 specifies the
card: "photo + scrim + Orbitron title + lockup; one template, per-section variants." So the
question was only where the rendering happens.

A per-page pipeline (satori, or a Cloudflare Function) is explicitly out of scope for this
overhaul (`plan/10-seo.md` §3, noted as future work in `plan/12-content-strategy.md`). That
leaves rendering at build time or rendering once, by hand.

Build time is not free here. The cards need Orbitron, and `sharp` resolves an SVG's
`font-family` through **fontconfig**, which reads neither the variable woff2 the site ships nor a
weight axis. A build-time pipeline would therefore have to instance the font and populate a font
cache on every machine that builds the site — including Cloudflare Pages' builder — to produce
seven files that change when the photography or the section list changes, which is roughly never.

## Decision

`tools/assets/og-cards.ts` renders all seven cards from one template and is **run by hand**;
the output is committed. `pnpm assets:og-fonts` is the one-time font step, and
`pnpm assets:og` renders.

- One default at `public/og/default.jpg` — it is named by `site.ogImage`, which
  `astro.config.ts` loads through jiti and so cannot import an asset.
- Six section cards in `src/assets/og/`, imported by the pages that pass them to `Seo` as
  `ogImage`. Importing rather than pathing is what gets `og:image:width`/`height` emitted, since
  `Seo` reads them off the `ImageMetadata`.
- **JPEG at q82, mozjpeg.** 34–52 KB per card against 456 KB for the PNG it replaces. No scraper
  has ever wanted a photographic card in PNG.
- The **light monochrome lockup** (`logo-white-full.svg`), not the colour one: the card ground is
  the dark scrim, which is the case DESIGN.md §7 gives the monochrome variants for. The colour
  lockup's wordmark is drawn for light grounds and reads as grey mud on this one.
- The accent rule down the left edge takes the program's colour where a card has one — Hazard
  Green for FRC, Danger Orange for FLL — from the same `[data-theme]` values `global.css` ships.

## Alternatives considered

- **A build-time step in `astro:build:start`.** Same template, but it makes every build depend on
  a font cache the build machine has to have. The cards change when the photography changes; the
  photography changes by hand.
- **`getImage` crops of each page's hero photo.** Free, correctly sized, and no font problem —
  but no title, no lockup, and no consistent brand ground, which is most of what a card is for.
- **Keeping the PNG.** 456 KB to say nothing per-section.

## Consequences

- Regenerating needs Python with `fonttools` and `brotli`, plus fontconfig. Both scripts document
  it and neither runs in CI.
- A new section wants a new card: add it to the `cards` list, run `pnpm assets:og`, and pass it
  as `ogImage` with an `ogImageAlt` — `Seo` throws at build without the alt.
- `tools/checks/verify-meta.ts` asserts every page's `og:image` is absolute and resolves to a
  built file, so a card that is renamed and not rewired fails CI rather than a card debugger.
