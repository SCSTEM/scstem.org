# Phase 09 — Assets & performance: media pipeline, budgets in CI

**Prerequisites:** Phases 06–08 (all pages exist; this phase optimizes what they serve).
**Stack layer:** `overhaul/09-assets-performance`, stacked on `overhaul/08-events` (D23).

## Objective

Close the biggest mobile-perf gaps (72 MB `public/`, 22 MB hero video, 11 MB backgrounds, no responsive images) and make the budgets _enforced_ — Lighthouse CI becomes a blocking PR gate. This is where "10/10 mobile" stops being aspirational.

## Current worst offenders (from audit)

`public/video/biohazard/home-video.mp4` 22.1 MB, `home-video.webm` 14.7 MB, `image/biohazard/2021-robot-pits.webp` 2.2 MB, `electronics.webp` 1.0 MB, `openhouse-header.webp` 931 KB, `legos.webp` 808 KB — 26 files > 300 KB total.

Phase 04 already re-encoded the sources it moved into `src/assets/` (`tools/assets/optimize-sources.mjs`, §2 below, 17.8 MB saved) — `2019-robot-field.webp` was the worst at 11.3 MB. The video, and everything still in `public/image`, is untouched.

## Tasks

### 1. Asset inventory & relocation

- Enumerate every asset in `public/image`, `public/video` and map to consumers in the new `src/`. Anything unused by the new site (legacy leftovers, Docusaurus-era art, unDraw SVGs retired by DESIGN.md §7): delete. List deletions in the PR.
- Move all page-consumed raster images to `src/assets/<domain>/` (brand/, frc/, fll/, sponsors/, team/, events/) so astro:assets processes them. `public/` keeps only: favicons/manifest icons, default OG image(s), `robots.txt`, `_redirects`, `_headers`, video files.

### 2. Source re-encoding

- Run `tools/assets/optimize-sources.mjs` (already built in Phase 04; sharp, manual, dry-run by default, `--write` to apply) across the full relocated inventory — it caps dimensions at 2560px and re-encodes anything over its size threshold, refusing changes with no meaningful gain so repeat runs are stable. Commit re-encoded sources; originals are gone (git history preserves them).
- Verify astro:assets output: every `<Image>`/`<Picture>` use has `widths` + `sizes` appropriate to its rendered layout, AVIF+WebP formats, explicit dimensions (CLS = 0). Note that with the Phase 04 sources already at q80/2560px, a variant generated at Astro's default quality comes out slightly _larger_ than the source (+6 to +89 KB across the team photos) — `widths` plus an explicit `quality` at each call site is what closes that, and it needs the call sites this phase finally has. LCP image per page: `loading="eager"` + `fetchpriority="high"`; all others lazy.

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

- [x] `public/` + `src/assets/` combined size reduced from 72 MB to < 15 MB (video included); no image source > 500 KB unless justified in the PR. **11 MB** (`public/` 2.3 MB, `src/assets/` 8.5 MB); largest source is `team/frc/2022.webp` at 470 KB.
- [x] Every page's images: responsive srcset, modern formats, zero CLS from media. CLS is 0.000 on all six measured URLs.
- [x] Hero video ≤ 3 MB per format, poster is the LCP, plays only when in-view/motion-allowed. 1.19 MB MP4 / 0.49 MB WebM.
- [x] Lighthouse CI green on all six URLs at the thresholds above, wired as a required PR check.
- [x] `pnpm check && pnpm build` green; knip/link-check still green after deletions.

## As built

Three Lighthouse runs per URL (mobile preset, simulated throttling), the same configuration
`.github/workflows/lighthouse.yml` runs. Every assertion passes, on the **median** of the three:

| URL                     | Perf | A11y |  BP | SEO | LCP median | LCP, the three runs |   CLS | TBT | Transfer |
| ----------------------- | ---: | ---: | --: | --: | ---------: | ------------------- | ----: | --: | -------: |
| `/`                     |   99 |  100 | 100 | 100 |    1807 ms | 1355 / 1807 / 1819  | 0.000 |   0 |   165 KB |
| `/programs/frc/`        |  100 |  100 | 100 | 100 |    1659 ms | 1658 / 1659 / 1663  | 0.000 |   0 |   623 KB |
| `/programs/frc/robots/` |  100 |  100 | 100 | 100 |    1430 ms | 1355 / 1430 / 1881  | 0.000 |   0 |   256 KB |
| `/sponsors/`            |  100 |  100 | 100 | 100 |    1282 ms | 1210 / 1282 / 1953  | 0.000 |   0 |   206 KB |
| `/openhouse/`           |   99 |  100 | 100 | 100 |    1807 ms | 1657 / 1807 / 1808  | 0.000 |   0 |   123 KB |
| `/contact/`             |  100 |  100 |  96 | 100 |    1659 ms | 1658 / 1659 / 1663  | 0.000 |   0 |   109 KB |

`/contact/`'s Best Practices is 96 because of the Turnstile widget's third-party script; the
threshold is 0.95, and the widget is the form's spam defence.

### How the LCP budget was actually met

It was not met by the image work. Two font changes did it, in this order:

1. **Removing the two font preloads** (§4, `docs/adr/0008-no-font-preloads.md`). 61 KB of
   High-priority font was queued from `<head>` ahead of the render-blocking stylesheet and well
   ahead of the hero `<img>`, on pages whose LCP element is always a photograph. Worth ~660 ms.
2. **Trimming Inter's weight axis** to the range DESIGN.md §3 sanctions
   (`docs/adr/0011-inter-weight-axis.md`), 47.1 KB → 35.2 KB on the critical path.

Before the second change, LCP was **bimodal** — clusters around 1.2 s and 2.1 s with nothing
between, and `/programs/frc/robots/` and `/sponsors/` each had runs above the 2000 ms budget
(1355 / 2108 / 2110 and 1210 / 2032 / 2036). Chasing it structurally got nowhere: an LCP-image
`<link rel="preload">` moved the median by 2 ms. Taking 12 KB off the critical path is what
collapsed it — every run on every budgeted URL is now under 2000 ms, the worst being 1953 ms.

So `lighthouserc.json` asserts on the **median** of three runs rather than the best, which is what
the budget was always supposed to mean. The remaining spread is one slow run per page and
median-of-three absorbs it. Tightest margin is `/` and `/openhouse/` at 1807 ms.

### Deviations from this brief, each with an ADR

- **§2's "AVIF+WebP formats" is WebP only** — `docs/adr/0005-webp-only-image-variants.md`. AVIF is
  40× slower to encode for a saving WebP matches at any affordable effort level; the measurements
  are in the ADR. What §2 actually wanted — variants smaller than their sources — came from
  `PHOTO_QUALITY` plus an explicit `width` on every responsive call site.
- **§4's "exactly two preloaded font files" is zero** — `docs/adr/0008-no-font-preloads.md`. The
  head audit that section asks for is what found them: 61 KB of High-priority fonts ahead of the
  hero `<img>` cost ~290 ms of FCP and ~660 ms of LCP, for a shorter FOUT and no CLS difference.

### Implementation notes

- **`public/image/` is deleted in full** — 33 files, 5.4 MB. Nothing in `src/`, `functions/`,
  `tools/` or the built output referenced any of them: the unDraw set retired with DESIGN.md §7,
  the pattern SVGs with the engineering grid (§2.3), `meta.png` with `public/og/default.png`, and
  the rest are Docusaurus-era leftovers. Everything a page renders had already moved to
  `src/assets/` in Phase 04.
- **`tools/assets/optimize-sources.mjs` is at its fixpoint** — a dry run reports zero changes
  across the relocated inventory, which is the "refuses changes with no meaningful gain" floor
  working as designed. The re-encode §2 asks for happened in Phase 04.
- **`HeroImage.astro` is new**, and the eleven heroes now render it instead of repeating six
  identical `<Image>` attributes. `class="h-full w-full object-cover"` went with them: `Hero`'s
  own style already sizes whatever lands in its `media` slot.
- **Width ladders gained a step near 768px.** Lighthouse's mobile viewport asks for ~721 device
  px, and two-step ladders were answering it with a 1120px or 1280px variant. Real phones sit in
  the same band.
- **The robots page's `loading={index === 0 ? "eager" : "lazy"}` was left alone.** It reads like a
  below-the-fold eager fetch, but index 0 is a season with no photo yet, so the eager branch never
  renders — confirmed against the built HTML, where every robot image is lazy.
