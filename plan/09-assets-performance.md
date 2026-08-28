# Phase 09 — Assets & performance: media pipeline, budgets in CI

**Prerequisites:** Phases 06–08 (all pages exist; this phase optimizes what they serve).
**Stack layer:** `overhaul/09-assets-performance`, stacked on `overhaul/08-events` (D23).

## Objective

Close the biggest mobile-perf gaps (72 MB `public/`, 22 MB hero video, 11 MB backgrounds, no responsive images) and make the budgets *enforced* — Lighthouse CI becomes a blocking PR gate. This is where "10/10 mobile" stops being aspirational.

## Current worst offenders (from audit)

`public/video/biohazard/home-video.mp4` 22.1 MB, `home-video.webm` 14.7 MB, `image/biohazard/2021-robot-pits.webp` 2.2 MB, `electronics.webp` 1.0 MB, `openhouse-header.webp` 931 KB, `legos.webp` 808 KB — 26 files > 300 KB total.

Phase 04 already re-encoded the sources it moved into `src/assets/` (`tools/assets/optimize-sources.mjs`, §2 below, 17.8 MB saved) — `2019-robot-field.webp` was the worst at 11.3 MB. The video, and everything still in `public/image`, is untouched.

## Tasks

### 1. Asset inventory & relocation

- Enumerate every asset in `public/image`, `public/video` and map to consumers in the new `src/`. Anything unused by the new site (legacy leftovers, Docusaurus-era art, unDraw SVGs retired by DESIGN.md §7): delete. List deletions in the PR.
- Move all page-consumed raster images to `src/assets/<domain>/` (brand/, frc/, fll/, sponsors/, team/, events/) so astro:assets processes them. `public/` keeps only: favicons/manifest icons, default OG image(s), `robots.txt`, `_redirects`, `_headers`, video files.

### 2. Source re-encoding

- Script `tools/assets/optimize-sources.mjs` (sharp, run manually, documented): re-export any source > 500 KB — max dimension 2560px, quality-tuned WebP/JPEG sources (astro:assets derives AVIF/WebP variants at build). Commit re-encoded sources; keep originals only if under size, otherwise they're gone (git history preserves them).
- Verify astro:assets output: every `<Image>`/`<Picture>` use has `widths` + `sizes` appropriate to its rendered layout, AVIF+WebP formats, explicit dimensions (CLS = 0). Note that with the Phase 04 sources already at q80/2560px, a variant generated at Astro's default quality comes out slightly *larger* than the source (+6 to +89 KB across the team photos) — `widths` plus an explicit `quality` at each call site is what closes that, and it needs the call sites this phase finally has. LCP image per page: `loading="eager"` + `fetchpriority="high"`; all others lazy.

### 3. Hero video (D20)

- Re-encode with ffmpeg from the best source available: target ≤ 3 MB total per format — trim to a short loop (~10–15 s), 1080p max (consider 720p if quality holds), CRF-tuned H.264 MP4 + AV1/VP9 WebM, no audio track, `movflags +faststart`.
- Poster: AVIF/WebP frame ~1200 w, wired as the hero's LCP element.
- Behavior (already structured in Phase 06's Hero): `preload="none"`, in-view + `prefers-reduced-motion` + `saveData` gating in the small hero script.

### 4. Fonts & head hygiene

- Confirm subsetting (latin), exactly two preloaded font files, no unused weights shipped (`dist` inspection).
- Audit `<head>`: no render-blocking scripts; analytics (Phase 10) must load deferred.

### 5. Lighthouse CI as a gate

- `.github/workflows/lighthouse.yml` (or a job in `ci.yml`): build, serve `dist/` locally, run `@lhci/cli autorun` (mobile emulation, simulated throttling) against representative URLs: `/`, `/programs/frc`, `/programs/frc/robots`, `/sponsors`, `/openhouse`, `/contact`.
- `lighthouserc` assertions (blocking): performance ≥ 0.95, accessibility = 1.0, seo = 1.0, best-practices ≥ 0.95; `largest-contentful-paint` < 2000 ms, `cumulative-layout-shift` < 0.05, `total-blocking-time` < 100 ms; resource budgets: script < 35 KB gzip, total page weight < 1 MB (excluding `preload="none"` video, which doesn't count against initial load).
- Add the budget table to `docs/tooling.md`; failures block merge.

## Acceptance criteria

- [ ] `public/` + `src/assets/` combined size reduced from 72 MB to < 15 MB (video included); no image source > 500 KB unless justified in the PR.
- [ ] Every page's images: responsive srcset, modern formats, zero CLS from media.
- [ ] Hero video ≤ 3 MB per format, poster is the LCP, plays only when in-view/motion-allowed.
- [ ] Lighthouse CI green on all six URLs at the thresholds above, wired as a required PR check.
- [ ] `pnpm check && pnpm build` green; knip/link-check still green after deletions.
