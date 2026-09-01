# 0008 — No `<link rel="preload">` for fonts

- **Status:** accepted
- **Date:** 2026-09-01
- **Supersedes:** the preload wiring specified in `plan/02-design-system.md` §fonts and
  `plan/05-app-shell.md` §skeleton, and the "exactly two preloaded font files" line in
  `plan/09-assets-performance.md` §4.

## Context

`BaseLayout` preloaded the two above-the-fold faces — Inter variable (48.6 KB) and Orbitron
variable (12.1 KB) — from `src/styles/fonts.ts`, to shorten the flash of fallback text.

Phase 09's head audit measured what that costs. Lighthouse, mobile preset, simulated throttling
(1.6 Mbps, 150 ms RTT), one run per configuration:

| URL | | FCP | LCP | CLS | Perf |
| --- | --- | ---: | ---: | ---: | ---: |
| `/programs/frc/robots/` | with preloads | 1054 ms | 2028 ms | 0.000 | 99 |
| `/programs/frc/robots/` | without | **766 ms** | **1366 ms** | 0.000 | 100 |
| `/sponsors/` | with preloads | 1062 ms | 1958 ms | 0.000 | 99 |
| `/sponsors/` | without | **754 ms** | **1129 ms** | 0.000 | 100 |

A preload is a High-priority request issued from `<head>`, ahead of the render-blocking
stylesheet and well ahead of the hero `<img>` the browser finds later in the body. On a link that
carries 200 KB/s, putting 61 KB of fonts at the front of that queue delays first paint by ~290 ms
and the LCP image by ~660 ms. Every page on this site has a photograph as its LCP element, so the
preloads were buying a shorter FOUT with the metric the whole phase exists to protect.

`font-display: swap` means text paints in the fallback either way; the preload only changes when
the swap happens. CLS is 0.000 with and without, so the later swap costs no layout stability.

## Decision

Drop both preloads. Faces are discovered from `fonts.css` and fetched when the CSS resolves.
`src/styles/fonts.ts` existed only to supply their URLs and is deleted; `knip.jsonc` now lists
Inter and Orbitron alongside the other two faces as CSS-only dependencies.

## Alternatives considered

- **Preload Inter only.** Inter is 80% of the 61 KB, so it is most of the cost and little of the
  saving.
- **`rel="preload"` with `fetchpriority="low"`.** Contradicts the point of a preload, and still
  opens the connection ahead of the LCP image.
- **Cutting Inter's weight axis** with a variable-font instancer so the preload is affordable.
  A new build step and a Python toolchain for a face that no longer needs preloading.

## Consequences

- Webfonts settle a few hundred milliseconds later on a cold, slow connection. Warm caches are
  unaffected.
- Reintroducing a preload — for a face, or for an LCP image — is a decision to re-measure, not a
  one-line addition. The table above is the baseline to beat.
