# Phase 02 — Design system: DESIGN.md, tokens, typography, program themes

**Prerequisites:** Phase 01.
**Branch:** `overhaul/02-design-system` off `astro-rewrite`.
**Gate:** DESIGN.md is reviewed by the owner before Phase 03 begins (post the doc in the PR; iterate there).

## Objective

A written design system (`DESIGN.md`) and its CSS implementation (tokens, fonts, themes). This is where "brand-faithful refresh, genuinely better, no AI feel" gets engineered. The current UI is *good*; the target is *great* — deliberate, specific, and consistent.

## Reference material (in `legacy/`)

- Brand colors: `legacy/src/styles/theme.ts` (hand-authored yellow/green/blue/orange/red/gray scales) and `legacy/src/styles/hero.ts` (HeroUI themes: default dark w/ yellow primary, `bio` green for FRC, `fll` theme).
- Fonts: `legacy/src/styles/fonts.ts` — Inter (sans), Orbitron (headings), Source Code Pro (mono).
- Heading utilities + selection styles: `legacy/src/styles/globals.css`.
- Existing look: run the legacy site (`cd legacy && npm ci && npm run dev`) or browse https://scstem.org for screenshots.

## Tasks

### 1. Write `DESIGN.md` (repo root)

Structure it as the single source of truth agents design against. Required sections:

1. **Brand essence & voice** — who SC2 is (regional STEM nonprofit, FIRST robotics), tone (energetic, credible, community-driven; write for parents, sponsors, and students simultaneously). 3–5 adjectives with "this, not that" contrasts.
2. **Color** — semantic token table (shadcn naming: `background`, `foreground`, `card`, `muted`, `primary`, `secondary`, `accent`, `destructive`, `border`, `ring`, …) with the dark values derived from the legacy palette (yellow `#FACC15`-family primary). Rules: where yellow is allowed (CTAs, accents, focus — never long body text), contrast minimums (WCAG AA at minimum; AAA for body text), and the program accent remapping (`frc` → green, `fll` → FLL palette). Document that light theme is future work: **every color in components must come from a token; raw hex/tailwind palette classes are banned in components.**
3. **Typography** — exact scale. Orbitron for display/headings (define weights and where it stops — e.g. h1–h3 only; overuse of a techno font is the fastest route to "AI slop"), Inter for UI/body, Source Code Pro only where code/numbers demand it. Fluid type via `clamp()`; define the ramp (e.g. 6 steps), line-heights, letter-spacing for Orbitron caps, max line length (`65–75ch`).
4. **Spacing, radius, elevation** — 4px-base spacing scale; radius tokens; shadows/borders for a dark UI (prefer borders + subtle surface shifts over heavy shadows).
5. **Layout** — container widths, section rhythm (consistent vertical padding scale), grid patterns for card grids, breakpoints. Mobile-first: every pattern defined at 360px before desktop.
6. **Motion** — CSS-only. Durations (e.g. 150/250/400ms), easings, what animates (opacity/transform only), scroll behavior, `prefers-reduced-motion` always honored. Principle: fewer, more deliberate animations; nothing moves without a reason.
7. **Imagery & art direction** — real team photography over stock/illustration. Define treatments (duotone/overlay for text-over-photo legibility, consistent corner radius). Explicitly flag the legacy unDraw SVG illustrations for retirement where a photo exists (anti-AI-feel); where kept temporarily, recolor to brand tokens.
8. **Components tone** — buttons (one primary per view), cards, forms (visible labels, no placeholder-as-label), iconography (Tabler, one stroke weight, sizes).
9. **Accessibility** — dark-mode contrast table for token pairs, focus-visible style (high-contrast ring token), touch targets ≥ 44px, skip link, landmark rules.
10. **Do / Don't gallery** — 8–10 concrete pairs (e.g. "Don't: three different yellows on one screen. Do: primary token only.").

Anti-AI-feel checklist to embed: no gradient-on-everything, no emoji-as-icons, no generic hero copy ("Empowering the future of…"), no purple-gradient defaults, consistent icon stroke, real photos of real students, specific numbers over vague claims.

### 2. Implement tokens — `src/styles/global.css`

- Tailwind v4 `@theme` block defining the full token set from DESIGN.md: colors (semantic names → `--color-*` so utilities like `bg-background`, `text-primary` exist), font families, fluid type scale (`--text-*`), spacing/radius additions, `--breakpoint-3xl` (legacy had one).
- `:root { color-scheme: dark; }` on html; body gets `bg-background text-foreground`.
- Program themes (D16): `[data-theme="frc"]` and `[data-theme="fll"]` blocks remapping only the accent-family tokens (`--color-primary`, `--color-ring`, etc.). Adding a future program theme = one new block. Document the pattern in DESIGN.md §2.
- Port/replace heading utilities and `::selection` styling; define `:focus-visible` globally.
- Structure the file so a future light theme is additive: base tokens on `:root`, dark values are the defaults (site is dark-only for now — no media queries needed yet), with a comment marking where `[data-theme="light"]` would land.

### 3. Fonts

- Self-hosted via `@fontsource-variable/inter`, `@fontsource-variable/orbitron`, `@fontsource-variable/source-code-pro` (fall back to static @fontsource package for any without a variable axis). Latin subset only.
- `font-display: swap`; preload the two woff2 files used above the fold (Inter var, Orbitron var) in the base layout (Phase 05 wires the preload — export the font file paths from a small `src/styles/fonts.ts`).

### 4. Sanity page

- `src/pages/styleguide.astro` (temporary skeleton): renders the color tokens as swatches with computed contrast ratios, the type ramp, and spacing scale. Phase 03 extends it with primitives. Must be excluded from sitemap + `noindex` (wire the exclusion when sitemap config exists; leave a `TODO(phase-10)` marker is NOT allowed under the comments policy — instead add the exclusion to the Phase 10 task list, already done).

## Acceptance criteria

- [ ] `DESIGN.md` complete with all 10 sections + do/don't gallery; reviewed by owner in the PR.
- [ ] Every color used in `global.css` is a defined token; `frc`/`fll` themes remap accents only.
- [ ] `/styleguide` renders tokens/type ramp; all body-text token pairs pass AA (shown on the page).
- [ ] Fonts self-hosted, subset, swap; no Google Fonts network requests in dev tools.
- [ ] `pnpm check && pnpm build` green.
