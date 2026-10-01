# 0013 — Run the vendored anti-slop rules under ESLint

- **Status:** accepted
- **Date:** 2026-09-01
- **Amends:** [0012](0012-single-toolchain.md)

## Context

ADR 0012 removed `tools/lint/` with oxlint. The nkzw config was a rule preset that
`strictTypeChecked` replaces; the anti-slop plugin was not — its fifteen rules (no `unknown`
parameters or returns, no open dictionary types, no unjustified type assertions, no runtime
`typeof` narrowing, and so on) encode review judgement no typescript-eslint preset carries. They
are written against oxlint's JS-plugin API: `defineRule({ meta, createOnce })`, and AST and scope
types from `@oxlint/plugins`.

## Decision

Restore `tools/lint/anti-slop/` and load it through ESLint via a small compat layer.

- `compat.ts` exports the `defineRule`, `Scope`, `SourceCode`, `Variable` surface the rules
  import. `defineRule` returns an ESLint rule module whose `create` calls `createOnce` (no rule
  uses oxlint's `before`/`after` hooks or per-file state, so the two are equivalent).
  `estree.ts` aliases the oxlint AST type names onto typescript-estree's.
- `@typescript-eslint/utils` becomes a direct dev dependency for those types. It was already in
  the tree behind `typescript-eslint`; importing a transitive dependency by name is not allowed.
- The rule source keeps upstream's shape. The deviations — the import specifier, `range` instead
  of `start`/`end`, and the places where typescript-estree's AST is `undefined` where oxlint's is
  `null` — are listed in `tools/lint/anti-slop/VENDOR.md` so the next upstream copy can
  re-apply them.
- `eslint.config.ts` registers the plugin as `anti-slop` and enables every rule as an error for
  `.ts`, `.js` and `.astro` (frontmatter). `no-runtime-typeof` allows `typeof` inside type
  guards, since a guard from `unknown` is the boundary parser the rule asks for.
- `rules/` and `shared/` are upstream code and excluded from ESLint (`shared/` from knip too); the compat layer
  and the plugin object are linted.

## Consequences

- One more direct dev dependency, pinned to the `typescript-eslint` version.
- Updating the vendored rules is a re-copy plus the recorded deviations; a new oxlint AST name
  needs one alias line in `estree.ts`.
- The rules see typescript-estree's AST. Branches for nodes only oxc emits (parenthesized
  expressions and types, V8 intrinsics) are dead; `estree.ts` declares the parenthesized kinds
  so those branches still type-check.
