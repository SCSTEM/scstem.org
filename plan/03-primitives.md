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

- [ ] All primitives in the table exist, typed, token-only styling, and render on `/styleguide` in all variants and all three themes.
- [ ] Keyboard test: Dialog (Esc/backdrop close, focus trap via native `<dialog>`), Accordion (Enter/Space), Carousel buttons focusable; icons are `aria-hidden` with text alternatives where needed.
- [ ] Zero client JS shipped for a page using only Button/Card/Badge/Input/Accordion (`dist` inspection).
- [ ] `ui/primitives/README.md` conventions written; `shadcn-astro` skill present and self-consistent.
- [ ] `pnpm check && pnpm build` green.
