# ui/primitives

Low-level building blocks. Styled only with the tokens from `DESIGN.md`, no client framework, no
runtime dependencies. `../` (`ui/`) holds the composed, site-level components built from these.

To add one, use the `shadcn-astro` skill (`.claude/skills/shadcn-astro/`).

## Conventions

**The API mirrors shadcn.** Same component names, the same `variant`/`size` prop vocabulary,
CVA for variants, `cn()` from `@/lib/cn` for merging, and a `class` prop plus `...rest` spread
onto the root element so callers can extend without forking.

**CVA definitions live in a sibling `*.variants.ts`.** Astro forbids exporting values from a
component (`astro/no-exports-from-components`), so `Button.astro` imports `buttonVariants` from
`Button.variants.ts`. This is also what lets another component reuse a recipe — a link styled as
a button — instead of copying classes.

**Zero JS by default.** The interactivity ladder, in order:

1. A native HTML element — `<details>` for Accordion, `<dialog>` for Dialog.
2. CSS alone — scroll-snap for Carousel, `:focus-within` for disclosures.
3. A small inline `<script>` with no dependencies.

Only reach for a lower rung when the ones above genuinely cannot deliver, and always as
progressive enhancement: **content must be readable and reachable without JavaScript.** A
Dialog therefore never holds content available nowhere else.

**Accessibility is part of the primitive**, not the caller's job. Focus-visible styles, ARIA
wiring, and keyboard behavior ship with the component. Prefer letting the platform do it: a
native `<dialog>` brings its own focus trap, Esc handling and inert background; `<details>`
brings Enter/Space.

**Polymorphism instead of `asChild`.** Where shadcn passes behavior down with `asChild`, these
take an `as` prop, or infer the element — `Button` renders an `<a>` when given `href`. That is
why legacy's separate `LinkButton` is gone.

**Types.** Each primitive declares a local `Props` interface extending the right
`HTMLAttributes<"element">` from `astro/types`, with `class` omitted so `cn()` owns merging.

## Token gotcha

`body` names both a color (DESIGN.md §2) and a type size (§3). Tailwind resolves the color
namespace first, so:

- `text-body` — the **color** `#D4D4D4`, consistent with `text-muted` and `text-foreground`.
- `text-copy` — the **size** token. Elements inherit it from the base layer, so this is only for
  resetting something back.

Relatedly, `@/lib/cn` is a _configured_ merge, not a re-export: it registers the DESIGN.md §3
type scale as the font-size conflict group. Without that, `cn()` treats every `text-*` class as
one group and silently drops all but the last — which is how a primary button's label first
ended up body-gray on Safety Yellow. **A new size token means one more entry in `cn.ts`.**

## Registering a new primitive

`/styleguide` is the visual-review artifact for the Phase 06 gate and the contract for these
components. A primitive that is not on it does not exist as far as review is concerned: add it
in all its variants, sizes, and states, under the default theme and both program themes.
