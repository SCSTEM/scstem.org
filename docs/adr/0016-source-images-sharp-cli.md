# 0016 — Source images are prepared with sharp-cli, one file at a time

- **Status:** accepted
- **Date:** 2026-09-02

## Context

`tools/assets/optimize-sources.ts` walked `src/assets/`, found rasters over 300 KB or 2560 px,
re-encoded them as WebP at quality 80, and wrote the result only when it was at least 5% smaller.
The threshold and the minimum gain existed because the script ran over the whole tree: re-encoding
an already-encoded WebP always changes its size, so without them repeat runs would never converge
and would slowly degrade every image. That is machinery for a problem the workflow created. A
photograph is prepared once, when it arrives; nothing about the tree needs re-walking.

## Decision

A new source is converted with `sharp-cli` through `pnpm dlx`, pinned, before it is committed:

```sh
pnpm dlx sharp-cli@6.0.0 -i camera.jpg -o src/assets/<domain>/<name>.webp \
  --autoOrient -f webp -q 80 resize 2560 2560 --fit inside --withoutEnlargement
```

The same engine sharp already provides to the build, run once on one file. The script, its
`pnpm assets:optimize` entry, and the `tools/lib/fs.ts` walker only it and `verify-meta` shared
are removed; `verify-meta` carries its own walk.

Logos and other line art stay as SVG or PNG, as `docs/content.md` already says; the command is for
photographs.

## Alternatives considered

- **Keep the script.** 96 lines and a fixpoint guard to do what one command does.
- **ImageMagick.** Does the job but is a system dependency, which `docs/adr/0015` just removed
  one of.
- **`sharp-cli` as a devDependency.** Runs on one machine, once per photograph; `pnpm dlx` with an
  exact version is the same reproducibility with nothing in the tree (the ADR 0007 pattern).

## Consequences

- The command lives in `docs/content.md` beside the other content workflows, and a photograph that
  skips it is caught the way it always was: by a slow build and a large diff, not by a check.
- Bumping the pinned `sharp-cli` is an edit to two docs, not a lockfile change.
