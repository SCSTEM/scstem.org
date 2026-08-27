# Phase 02 — Design system implementation: tokens, typography, program themes

**Prerequisites:** Phase 01. `DESIGN.md` already exists at the repo root — it was authored and owner-reviewed as part of the plan PR, alongside visual mockups. **This phase implements it; it does not redesign.** If implementation exposes a gap or contradiction in DESIGN.md, follow its §11 change process (small PR to the doc, owner review) rather than improvising.

**Branch:** `overhaul/02-design-system` off `astro-rewrite`.

## Objective

`DESIGN.md` turned into working CSS: the full token set, fluid type scale, fonts, program themes, and a `/styleguide` page that proves it (including live contrast verification).

## Reference material

- **`DESIGN.md`** (repo root) — normative. Sections: §2 color tokens + program themes, §3 type scale, §4 spacing/radius/elevation, §6 motion tokens, §9 a11y requirements.
- `legacy/src/styles/theme.ts` — the source palette scales referenced by DESIGN.md §2.
- `legacy/src/styles/globals.css`, `legacy/src/styles/hero.ts` — for tracing where legacy styles came from; not targets.

## Tasks

### 1. Tokens — `src/styles/global.css`

- Tailwind v4 `@theme` block implementing DESIGN.md exactly:
  - Color tokens from §2 as `--color-*` (so `bg-background`, `text-muted-foreground`, `border-border`, etc. exist as utilities).
  - Fluid type scale from §3 as `--text-*` tokens with `clamp()` values and paired line-heights.
  - Radius tokens from §4 (`--radius-sm/md/lg/xl`), `--breakpoint-3xl: 120rem`.
  - Motion tokens from §6 (`--duration-micro/ui/entrance`, easings).
  - Font family tokens (§3) wired to the self-hosted fonts below.
- `:root { color-scheme: dark }`; body `bg-background text-foreground`.
- Program themes (§2): `[data-theme="frc"]` and `[data-theme="fll"]` blocks remapping **only** `--color-primary`, `--color-primary-foreground`, `--color-ring`.
- Global element styles: `::selection` (primary/primary-foreground), `:focus-visible` ring per §9, reduced-motion global kill-switch per §6, heading defaults per §3.
- Structure for the future light theme per D15: base tokens on `:root` with dark values as defaults; a comment marks where a `[data-theme="light"]` block would land.

### 2. Fonts (§3)

- Self-hosted: `@fontsource-variable/inter`, `@fontsource-variable/orbitron`, `@fontsource-variable/source-code-pro`, `@fontsource/architects-daughter` (static @fontsource fallback for any without a variable axis). Latin subset only, `font-display: swap`. Source Code Pro is a first-class working face (stats, spec labels, chips — DESIGN.md §3); Architects Daughter is the annotation hand, markup-only, loaded lazily/subset aggressively since it renders ≤5 words per page.
- `src/styles/fonts.ts` exports the two above-the-fold woff2 paths (Inter var, Orbitron var) for BaseLayout's `<link rel="preload">` (wired in Phase 05).

### 2b. Brand assets

- Copy the official logo assets from `legacy/public/image/svg/` (`logo-color-full.svg`, `logo-color.svg`, plus the black/white variants) into `src/assets/brand/`. These are the only sanctioned marks (DESIGN.md §7): full-width lockup in desktop chrome, square mark in mobile chrome. Never rebuild the logo as inline SVG or set the name in Inter as a lockup substitute.
- Request the **wireframe gear-bulb lineart vector** (and any sibling blueprint drawings) from the t-shirt/merch source files from the owner and add to `src/assets/brand/` — it powers the scribed-lineart motif (DESIGN.md §2.11). Until provided, the drawn approximation from the mockups may stand in, flagged in the PR.

### 3. Signature motifs as utilities/components

Implement DESIGN.md §2 "signature motifs" as reusable pieces so pages can't reinvent them:
- `.accent-rule` (2px primary hairline) + hero-bottom full-bleed variant.
- Key-word emphasis: documented pattern (`<span class="text-primary">` inside headings) — note in styleguide, no component needed.
- Circuit texture: one `Pattern.astro` background component (≤ 4% opacity, `aria-hidden`, positioned behind hero/section-break content only) using the existing pattern asset re-exported to `src/assets/brand/`.
- Framed-media treatment: `.media-frame` utility (2px primary border, `radius-xl`).

### 4. `/styleguide` page

`src/pages/styleguide.astro`: color swatches with **computed contrast ratios** against `background`/`card` (inline calculation at build; DESIGN.md §9 requires body pairs ≥ 7:1, all text ≥ 4.5:1), full type ramp, spacing/radius scales, motif demos, and the same rendered under `data-theme="frc"` and `"fll"`. Noindexed (Seo prop in Phase 05; excluded from sitemap in Phase 10 — both already tasked there).

## Acceptance criteria

- [ ] Every token in DESIGN.md §2–§4/§6 exists in `@theme` with the exact documented value; no extra ad-hoc colors.
- [ ] `/styleguide` renders swatches + ratios; every pair required by §9 passes (build fails or page flags red if not — implement the flag).
- [ ] Theme blocks remap only the three sanctioned tokens (diff-check the CSS).
- [ ] Fonts self-hosted/subset/swap; zero external font requests.
- [ ] Reduced-motion: toggling the OS setting disables entrance/hover transitions on `/styleguide`.
- [ ] `pnpm check && pnpm build` green.
