# 0020 — Class names are linted against the theme with `@shadcn/lint`

- **Status:** accepted
- **Date:** 2026-09-26

## Context

Every visual value on the site is meant to come from the `@theme` block in
`src/styles/global.css`, which copies DESIGN.md. Nothing enforced that. Tailwind generates no CSS
for a class it does not know and says nothing, so a misspelled or invented class — `text-huge`,
`rounded-huge`, a size token renamed in `global.css` but not at its call sites — shows up only as
a wrong rendering in the browser. The semantic type scale made this sharper: the `font-size` group
in `src/lib/cn.ts` mirrors the `--text-*` tokens by hand, and AGENTS.md recorded that nothing
checked classes against them.

## Decision

- `@shadcn/lint` is an exact dev dependency at **0.1.1**. It is the newest release the repo's
  seven-day `minimumReleaseAge` admits (0.1.1 was published 2026-09-17; 0.1.2 through 0.2.0 on
  2026-09-20 to 09-22). A bump is an ordinary dependency update once a newer release has aged.
- `eslint.config.ts` enables two of its rules as errors for `src/**/*.{ts,astro}`:
  - `no-unknown-classes` — asks the installed Tailwind, loaded with our theme, whether each class
    generates CSS, and suggests the nearest real class.
  - `no-raw-colors` — palette colors (`bg-zinc-800`) and undeclared color tokens. A `text-*` class
    that is neither a size nor a declared color lands here, so `text-huge` is caught by this rule.
- No discovery settings are needed. Without a `components.json` the plugin finds the stylesheet
  that imports Tailwind (`src/styles/global.css`) and looks for components in `src/components/ui`,
  which contains `primitives/`. `cn` from `@/lib/cn` and `cva` are built-in class functions.
  `settings.shadcn.note` appends the DESIGN.md §11 reminder to every finding.
- Exceptions are exact classes in the rule's `allow` list, never `eslint-disable` comments:
  `no-unknown-classes` allows the hook classes a component's scoped `<style>` selects
  (`hero-media`, `menu-icon-open`, `menu-icon-close`). A new hook class is one more entry.

A first sweep that also ran `no-arbitrary-values` found 16 errors. The ones with an exact named
equivalent were changed; the rest stay as written:

| Finding                                        | Resolution                                                            |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| `h-[1lh]` (FeatureCard)                        | `h-lh`                                                                |
| `[scrollbar-width:none]` (Carousel)            | `scrollbar-none`                                                      |
| `[-ms-overflow-style:none]` (Carousel)         | Removed: only EdgeHTML and Internet Explorer read it                  |
| `[color-scheme:light]` (get-involved)          | `scheme-light`                                                        |
| `min-w-[52rem]` (styleguide)                   | `min-w-208` (208 × 0.25rem)                                           |
| `text-[5rem]`, `md:text-[8rem]` (GhostNumeral) | New `numeral` / `numeral-lg` type tokens, in DESIGN.md §3 and `cn.ts` |
| six structural values                          | Unchanged; bracketed values are allowed                               |
| three scoped-style hook classes                | `no-unknown-classes` `allow` entries, above                           |

Every swap compiles to the same computed values; the one change in the built CSS is the dropped
`-ms-overflow-style` declaration.

## Alternatives considered

- **`no-arbitrary-values`.** Flags every bracketed value. Most of the site's are structural, with no
  token by nature — overhangs relative to a parent (`calc(100% + 2rem)`), a one-page column
  ratio, the device safe area (`env()`) — so the rule would be an `allow` list to maintain rather
  than a check. Reviewing a bracketed value against DESIGN.md stays a review concern.

- **Enable `no-restyle` too.** It checks the classes a page passes to a design-system component
  against a per-component contract. Without contracts it reported 94 findings, most of them
  legitimate placement and sizing. It waits until contracts for the primitives are written.
- **`eslint-plugin-tailwindcss`.** Its 4.x line supports Tailwind v4 (stable since 4.0.2 in June
  2026; 4.4.0 is current) and its `no-custom-classname` covers the unknown-class check given a
  `cssConfigPath`. It has no equivalent of `no-raw-colors`, its messages do not propose a token,
  and it has no component contracts, so `no-restyle` would later mean a second plugin.
- **Do nothing.** Leaves the type-scale mirror and every other token reference checked only by
  eye in the browser.

## Consequences

- The plugin does not list Astro as supported. It works because `astro-eslint-parser` gives it a
  JSX-shaped AST: static `class`, `class:list`, `cn(...)` and `cva(...)` are all read. A class
  built at runtime from a template string is not, as with any static linter.
- The package is weeks old and moving quickly (six releases in eight days). The exact pin keeps a
  release from changing findings under us; each bump deserves a full `pnpm lint` before merging.
- `no-unknown-classes` loads Tailwind in a worker thread per run. The cost is within run-to-run
  noise: `pnpm lint` takes about 7.5–8 s with or without the rules, and ESLint's `TIMING` puts
  them at roughly 120 ms together.
- The `cn.ts` `font-size` group is still a hand mirror of the `--text-*` tokens. The lint catches a
  class that names no token; it does not catch a token missing from the merge group, which still
  shows only as a size lost to a neighbouring color.
