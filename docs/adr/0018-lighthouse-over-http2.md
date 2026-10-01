# 0018 — The Lighthouse gate measures the build over HTTP/2 and TLS

- **Status:** accepted
- **Date:** 2026-09-07
- **Amends:** [0007](0007-lighthouse-ci-gate.md); confirms [0008](0008-no-font-preloads.md)

## Context

The Lighthouse gate had failed on every CI run since Phase 09 added it, on the LCP assertion
alone: four of the six budgeted URLs between 2036 and 2201 ms against a 2000 ms budget, while the
same build measured 1730–1820 ms on a developer machine. Two things differed.

**Chrome.** The runner's Chrome 152 fetches every `loading="lazy"` image within roughly three
viewports during the initial load; the Chrome 141 the local runs used fetched one. On the homepage
that is 115 KB more on the wire before the hero paints, on `/about/` 211 KB, and Lighthouse's
Lantern simulation shares its 1.6 Mbps link equally among requests in flight, whatever their
priority, and counts every request that ended before the observed paint. Reproduced locally with
Chrome 152 for Testing to within 50 ms of CI.

**Transport.** `astro preview` serves HTTP/1.1 without TLS. Lantern simulates the protocol it
observes, and over HTTP/1.1 every parallel request beyond the first six waits for a connection and
every new connection is charged a handshake at the simulated 150 ms round trip. Cloudflare Pages
serves HTTP/2 over TLS, where one connection carries everything. The gate was measuring a
transport the site is never served on, and on Chrome 152 that transport was worth 450 ms of LCP.

Measured, Chrome 152, median of three, milliseconds:

| URL                     | CI, as found | fonts subset + 672 step, HTTP/1.1 | same build, HTTP/2 + TLS |
| ----------------------- | -----------: | --------------------------------: | -----------------------: |
| `/`                     |         2138 |                              2037 |                     1577 |
| `/about/`               |         2117 |                              2033 |                     1427 |
| `/programs/frc/robots/` |         2121 |                              1887 |                     1455 |
| `/sponsors/`            |         2040 |                              1881 |                     1502 |

## Decision

1. **`tools/ci/serve.ts` serves `dist/` for the gate**: HTTP/2 over TLS with a self-signed
   certificate it generates with `openssl` on first run, gzip on the text types Cloudflare
   compresses, `404.html` for a missing path. `lighthouserc.json` starts it in place of
   `astro preview` and launches Chrome with `--ignore-certificate-errors`.
2. **The latin faces are subset** to the characters English copy uses, 12 KB off the fonts every
   page loads (`0017-font-subset.md`).
3. **Image ladders gain a 672px step** where a photograph is 92vw wide on a phone. A 360 CSS px
   screen at 2x and Lighthouse's 412 px at 1.75x both ask for about 665 device pixels and were
   being answered with the 768 or 840 px variant.
4. The LCP budget stays at 2000 ms. With the transport the site is served on, the tightest median
   is 1577 ms.

## Alternatives considered

- **Preload the three above-the-fold faces.** Over HTTP/1.1 it recovered 100–300 ms on four
  pages and nothing on the homepage; over HTTP/2 it changed nothing (1578 vs 1577 ms on `/`, 1428
  vs 1427 on `/about/`). 0008 stands.
- **Inline the stylesheet.** Removes a request hop, but puts the fonts and the hero image on the
  wire at the same moment; measured 150–200 ms worse on the homepage.
- **Pin Chrome for the gate.** Reproducible, and blind: Chrome 152's lazy-loading is what
  visitors run, so the gate should see it.
- **Raise the budget.** Would have hidden a real 450 ms measurement error rather than fixing it.
- **Reduce the below-the-fold photographs further.** They are already q70 and right-sized; what
  remained was the transport.

## Consequences

- `openssl` is a requirement of the Lighthouse job and of running `lhci autorun` locally. It is on
  every GitHub runner image and on macOS.
- Lighthouse's `uses-http2` diagnostic passes for the first time, and the reports describe the
  site as visitors get it.
- LHCI kills the server it started, so the local `astro preview stop` step in `docs/tooling.md` is
  gone.
- Chrome on the runner is whatever `ubuntu-latest` ships. A future Chrome can move the numbers
  again; the job summary now prints the waterfall behind every URL's LCP so the cause is readable
  from the log.
