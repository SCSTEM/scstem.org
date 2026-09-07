# 0017 — The latin faces are subset to the characters English copy uses

- **Status:** accepted
- **Date:** 2026-09-07
- **Amends:** [0011](0011-inter-weight-axis.md), [0014](0014-vendored-fonts.md)

## Context

The four latin faces in `src/styles/fonts/` were Google Fonts' `latin` builds as fontsource
packages them: 518 glyphs for Inter, covering Latin-1, spacing modifiers, combining marks, the
whole General Punctuation block, and the stylistic alternates that OpenType features reach. The
site's copy, across every built page, uses printable ASCII plus ten characters outside it: the
dashes, curly quotes, the ellipsis, ©, ®, and ≥.

Fonts are the third request hop on every page (HTML, then the stylesheet, then the faces the
stylesheet names) and Lighthouse's Slow 4G simulation charges every kilobyte of them against LCP,
which the gate was missing by 40 to 200 ms (`0018-lighthouse-over-http2.md`).

## Decision

Each latin face is subset to the ranges below with fonttools, output committed, `unicode-range` in
`fonts.css` restated to the same set so a browser fetches a face only for text it can render:

```
U+0020-007E   printable ASCII
U+00A0-00FF   Latin-1 supplement: ©, ®, °, accented vowels, …
U+2010-2027   dashes, quotes, bullet, ellipsis
U+2030-203A   per mille, primes, single guillemets
U+20AC        €
U+2122        ™
U+2212        minus
```

| Face                          |  Before |   After |
| ----------------------------- | ------: | ------: |
| Inter, wght 400–700           | 36.1 KB | 28.2 KB |
| Source Code Pro, wght 200–900 | 22.0 KB | 18.8 KB |
| Orbitron, wght 400–900        | 11.8 KB | 11.0 KB |
| Architects Daughter           | 13.2 KB | 12.5 KB |

Inter's latin-ext face is untouched: it is fetched only for a character outside the latin set,
which no page has.

The OpenType features kept are fonttools' defaults plus `tnum`, `pnum`, and `ccmp`:
`font-variant-numeric: tabular-nums` is set on `time`, `data`, and the stat numerals, and the
tabular figures have to be in the file for it to mean anything. Name records 0–6, 13, and 14 are
kept so the copyright and OFL notice travel with each file.

## Regenerating

From the fontsource 5.3.0 latin builds (`docs/adr/0014-vendored-fonts.md` says where the Inter
instance comes from), with `fonttools` and `brotli` installed:

```sh
pyftsubset <source>.woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+20AC,U+2122,U+2212" \
  --layout-features+=tnum,pnum,ccmp --name-IDs=0,1,2,3,4,5,6,13,14 \
  --flavor=woff2 --output-file=src/styles/fonts/<face>.woff2
```

The range in the command and the `unicode-range` in `fonts.css` are the same set; change both.

## Alternatives considered

- **Trim Source Code Pro's and Orbitron's weight axes**, as 0011 did for Inter. Measured in
  Phase 09 at 3.2 KB and 0.7 KB; the glyph set was where the bytes were.
- **Subset to the characters actually present in the build.** Smaller still, but a news post
  with an é would render its accent in the fallback face until someone regenerated the fonts.
  Latin-1 is the widest set English copy reaches into without becoming another language.
- **Drop Inter's 700.** DESIGN.md §3 sanctions 400/500/600, but markdown `**bold**` in the event
  and news bodies resolves to 700, and a clamped 600 is a design change 0011 declined to make.

## Consequences

- A character outside the ranges above renders in the system fallback face. The site's copy has
  none; a new one shows up in the browser, not the build.
- No hinting was dropped (`--no-hinting` measured under 200 bytes) and no glyph the copy uses is
  gone: the build's text was checked against each subset's character map.
