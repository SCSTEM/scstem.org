# 0003 — Depend on `sharp` directly for `astro:assets`

- **Status:** accepted
- **Date:** 2026-08-28

## Context

Phase 04 moves 33 images out of `public/` — where they were served untouched — into `src/assets/`
behind `image()` in the content schemas. That commits every one of them to `astro:assets`, whose
default image service is Sharp.

Astro ships `sharp` as its own dependency, so nothing had to be declared. But pnpm's isolated
layout keeps it only under `node_modules/.pnpm/astro@7.2.4*/node_modules/`, and Astro bundles its
Sharp service into `dist/.prerender/chunks/sharp_*.mjs`, from which `await import("sharp")` cannot
reach it:

```
$ node -e "import('sharp')"        # repo root
ERR_MODULE_NOT_FOUND
```

The first page that renders a collection image gets one warning per asset and an unoptimized
passthrough:

```
[WARN] Unable to generate optimized image for /_astro/jlg.DO8rjwK4.svg:
       MissingSharp: Could not find Sharp.
```

This was invisible while no page consumed a collection, and would have surfaced in Phase 05 on the
first `<Image>`.

## Decision

Declare `sharp` in `dependencies`, pinned to the version Astro already resolves (`0.35.3`), so it
sits at the root of the dependency graph where the bundled service can resolve it.
`pnpm-workspace.yaml` already allows its install script.

## Alternatives considered

- **A passthrough or noop `image.service` in `astro.config.ts`.** Keeps the dependency count flat
  but gives up optimization on every asset this phase just moved into the pipeline — responsive
  widths, AVIF/WebP derivatives, and the fingerprinted `_astro/` URLs — which is the entire reason
  for moving them out of `public/`. Rejected.
- **Hoisting via `nodeLinker: hoisted` or a `publicHoistPattern`.** Fixes resolution by weakening
  the isolation that keeps undeclared imports from working repo-wide. A one-line dependency is the
  narrower change.

## Consequences

- Sharp's platform binaries are part of every install and CI run. The pnpm store cache added in
  Phase 01 keeps that off the network on repeat runs.
- The version is pinned separately from Astro's, so an Astro bump that changes its Sharp range
  needs this pin re-checked. `pnpm peers check` reports the mismatch if one appears.
