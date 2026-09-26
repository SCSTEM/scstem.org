# 0002 — Inline Tabler icons from `@tabler/icons` instead of astro-icon + Iconify

- **Status:** accepted
- **Date:** 2026-08-28
- **Supersedes:** the icon row of `plan/03-primitives.md` ("via `astro-icon` +
  `@iconify-json/tabler`")

## Context

`DESIGN.md` §8 specifies Tabler icons, outline, 2px stroke. The plan reached them through
`astro-icon` with the `@iconify-json/tabler` icon set — two dependencies and an indirection layer
whose icon names are Iconify's, not Tabler's.

## Decision

Depend on `@tabler/icons` — the base package of plain SVG source files — and inline the SVG at
build time in the `Icon` primitive.

```
node_modules/@tabler/icons/icons/outline/robot.svg
exports: { "./*": ["./icons/*"] }   →  import "@tabler/icons/outline/robot.svg"
```

The source files already carry `stroke="currentColor"` and `stroke-width="2"`, so they match
`DESIGN.md` §8 as shipped, with no normalization pass.

## Alternatives rejected

- **`@tabler/icons-react`** — ships React components. Rendering one requires a React renderer,
  which breaks D3 (zero client framework runtime). Also 66 MB unpacked versus 11 MB.
- **Keeping astro-icon + `@iconify-json/tabler`** — works and needs no network at build (the icon
  set is an npm package, not an API call), but adds two dependencies and a second naming scheme
  for no capability this site uses.

## Consequences

- `astro-icon` and `@iconify-json/tabler` are not dependencies. `@tabler/icons` is a
  devDependency: only the inlined path data reaches the client, never the package.
- Icon names are Tabler's own, matching what tabler.io/icons shows.
- Any future need for a non-Tabler icon set means either a second package of the same shape or
  revisiting Iconify — a new ADR either way.
