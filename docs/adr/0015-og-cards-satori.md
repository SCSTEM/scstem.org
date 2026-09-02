# 0015 — Social cards render with Satori and resvg, from a vendored TTF

- **Status:** accepted
- **Date:** 2026-09-02
- **Amends:** [0010](0010-og-cards.md)

## Context

ADR 0010's renderer composited an SVG overlay onto the photograph with sharp. sharp draws SVG
text through librsvg, which finds fonts through fontconfig, and fontconfig reads neither the
variable woff2 the site ships nor a weight axis. So rendering a card needed a first step,
`tools/assets/og-fonts.ts`, that ran Python with `fonttools` and `brotli` to instance Orbitron to a
static TTF and install it into the user's `~/.fonts`, then `fc-cache`. A repository script that
depends on a second language runtime and writes into the home directory is the wrong shape, and
the title wrapping it fed was an estimate — 0.62 em per character — rather than a measurement.

`@vercel/og` was the suggested replacement. It wraps Satori and resvg for Vercel's Edge runtime:
a bundled Noto Sans, resvg as WASM, and a web `Response` API. In a Node script the two libraries
it wraps are the dependency.

## Decision

`tools/assets/og-cards.ts` builds the card as a Satori element tree, Satori lays it out and
returns SVG with the type embedded, `@resvg/resvg-js` rasterizes it, and sharp writes the JPEG as
before. Both are dev dependencies.

- Fonts are passed as bytes, not found on the system. `tools/assets/fonts/Orbitron-Bold.ttf` is
  the static 700 instance Google Fonts serves (`fonts.googleapis.com/css2?family=Orbitron:wght@700`
  to a client that does not advertise woff2; Orbitron 2.001), with its OFL license beside it.
  Satori reads TTF, OTF and WOFF and no variable axis, so this is a different file from the woff2
  in `src/styles/fonts/`, not a derivative of it.
- The photograph is cover-cropped by sharp and embedded as a JPEG data URI; the lockup is
  rasterized by sharp and embedded as PNG. Satori handles the scrim as a CSS gradient and the
  title as wrapped text in a fixed-width column, measured against the real glyphs.
- `og-fonts.ts`, `pnpm assets:og-fonts`, the `fc-cache` knip exception, and the Python requirement
  are gone. The script runs on any machine after `pnpm install`.

## Alternatives considered

- **`@vercel/og`.** The same engine behind an Edge-runtime wrapper; nothing it adds applies here.
- **Vendor the TTF and point fontconfig at it** with a repository `fonts.conf`. No new
  dependencies, but fontconfig configuration differs by platform and the font lookup stays a
  system dependency the script only papers over.
- **Keep the Python step.** The status quo this ADR exists to end.

## Consequences

- Two dev dependencies, pinned; a native binary for resvg per platform, fetched by pnpm.
- The template is an object tree rather than an SVG string; every container declares
  `display: flex`, which Satori requires.
- Card output changes slightly — Satori's line breaks are measured — so the seven committed
  JPEGs are regenerated with this change.
