---
name: shadcn-astro
description: Port a shadcn/ui component to an Astro primitive in src/components/ui/primitives/. Use when a needed primitive does not exist yet, or when an existing one needs a variant or sub-part that shadcn already defines.
---

# Porting shadcn components to Astro primitives

This site ships **zero client framework runtime** (D3). shadcn is React + Radix, so a port is a
re-implementation, not a copy — but the _design API_ comes across almost verbatim, and should.

## When to use this

A component you need is missing from `src/components/ui/primitives/`. Check first: the primitive
may exist under shadcn's name already.

Do **not** use this to add a variant to an existing primitive — edit its `*.variants.ts`.

## Process

### 1. Read the source

Fetch the component from the shadcn registry:

```
https://ui.shadcn.com/r/styles/default/<name>.json
```

Verify that URL still resolves before relying on it; the registry layout has changed before. If
it is unreachable, work from the documented anatomy on ui.shadcn.com instead — the goal is the
component's structure and variant vocabulary, not its exact source.

Note three things: its **anatomy** (which sub-parts exist and how they nest), its **CVA
variants**, and which behaviors come from **Radix** rather than from CSS.

### 2. Map the behavior down the interactivity ladder

This is the whole job. For each Radix behavior, find the lowest-cost equivalent:

| Radix provides                                     | Astro equivalent                                                                                                              |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Accordion (roving focus, exclusive open)           | `<details>` + the native `name` attribute — see `AccordionItem.astro`                                                         |
| Dialog (focus trap, Esc, inert background, portal) | native `<dialog>` + `showModal()` — see `Dialog.astro`                                                                        |
| Tabs                                               | `:target` or radio inputs, or a ~20-line script over `role="tablist"`                                                         |
| Popover / Dropdown                                 | `:focus-within`, or the popover attribute — **must also work on tap and without JS**, so the trigger needs a real destination |
| Carousel (embla)                                   | CSS scroll-snap track; buttons scroll by one slide — see `Carousel.astro`                                                     |
| Slot / `asChild`                                   | an `as` prop, or infer from props (`Button` renders `<a>` given `href`)                                                       |

If a behavior cannot be reached without a framework, **drop it** and document the omission in
the component's `Props` JSDoc. Do not add a client framework to preserve a nicety.

### 3. Write the component

Follow `src/components/ui/primitives/README.md` — read it before writing. In short:

- CVA recipe in `<Name>.variants.ts`, component in `<Name>.astro`.
- Variant classes copied nearly verbatim from shadcn, with **token names swapped for ours**.
- `class` prop merged through `cn()`, `...rest` spread on the root.
- Local `Props` interface extending `HTMLAttributes<"element">` with `class` omitted.

### 4. Register it on /styleguide

Every variant, size, and state, under the default theme and both program themes. This is not
optional — `/styleguide` is the review artifact.

### 5. Verify

```sh
pnpm check && pnpm build
```

Then keyboard-test it: tab order, Enter/Space/Esc as appropriate, visible focus ring, and the
component still usable with JavaScript disabled.

## Rules

- **No React, Preact, or Radix dependencies. Ever.** Not as a devDependency either.
- **Token names must already exist in `src/styles/global.css`.** If a shadcn class needs a token
  we do not have, stop: propose the addition to `DESIGN.md` via its §11 process and get owner
  review. Do not invent a hex value in a component — raw hex in components is banned (§2).
- **Radii come from the three-value scale** (`radius-sm`/`md`/`lg`). shadcn's `rounded-full` has
  no equivalent here: pill UI is banned (§10). A circled word is a `ChalkOval`.
- **No drop shadows.** shadcn leans on `shadow-*`; this system has no elevation, only inset
  pocket depth (§4). Delete those classes rather than translating them.
- **Minimum touch target 44px** for anything tappable (§9), which is why `Button`'s `md` is
  `h-11` and not shadcn's `h-10`.
- New dependency of any kind ⇒ an ADR in `docs/adr/` first.

## Worked example: Accordion

shadcn's Accordion is Radix `Accordion.Root`/`Item`/`Trigger`/`Content` — a controlled component
with roving focus, `data-state` attributes, and a height animation, plus `type="single"` for
exclusive open.

The Astro port is two files and no JavaScript:

- `Accordion.astro` — a wrapper that takes `name` and passes it to its items.
- `AccordionItem.astro` — `<details name={name}>` with `<summary>` as the trigger.

What maps directly:

- `type="single"` ⇒ the native `name` attribute. Browsers close sibling `<details>` sharing a
  name, which is exactly exclusive-open.
- `data-state="open"` styling ⇒ the `open` attribute, targeted with Tailwind's `group-open:`.
- Trigger keyboard handling ⇒ the browser's, for free.

What is dropped, and why it is fine:

- **Roving arrow-key focus between items.** Native `<summary>` elements are plain tab stops.
  Tab still reaches every item, so nothing is unreachable.
- **The height transition.** Animating `<details>` open height needs `content-visibility`
  tricks or JS. Motion here would be decoration, not confirmation (§6), so it goes.

Both omissions belong in the component's JSDoc, where the next reader will look.
