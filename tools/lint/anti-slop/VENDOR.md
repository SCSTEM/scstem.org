# Vendored: anti-slop

Lint rules from [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop), MIT licensed (see
`LICENSE`). `rules/` and `shared/` are copied from the repo's
`skills/install-anti-slop/assets/anti-slop/` at commit `6d538555cb151d4121ed51a27db81890eacf8ae9`.

- The Effect-specific rules (`effect/`) are omitted — this repo does not use Effect.
- Vendored rather than depended on because the plugin ships as skill assets, not an npm package.
- Upstream writes for oxlint's JS-plugin API. ESLint loads the rules through `compat.ts`
  ([ADR 0013](../../../docs/adr/0013-anti-slop-eslint-port.md)): `defineRule` wraps `createOnce`
  in an ESLint `create`, and `estree.ts` maps the oxlint AST type names onto typescript-estree's.
  `index.ts` is this repo's plugin object, not upstream's.
- `rules/` and `shared/` are formatted by Prettier like the rest of the repo and excluded from
  ESLint (`eslint.config.ts`), and `shared/` from knip (`knip.jsonc`); `compat.ts`, `estree.ts` and `index.ts`
  are linted.

## Deviations from upstream

The rule source differs from the copied commit only where typescript-estree's AST differs from
oxlint's. Everything else is a compat-layer concern and stays out of `rules/` and `shared/`.

1. Import specifier, every file: `"@oxlint/plugins"` → `"../compat.ts"`.
2. Node offsets: typescript-estree nodes carry `range: [start, end]` and no `start`/`end`.
   `no-widen-then-assert.ts` (`normalizedTypeText`, `resolvedVariableForIdentifier`,
   `widenedBinding`, the `node.start <= widened.declaredAt` guard) and
   `require-safety-comment-for-type-assertion.ts` (`hasSafetyComment`) use `range[0]`/`range[1]`.
3. `Program.parent` is `undefined`, not `null`: the five `= node.parent;` initialisers of a
   `current: ESTree.Node | null` walk read `= node.parent ?? null;` (`no-known-value-widening`,
   `no-runtime-typeof`, `no-unsafe-dictionary-type`, `no-widen-then-assert`, and
   `no-chained-type-assertions` widens with `as ESTree.Node` for the same reason).
4. Absent type annotations are `undefined`, not `null`: `TSIndexSignature.typeAnnotation` and
   `TSMappedType.typeAnnotation` compare with `== null` / `!= null`
   (`no-unsafe-dictionary-type`, `shared/dictionary-types.ts`); `TSTypeOperator.typeAnnotation`
   is checked for `undefined` before use (`shared/dictionary-types.ts` `unwrapTransparentType`,
   `no-widen-then-assert` `isDefinitelyObjectType`); the index-signature check in
   `no-widen-then-assert` `isBroadRecordType` requires an `Identifier` parameter with an
   annotation and an annotated member.
5. `V8IntrinsicExpression` does not exist in typescript-estree: the `callee.type` early return in
   `no-module-mocking`, `no-reflect-apply`, `no-reflect-get` tests only `"Super"`.
6. `unsafeMembers[0] ?? null` in `shared/dictionary-types.ts` (`noUncheckedIndexedAccess`).

## Updating

Re-copy `rules/` and `shared/` from a newer upstream commit, record the commit above, re-apply
the deviations, run `pnpm fmt`, then `tsc -p tools` and `pnpm lint`. Items 1 and 2 are
mechanical (`sed`); a compile error elsewhere means upstream touched one of the sites in 3–6
or a new oxlint AST name needs an alias in `estree.ts`.
