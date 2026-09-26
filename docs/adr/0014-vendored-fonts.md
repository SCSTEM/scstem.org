# 0014 — Font files are vendored, not installed

- **Status:** accepted
- **Date:** 2026-09-02
- **Amends:** [0011](0011-inter-weight-axis.md)

## Context

Four `@fontsource` packages were dependencies, and none of their CSS was used: `src/styles/fonts.css`
declares every `@font-face` itself so that only the latin subsets reach the build, and pointed at
the packages' woff2 files by bare path. Inter did not even do that — `tools/assets/font-subset.ts`
read the package's file, trimmed its weight axis with fonttools, and wrote a committed copy to
`src/styles/fonts/`. So the packages were file storage: four dependencies knip had to be told to
ignore, one of them a source for a hand-run Python step, and a second script reading the Orbitron
package for the social cards.

## Decision

The woff2 files the site serves live in `src/styles/fonts/`, each with its OFL license text beside
it, and the `@fontsource` packages, the knip exceptions, `tools/assets/font-subset.ts`, and
`pnpm assets:fonts` are gone.

- The files are the Google Fonts builds fontsource 5.3.0 packaged, latin subsets only, so the
  unicode ranges in `fonts.css` still describe them.
- Inter keeps the 400–700 instance from ADR 0011. It is now a file with a recorded provenance
  rather than the output of a maintained script; the fonttools call that produced it is below, for
  the day DESIGN.md §3 widens the range.
- `tools/assets/og-fonts.ts` reads the committed Orbitron file.

## Regenerating Inter

From a Google Fonts variable build of Inter (`wght 100 900`, latin and latin-ext subsets), with
`fonttools` and `brotli` installed:

```py
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

font = instantiateVariableFont(TTFont(source), {"wght": (400, 700)}, inplace=False,
                               updateFontNames=False)
font.flavor = "woff2"
font.save("src/styles/fonts/inter-latin-wght-400-700.woff2")
```

The `@font-face` in `fonts.css` declares `font-weight: 400 700`; change both together.

## Alternatives considered

- **Keep the packages, drop the script.** Ships Inter's full axis again (47 KB on the critical
  path instead of 35 KB) and keeps four dependencies whose only role is holding files.
- **Keep the packages and the script.** The status quo: two sources of truth for Inter, and a
  package bump that means nothing until someone reruns the script.

## Consequences

- About 150 KB of binaries in the repository. Fonts change on a timescale of years; a refresh is
  a download and a commit, and the diff is the file.
- No dependency update ever touches a font. Fontsource's changelog is the place to hear about a new
  upstream build worth taking.
