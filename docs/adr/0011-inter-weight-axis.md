# 0011 — Inter ships with its weight axis trimmed to 400–700

- **Status:** accepted
- **Date:** 2026-09-01

## Context

Phase 09's `<head>` audit established that on this site the critical path is font-bound, not
image-bound: removing two `<link rel="preload">` tags cut LCP by ~660 ms because 61 KB of
High-priority font was queued ahead of the hero image (`docs/adr/0008-no-font-preloads.md`). What
that left is the payload itself. Three variable faces reach first paint — Inter 47.1 KB, Source
Code Pro 21.5 KB, Orbitron 11.5 KB — 80 KB between them, more than any hero image on the site.

`@fontsource-variable/inter` ships `wght 100 900`. DESIGN.md §3 sanctions **400/500/600** for
Inter, and nothing in the tree exceeds that: the only two `font-bold` call sites are Orbitron, in
the styleguide's type specimens. So more than half the axis is delta data for weights that never
render.

Measured, instancing each variable face down to the range its role actually spans:

| Face                  | Shipped |     Trimmed |  Saving | Range   |
| --------------------- | ------: | ----------: | ------: | ------- |
| Inter latin           | 47.1 KB | **35.2 KB** | 11.9 KB | 400–700 |
| Inter latin-ext       | 83.1 KB | **57.9 KB** | 25.2 KB | 400–700 |
| Source Code Pro latin | 21.5 KB |     18.3 KB |  3.2 KB | 400–600 |
| Orbitron latin        | 11.5 KB |     10.8 KB |  0.7 KB | 500–700 |

## Decision

Instance **Inter only**, to `wght 400 700`, with `tools/assets/font-subset.ts`
(`pnpm assets:fonts`). Output is committed to `src/styles/fonts/` and `fonts.css` points at it;
the `@font-face` range is declared `400 700` to match, so the browser is told what the file can
actually do.

- **400–700, not 400–600.** The extra step costs 0.6 KB and means a stray `font-bold` on body copy
  renders a real weight rather than a synthetic one. Synthetic bold on body text looks worse than
  0.6 KB costs.
- **latin-ext is trimmed too**, though it is never fetched — its unicode-range covers codepoints
  no current copy contains. 25 KB of repository and `dist/` weight for consistency with the face
  beside it, and it is the same script run.
- **Source Code Pro and Orbitron are left alone.** 3.9 KB between them is not worth narrowing what
  the design is allowed to reach for; Orbitron in particular is the display voice, where a heavier
  weight is a plausible future choice.
- **By hand, not at build time.** The instancing needs Python with `fonttools` and `brotli`. It
  changes when DESIGN.md §3 changes, which is not per-build — the same reasoning as
  `docs/adr/0010-og-cards.md`.

## Alternatives considered

- **Static instances at 400/500/600.** Smaller per file (23.7 KB at 400 alone) but three files,
  ~70 KB total, all three fetched because all three weights render above the fold. Worse.
- **Glyph subsetting to the characters currently on the site.** Much larger saving, and wrong: the
  content is markdown that editors change, so a sponsor name or an event description with a
  character outside the subset would silently render in the fallback.
- **Dropping a face entirely.** Source Code Pro is 22 KB and owns the numerals and spec labels
  (DESIGN.md §3, D26); cutting it is a design decision, not a performance one. Recorded in
  `plan/todo.md` as the remaining lever if the budget ever needs it.

## Consequences

- Inter physically cannot render above 700 now. DESIGN.md §3 carries a note saying so, since that
  is where someone would look before reaching for a heavier weight.
- The committed woff2 files are build artifacts in the source tree. `pnpm assets:fonts`
  regenerates them from the pinned package; a `@fontsource-variable/inter` bump means re-running
  it, and the diff is two binaries.
- Repository and `dist/` both lose 37 KB of font, and 11.9 KB of that is off the critical path.
