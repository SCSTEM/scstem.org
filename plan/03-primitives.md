# Phase 03 — UI primitives + shadcn-astro agent skill

**Prerequisites:** Phase 02 (tokens exist).
**Stack layer:** `overhaul/03-primitives`, stacked on `overhaul/02-design-system` (D23).

## Objective

`src/components/ui/primitives/` — low-level, zero-JS-by-default, shadcn-*convention* Astro components — plus the repo agent skill that codifies how to port any shadcn component to Astro later. `src/components/ui/` (composed components) is populated in Phases 05–08 as pages need them; this phase only establishes the primitive layer.

## Conventions (write these into `src/components/ui/primitives/README.md`)

- **API mirrors shadcn**: same component names, `variant`/`size` prop vocabulary, CVA (`class-variance-authority`) for variants, `cn()` from `@/lib/cn` for merging, `class` prop + `...rest` spread onto the root element so callers can extend.
- **Zero JS by default.** Interactivity ladder: (1) native HTML (`<details>`, `<dialog>`, popover attribute), (2) CSS-only, (3) a small inline `<script>` with no dependencies — only when 1–2 can't deliver, and always progressive-enhancement (content readable without JS).
- **Accessibility is part of the primitive**, not the caller's job: focus-visible styles, aria wiring, keyboard behavior.
- Polymorphism where shadcn uses `asChild`: an `as` prop (e.g. Button renders `a` when `href` is passed) — replaces legacy's separate `LinkButton`.
- Types: each primitive exports its `Props` interface extending the appropriate `astroHTML.JSX` element attributes.

## Tasks

### 1. Build the initial primitive set

Only what the site actually needs (verified against legacy usage). For each, follow shadcn's anatomy/naming, styled with Phase 02 tokens:

| Primitive | Notes / replaces |
|---|---|
| `Button` | variants: default/secondary/outline/ghost/link; sizes sm/md/lg/icon; renders `<a>` with `href`. Replaces HeroUI Button, `LinkButton`, `legacy/src/components/shadcn/ui/button.tsx`. |
| `Card` (+ Header/Title/Description/Content/Footer sub-parts as named slots or subcomponents) | Base for FeatureCard/SponsorCard later. |
| `Badge` | sponsor levels, program tags. |
| `Input`, `Textarea`, `Label`, `FieldError` | native elements + token styling; visible labels per DESIGN.md. Replaces `legacy/src/components/forms/fields/*`. |
| `Separator` | |
| `Accordion` | native `<details>/<summary>` + CSS; grouped via `name` attribute for exclusive-open. Replaces HeroUI accordion usage (FAQ). |
| `Dialog` | native `<dialog>` + ~15-line inline script for open/close triggers. Replaces `Modal.tsx` (280 LOC). |
| `Carousel` | CSS scroll-snap track + optional small script for prev/next buttons and dots; touch = native scrolling. Replaces all three legacy carousels (`Carousel`, `ManualCarousel`, `shadcn/ui/carousel`). |
| `Icon` | via `astro-icon` + `@iconify-json/tabler` (build-time inlined SVG, zero runtime). Replaces `@tabler/icons-react`/`lucide-react`. |
| `Skeleton`/`Spinner` | only if a page needs one (calendar loading state does). |

Dependencies added this phase: `class-variance-authority`, `astro-icon`, `@iconify-json/tabler`. Nothing else.

### 2. Extend `/styleguide`

Every primitive rendered in all variants/sizes/states (hover/focus/disabled shown via a class toggle), on both default and `data-theme="frc"`/`"fll"` sections. This page is the visual-review artifact for the Phase 06 gate.

### 3. Create `.claude/skills/shadcn-astro/SKILL.md`

An agent skill for "add/port a shadcn component as an Astro primitive". Contents:

- **When to use**: a needed primitive doesn't exist in `ui/primitives/`.
- **Process**: fetch the component's source from the shadcn registry (`https://ui.shadcn.com/r/styles/default/<name>.json` — verify current registry URL at time of use); read its anatomy, variants, and Radix behavior; re-implement per the conventions README (link it): CVA variants copied nearly verbatim, tokens already align (shadcn naming), Radix behavior mapped down the interactivity ladder (native element → CSS → small script). Document any intentionally dropped behavior in the component's Props JSDoc.
- **Rules**: no React/Radix dependencies ever; token names must already exist in `global.css` (if not, stop and propose a DESIGN.md addition); register the new primitive on `/styleguide`; run `pnpm check`.
- Include one worked example in the skill (e.g. the Accordion mapping: Radix Accordion → `<details name>`).

## Acceptance criteria

- [x] All primitives in the table exist, typed, token-only styling, and render on `/styleguide` in all variants and all three themes.
- [x] Keyboard test: Dialog opens and closes on Esc (asserted against the live page: `dialog.open` true after the trigger, false after Escape); Accordion is native `<details>`, so Enter/Space are the browser's; Carousel buttons focusable; icons are `aria-hidden` with text alternatives where needed. **Met by a different mechanism — see "Carousel arrows are not tab stops" below.**
- [x] Zero client JS for a page using only Button/Card/Badge/Input/Accordion — verified by building such a page: 0 `<script>` tags, 0 `.js` files in `dist`. The whole styleguide, Dialog and Carousel included, ships 835 bytes of inlined script.
- [x] `ui/primitives/README.md` conventions written; `shadcn-astro` skill present and self-consistent.
- [x] `pnpm check && pnpm build` green.

### Two real bugs this phase surfaced

Both were silent, and both would have spread through every page had they not been caught here.

1. **`cn()` was dropping font sizes.** Tailwind builds `text-*` utilities from two namespaces
   (`--text-*` sizes, `--color-*` colors), and the merge step only recognizes Tailwind's stock
   scale — so it treated all `text-*` classes as one conflict group and kept only the last.
   `cn("text-primary-foreground", "text-body")` collapsed to `text-body`, rendering every
   primary button's label in body gray on Safety Yellow: **1.3:1**, measured in the browser.
   `@/lib/cn` is now a configured merge that registers the §3 type scale as the font-size group;
   the same buttons now measure 11.7:1, and `cn("text-small", "text-muted")` keeps both classes.
2. **`text-body` is a color, not a size** (§3's note, added in Phase 02): `body` names both, and
   Tailwind resolves colors first. Sizes now go through `text-copy`; Button, Input, and Textarea
   were using `text-body` for size and silently getting none.

### Deviations from this brief

- **`cn` comes from `@/lib/cn`, not `cnfast` directly.** Phase 01 correctly deleted `src/lib/cn.ts`
  when it was a bare `export { cn } from "cnfast"` — there was nothing there. This phase needs a
  *configured* merge, and `cnfast` exposes no global configuration hook: `cn` is the unconfigured
  default and `createCn(config)` returns a new function, so the configuration has to live in a
  module that components import. The file is back for that reason alone, and its docstring says so.
  Without it, `cn("text-primary-foreground", "text-copy")` collapses to one class and every primary
  button's label renders at about 1.3:1 — the bug recorded below. D7's intent (one sanctioned source
  for `cn`, no `clsx`/`tailwind-merge` sprawl) is unchanged; the source is this module, which wraps
  the package.

- **Icons come from `@tabler/icons`**, inlined at build (ADR 0002), not `astro-icon` +
  `@iconify-json/tabler`. Two fewer dependencies; icon names are Tabler's own. The package's
  `exports` map rewrites every subpath including `package.json`, so `src/lib/icon.ts` locates the
  icons directory through a known icon file instead of the manifest.
- **CVA recipes live in sibling `*.variants.ts` files**, because Astro forbids exporting values
  from a component (`astro/no-exports-from-components`). This is also what lets one component
  reuse another's recipe. Documented as a convention in the README and the skill.
- **Card sub-parts are separate components** (`CardHeader`, `CardTitle`, …) rather than named
  slots, matching shadcn's composition model.
- **`Skeleton` is included** (the calendar's loading state needs it in Phase 07); no `Spinner`,
  since nothing in the site has a use for one.
- **Carousel arrows are not tab stops.** The brief's keyboard criterion asks for focusable arrow
  buttons with `aria-hidden` icons. Instead the arrows are `aria-hidden="true" tabindex="-1"` and
  the track itself is the tab stop: `role="region"` with an accessible name and `tabindex="0"`,
  scrolled with the arrow keys. Two focusable controls that only duplicate what the arrow keys
  already do on the focused track are noise for a keyboard user, and every slide is in the DOM and
  reachable by tab regardless. The criterion is met in substance — keyboard-operable, icons hidden
  — by a different mechanism, which is why it is recorded here rather than rewritten in place.
- **`no-noninteractive-tabindex` allows `role="region"`.** That pattern is the reason above; an
  `overflow` container is not focusable by default, so without `tabindex="0"` its content is
  keyboard-unreachable (WCAG 2.2 SC 2.1.1). The rule ships allowing only `tabpanel`. Scoped to
  that one extra role in `eslint.config.ts`.
- **`Field.variants.ts` is shared by `Input` and `Textarea`.** They differ only in height versus
  vertical padding, so the invalid/disabled/transition treatment has one definition — the reuse
  the sibling-variants convention exists for, and what a `Select` will compose in a later phase.
- **`Button` gained a `pocket` variant.** Carousel arrows and the Dialog close were hand-built
  icon buttons; the Dialog's came out at `p-1`, below the 44px minimum the shared recipe exists to
  enforce. Both now compose `Button`, so touch target and focus behavior have one owner.
- **`tools/checks/cn-font-size-group.mjs` guards the font-size group.** The `cn` bug below was
  found by measuring contrast in a browser, and a comment was the only thing stopping the next
  `--text-*` token from reintroducing it. `pnpm check` now fails on divergence in either
  direction.
