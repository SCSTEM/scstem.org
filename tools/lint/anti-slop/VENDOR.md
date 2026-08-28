# Vendored: anti-slop

Oxlint plugin from [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop), MIT licensed
(see `LICENSE`). Copied from the repo's `skills/install-anti-slop/assets/anti-slop/` at commit
`6d538555cb151d4121ed51a27db81890eacf8ae9`.

- The Effect-specific rules (`effect/`) are omitted — this repo does not use Effect.
- Vendored rather than depended on because the plugin ships as skill assets, not an npm package.
- Excluded from this repo's lint and format ignores: it is upstream source, formatted upstream's way.
- To update: re-copy the same directory from a newer upstream commit and record the commit here.
  Do not fork the rule source; if a rule needs to change, change it upstream.
