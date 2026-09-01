# 0005 — WebP-only image variants, at an explicit quality and width

- **Status:** accepted
- **Date:** 2026-09-01

## Context

`plan/09-assets-performance.md` §2 asks every `<Image>` call site to emit "AVIF+WebP formats".
Phase 09 is also where the sources it would apply to reached their final shape: every raster in
`src/assets/` is a WebP master, re-encoded by `tools/assets/optimize-sources.mjs` at quality 80
and capped at 2560px.

Two measurements taken against `src/assets/sc2/competition-1.webp` (2048×1365, 283 KB) decided
how those call sites are configured.

**AVIF costs 40× the encode time for a saving WebP already matches.** Sharp, encoding a 1920px
variant on the build machine:

| format | quality | effort | size | time |
| ------ | ------- | ------ | ---- | ---- |
| WebP | 80 | — | 268 KB | 0.37 s |
| WebP | 70 | — | 211 KB | 0.28 s |
| AVIF | 55 | 4 (sharp default) | 173 KB | 11.4 s |
| AVIF | 55 | 2 | 188 KB | 1.8 s |
| AVIF | 55 | 0 | 205 KB | 0.36 s |

AVIF only beats WebP at an effort level that costs eleven seconds per variant. The build emits
172 variants; at sharp's default effort that is roughly half an hour added to every build and
every CI run. At the effort levels that are affordable, AVIF and WebP land within 3% of each
other — and Astro's `<Picture>` exposes no per-format `effort` knob to tune it with.

**A variant at the default quality came out larger than its own source.** The build log before
this phase:

```
▶ /_astro/competition-1.CqVIq-Ep_xi2Ta.webp  (before: 283kB, after: 291kB)
▶ /_astro/dean.zuOjR3D9_Z2ci1wI.webp         (before: 168kB, after: 173kB)
▶ /_astro/award.BcUbzuVo_1o0x2m.webp         (before:  54kB, after:  56kB)
```

Those are the widest steps: a re-compression of an already-lossy q80 file at q80, which adds
generation loss and bytes at the same time. Separately, Astro fills the `src` attribute — the
fallback for a client that ignores `srcset` — from the source's *intrinsic* size whenever no
`width` prop is given, so a 2560px master produced a 436 KB variant that no page ever displays.

## Decision

- **WebP only.** No `<Picture>`, no `formats`; every call site stays on `<Image>`, which keeps the
  source's WebP.
- **`PHOTO_QUALITY = 70`** (`src/lib/images.ts`) on every photographic call site. Logos and line
  art keep the default: they are small already, and quantizing flat colour is what makes a mark
  look cheap.
- **Every responsive call site passes `width` equal to the largest entry in its `widths`.** Astro
  then dedupes the fallback against that srcset entry instead of adding a full-resolution one.

Together these took the build from 183 variants to 172, the largest emitted image from 436 KB to
199 KB, and `dist/` to 9.5 MB.

## Alternatives considered

- **AVIF on hero images only.** Nine LCP images × four widths at eleven seconds each is still six
  minutes per build, for images that the measurements above say WebP already matches.
- **Re-capping the masters at 1920px** so the fallback is small without a `width` prop. Solves the
  fallback but throws away resolution the repository may want later, and does nothing about the
  re-compression at the widest step. An explicit `width` fixes both and is reversible.

## Consequences

- Anything about the build that turns on AVIF being cheap — a faster encoder, `sharp` gaining a
  usable effort/quality curve — makes this worth re-measuring. The table above is the baseline.
- `quality` and `width` are now part of what a new `<Image>` call site has to get right.
  `HeroImage.astro` carries the whole recipe for the one case that repeats eleven times.
