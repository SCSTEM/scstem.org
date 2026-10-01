# 0023 — IBM Carbon icons, inlined from `@carbon/icons`

- **Status:** accepted
- **Date:** 2026-09-27
- **Supersedes:** `0002-tabler-icons-direct.md`

## Context

The 2026-09 design review compared five icon sets in the places icons appear on this site — the
stamped plate on a card, inside buttons, the mode toggle — on both finishes: Tabler at 2px (the
set in use) and at 1.5px, Phosphor Light, Lucide, Iconoir, and IBM Carbon. The owner picked
Carbon: engineering glyphs drawn on a square 32-unit grid, which suits the build-document
metaphor, with the Facebook, LinkedIn and GitHub marks the footer needs (Lucide has dropped
brand logos).

## Decision

- Depend on `@carbon/icons` — the base package of plain SVG files — exact-pinned as a
  devDependency, and inline the SVG at build time in the `Icon` primitive, exactly as ADR 0002
  did for Tabler.
- Read the **32px masters** (`svg/32/<name>.svg`) and scale them to 16, 20, 24 or 32px. Carbon
  also ships pixel-hinted 16/20/24 sources for some icons; using one master keeps every icon on
  the same drawing at every size, and a name either exists or fails the build.
- Icons are filled shapes in `currentColor`. The `style` prop Tabler needed (outline or filled)
  is gone: Carbon names a filled variant (`star--filled`).
- Names are Carbon's own (`bot`, `logo--github`, `chevron--down`), as the Carbon icon library
  shows them. Every call site moved to them in the same commit.
- The package's `postinstall` only runs IBM's telemetry collector, so `pnpm-workspace.yaml`
  denies it (`allowBuilds: "@carbon/icons": false`). The SVGs ship in the tarball.

## Alternatives considered

- **Tabler at 1.5px.** A one-line change that kept every name, and the recommendation going into
  the review. It reads friendlier and rounder than the drawing it sits on.
- **Phosphor Light, Lucide, Iconoir.** Shown in the review; see its sheet 19. Lucide lacks brand
  logos; Iconoir's set is small for a robotics site; Phosphor is the closest alternative to
  Carbon if this is ever revisited.
- **`@carbon/icons` ES modules** (`es/`). They export icon descriptors for Carbon's own
  renderers; reading the SVG source is simpler and matches how the primitive already worked.

## Consequences

- Carbon's glyphs are solid, so they read heavier than the 1px hairlines around them. That
  contrast is deliberate: icons are marks set into the sheet, not linework drawn on it.
- Only the inlined path data reaches the client; the package never ships. It is large to install
  (about 147 MB unpacked, against Tabler's 11 MB), a cost paid once per cold CI cache.
- A second icon set on a page is a DESIGN.md §8 violation, not a dependency decision.
