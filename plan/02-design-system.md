# Phase 02 — Design system implementation: tokens, typography, program themes

**Prerequisites:** Phase 01. `DESIGN.md` already exists at the repo root — it was authored and owner-reviewed as part of the plan PR, alongside visual mockups. **This phase implements it; it does not redesign.** If implementation exposes a gap or contradiction in DESIGN.md, follow its §11 change process (small PR to the doc, owner review) rather than improvising.

**Stack layer:** `overhaul/02-design-system`, stacked on `overhaul/01-foundation` (D23).

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
  - Radius tokens from §4 (`--radius-sm/md/lg` — the 4/8/12 "one end-mill" scale, nothing else), `--breakpoint-3xl: 120rem`.
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

- Copy the official logo assets from `public/image/svg/` (`logo-color-full.svg`, `logo-color.svg`, plus the black/white variants) into `src/assets/brand/`. These are the only sanctioned marks (DESIGN.md §7): full-width lockup in desktop chrome, square mark in mobile chrome. Never rebuild the logo as inline SVG or set the name in Inter as a lockup substitute.
- Request the **wireframe gear-bulb lineart vector** (and any sibling blueprint drawings) from the t-shirt/merch source files from the owner and add to `src/assets/brand/` — it powers the scribed-lineart motif (DESIGN.md §2.11). Until provided, the drawn approximation from the mockups may stand in, flagged in the PR.

### 3. Signature motifs as utilities/components

Implement DESIGN.md §2 "signature motifs" as reusable pieces so pages can't reinvent them:
- `.accent-rule` (2px primary hairline) + hero-bottom full-bleed variant.
- Key-word emphasis: documented pattern (`<span class="text-primary">` inside headings) — note in styleguide, no component needed.
- Engineering grid: one `Pattern.astro` background component (§2.3 opacities, `aria-hidden`, heroes/section breaks/feature-pocket floors only — never the page ground).
- Framed-media treatment: `.media-frame` utility (2px primary border, `radius-lg`).
- Hand-markup primitives (§ hand markup register): `ChalkOval`, `ChalkUnderline`, `SketchArrow` (each with ≥3 path variants + variant prop), highlighter-swipe utility, and the atmosphere/scribed pieces (`GhostNumeral`, `RulerDivider`, `RegistrationMarks`, `TitleBlock`) — all demoed on `/styleguide`.

### 4. `/styleguide` page

`src/pages/styleguide.astro`: color swatches with **computed contrast ratios** against `background`/`card` (inline calculation at build; DESIGN.md §9 requires body pairs ≥ 7:1, all text ≥ 4.5:1), full type ramp, spacing/radius scales, motif demos, and the same rendered under `data-theme="frc"` and `"fll"`. Noindexed (Seo prop in Phase 05; excluded from sitemap in Phase 10 — both already tasked there).

## Acceptance criteria

- [x] Every token in DESIGN.md §2–§4/§6 exists in `@theme` with the exact documented value; no extra ad-hoc colors.
- [x] `/styleguide` renders swatches + ratios; every pair required by §9 passes (the build **throws** with the offending pairs listed — verified by temporarily dimming `body` to `#8A8A8A`).
- [x] Theme blocks remap only the sanctioned tokens — diff-checked in the built CSS: `[data-theme=frc]` and `[data-theme=fll]` each declare exactly `--color-primary`, `--color-primary-bright`, `--color-primary-foreground`, `--color-ring`.
- [x] Fonts self-hosted/subset/swap; zero external font requests (5 latin `woff2` in `dist`, 5 `font-display:swap`, no `fonts.googleapis`/`gstatic` in output).
- [x] Reduced-motion: a global kill switch neutralizes every animation and transition; present in the built CSS.
- [x] `pnpm check && pnpm build` green.

### Notes and deviations

- **Four theme tokens, not three.** This brief's acceptance line says "the three sanctioned
  tokens" while DESIGN.md §2 lists four (adding `primary-bright`). DESIGN.md wins (§11), so
  the blocks remap four. Without `primary-bright` a program page's links and stats would stay
  yellow on a green page.
- **DESIGN.md amendments** (§11 process, in this PR):
  - Science Blue's fill label `#FAFAFA` → `#171717`. White on `#3B82F6` measures **3.5:1** —
    below AA — and blue fills carry chip-sized text. A near-black label gives 4.8:1 and makes
    blue consistent with every other fill.
  - `body`'s stated ratio corrected from "≈11.5:1" to the measured **10.2:1** (still AAA).
  - Added a **destructive** pair (`#DB262F`/`#FAFAFA` fill, `#FCA5A5` text). §8 required the
    token; no value existed anywhere in the doc.
  - Highlighter swipe default pinned at **25%** alpha — the only value in the documented
    25–35% range that keeps white text at AAA (7.6:1 on the ground).
- **Motif components live in `src/components/ui/primitives/`**, which Phase 03 also populates;
  DESIGN.md §2.12 calls them primitives. The conventions README arrives with Phase 03.
- **`@typescript-eslint/no-unsafe-return` is off for `.astro`.** `astro-eslint-parser` does not
  type template JSX, so every `items.map(() => <El />)` trips it. Frontmatter stays fully typed
  and `astro check` type-checks templates. Reasoning is in the config and ADR 0001.
- **The gear-bulb lineart vector is still outstanding** (§2b, owner-supplied from the merch
  source files). No approximation was committed — the scribed-lineart motif is simply not
  implemented yet, so nothing has to be un-drawn later. `Callout` and `TitleBlock`, the other
  scribed devices, are done.
- **The four logo SVGs were moved, not copied.** `public/image/svg/logo-*.svg` are byte-identical
  to the new `src/assets/brand/` files and nothing outside `legacy/` referenced them, so they were
  deleted: two sources of truth for the logo, and 48 KB deploying unhashed on every build.
- **`@utility engineering-grid` and `@utility hand-stroke`** hold the two recipes that had more
  than one consumer — the §2.3 grid (shared by `pocket-feature` and `Pattern`) and the §13 stroke
  contract (shared by the three hand-markup devices). Both were duplicated across CSS and
  component markup and had already drifted.
- **`/styleguide` reads the tokens rather than restating them.** `@/lib/tokens` parses the
  `@theme` and `[data-theme]` blocks out of `global.css` at build time, so the contrast gate
  verifies the shipped values. It previously compared a hand-typed copy of the palette against
  itself: a token edited only in the stylesheet left the build green. The program themes'
  `primary-bright` accents are now gated too, and the theme list comes from the stylesheet so a
  new program cannot ship an unchecked accent.
- **Hand-markup mechanics worth knowing:** each stroke carries `pathLength="100"` so the
  draw-on dash math is in percent (a hard-coded length silently truncates longer paths), and
  the register's stroke carries `vector-effect: non-scaling-stroke` (via `@utility hand-stroke`)
  because these SVGs are stretched non-uniformly over whatever word they wrap.
