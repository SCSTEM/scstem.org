# SC2 Design System

Source of truth for the visual design of scstem.org. Every UI decision an implementer makes should be answerable from this document; if it isn't, propose an addition here first (PR + owner review), then build.

The system is a **brand-faithful refresh** of the 2024–2026 site: same identity — dark, electric-yellow, gear-and-bulb, circuit texture, real photos of real students — with the execution tightened. The bar is *great, not just good*: fewer competing treatments, stronger hierarchy, deliberate everything.

## 1. Brand essence & voice

South Central STEM Collective (SC2) is a 501(c)(3) making hands-on STEM — FIRST robotics first among it — accessible to students aged 9–18 in and around Franklin County, PA. The site speaks to three audiences at once: **students** (this looks fun and serious), **parents** (this is safe, organized, worth our time), **sponsors** (this is a credible investment in the community).

Voice: **energetic, concrete, community-proud.**
- This, not that: *workshop*, not *startup*. *Confident*, not *hype*. *Specific* ("12+ years, 9 competition robots"), not *vague* ("empowering the future"). *Warm*, not *corporate*.
- Sentence case everywhere — headings, buttons, nav. No Title Case, no ALL CAPS except tiny eyebrow labels.
- First person plural ("we build", "join us"); address the reader as "you".
- Numbers beat adjectives. Real names, real seasons, real awards (with permission).

## 2. Color

Dark-only for now (D15). All component color comes from **semantic tokens** — raw hex values and Tailwind palette classes (`bg-yellow-400`, `text-neutral-300`) are banned in components. Tokens live in `src/styles/global.css` `@theme`; a future light theme or theme switcher is a new token block, not a refactor.

### Base tokens (default / SC2 yellow theme)

| Token | Value | Use |
|---|---|---|
| `background` | `#161616` | Page ground |
| `card` | `#1E1E1E` | Cards, panels, form fields |
| `card-raised` | `#262626` | Nested surfaces, hover lift |
| `border` | `#2F2F2F` | Hairlines, card borders, dividers |
| `foreground` | `#EDEDED` | Body text, headings |
| `muted-foreground` | `#A3A3A3` | Secondary text, captions, meta |
| `primary` | `#FACC15` | CTAs, accents, focus, key-word emphasis |
| `primary-foreground` | `#171717` | Text/icons on primary |
| `secondary` | `#3B82F6` | Rare second accent (informational chips, FLL card icon) |
| `success` / `warning` / `destructive` | `#46C769` / `#FB9F4F` / `#FF6B64` | Form + status states only (brightened 400-steps of the legacy scales for dark-bg contrast) |
| `ring` | `#FACC15` | Focus ring |

Legacy full scales (yellow/green/blue/orange/red from `legacy/src/styles/theme.ts`) are the source palette; only the tokens above are exposed to components. The logo mark's fixed colors (gray gear `#4B5563`, yellow bulb) are brand-asset colors, exempt from the token rule like any other image.

### Program themes (D16)

`data-theme="frc"` / `data-theme="fll"` on the page root remap **only** `primary`, `primary-foreground`, and `ring`. Everything else is identical — program pages feel like the same site wearing team colors.

| Theme | `primary` | `primary-foreground` | Notes |
|---|---|---|---|
| default (SC2) | `#FACC15` yellow | `#171717` | |
| `frc` (Biohazard) | `#3ECF6E` green (brightened from brand `#16A34A` for dark-bg contrast; the deep green stays in imagery/logos) | `#08240F` | |
| `fll` | `#FB923C` orange | `#241102` | |

Rules:
- **One accent per view.** The page's `primary` does accent work; `secondary` blue appears only where meaning demands a second hue. The legacy mix (yellow CTA + blue links + orange button on one page) is retired.
- Accent-colored text is allowed only at ≥ AA contrast on `background` (all three primaries above pass; verify on `/styleguide`).
- Long body text is never accent-colored, never pure white — `foreground` only.
- `muted-foreground` is the floor: nothing text-bearing goes dimmer.

### Signature motifs (the brand carry-overs — keep, but disciplined)

1. **Key-word emphasis**: display headings may color exactly one phrase in `primary` ("Robots are in Franklin County. **So are we.**"). One treatment only — colored text; no underlines/highlighter marks in headings (underlines belong to links).
2. **Accent hairline**: heroes end with a 2px `primary` rule, full-bleed. Card titles may carry a 32px × 2px `primary` rule beneath (FeatureCard motif).
3. **Circuit texture**: the circuit-board pattern survives as a *quiet* signature — max ~4% opacity, on heroes and section breaks only, never behind body copy, never competing with photos.
4. **Framed media**: photo collages/feature media get a 2px `primary` border + `radius-lg` — the "team picture frame" from the legacy home/FRC pages.

## 3. Typography

| Role | Font | Weights | Where |
|---|---|---|---|
| Display/headings | **Orbitron** (variable) | 500–700 | h1–h3, stat numerals, eyebrow labels. Never below h3 size, never italic, never long lines (≤ ~40 chars) — Orbitron is the brand's voice, and it shouts; ration it. |
| UI & body | **Inter** (variable) | 400/500/600 | Everything else: body, h4–h6, nav, buttons, forms, captions |
| Mono | **Source Code Pro** | 400/600 | Tabular numbers (countdowns), code-ish accents only |

Fluid scale (clamp between 360px and 1440px viewports), defined as tokens:

| Token | Size (min → max) | Line height | Font |
|---|---|---|---|
| `display` | 2.5rem → 4.25rem | 1.05 | Orbitron 700 |
| `h1` | 2rem → 3rem | 1.1 | Orbitron 700 |
| `h2` | 1.5rem → 2.25rem | 1.15 | Orbitron 600 |
| `h3` | 1.25rem → 1.5rem | 1.25 | Orbitron 600 |
| `h4` | 1.125rem → 1.25rem | 1.35 | Inter 600 |
| `body-lg` | 1.0625rem → 1.1875rem | 1.65 | Inter 400 (intro paragraphs, hero subheads) |
| `body` | 1rem → 1.0625rem | 1.65 | Inter 400 |
| `small` | 0.875rem | 1.5 | Inter 400/500 (captions, meta, badges) |

- Eyebrow labels: `small`, Orbitron 500, uppercase, `+0.08em` tracking, `muted-foreground` or `primary` — the only sanctioned all-caps.
- Prose measure: 65–75ch (`max-w-prose`). The about page's full-width text walls are retired.
- Headings: sentence case; one `h1` per page; no skipped levels.

## 4. Spacing, radius, elevation

- **Spacing**: 4px base scale (Tailwind default). Component-internal spacing 8–24px; between-component 24–48px.
- **Section rhythm**: vertical padding `py-16` (mobile) / `py-24` (≥ md). Consistent on every section — the current uneven gaps are a bug, not a style.
- **Radius tokens**: `radius-sm` 6px (badges, inputs), `radius-md` 8px (buttons), `radius-lg` 12px (cards), `radius-xl` 16px (framed media, heroes' inner panels). Nothing fully-pill except avatar-like elements; the legacy pill CTA becomes `radius-md`.
- **Elevation**: borders over shadows (dark UI). Resting card: `card` bg + 1px `border`. Hover (interactive cards only): bg → `card-raised`, border → 40%-alpha `primary`, translate-y -2px. No glows, no colored drop shadows.

## 5. Layout

- Container: `max-w-6xl` (72rem) + `px-4` / `px-6` (≥ sm). Heroes and accent rules full-bleed; content aligned to container.
- Grids: card grids are 1-col (mobile) / 2-col (≥ md) / 3-col (≥ lg). **No orphan rows**: design content to fill (5 cards → 2+3 intentional split or a 5-col feature treatment at lg, never a centered floater).
- Breakpoints: Tailwind defaults + `3xl` = 120rem (legacy carry-over). Design mobile-first at 360px; every pattern must be specified at 360px before desktop.
- The about page moves from the 3-column photo-rail layout to a single flowing column (prose measure) with photo groupings as full-width interleaved sections (timeline treatment).

## 6. Motion

CSS-only (D3, D20). Motion confirms — it never decorates.

- Durations: 150ms (hover/focus micro), 250ms (menus, accordions), 500ms (scroll-in entrances). Easing: `ease-out` for entrances, `ease-in-out` for state toggles.
- Only `opacity` and `transform` animate.
- Scroll entrances: single fade-up (8px), once, on section children; CSS scroll-driven animations with graceful no-support fallback (content visible by default — animation is enhancement).
- Hero video: `preload="none"`, poster-first, plays when in-view; `prefers-reduced-motion` disables video autoplay and all entrances (instant states). No parallax anywhere (retires `react-scroll-parallax`).
- Carousels: CSS scroll-snap; user-driven; no autoplay except the sponsor strip's slow marquee — pausable on hover/focus and disabled under reduced-motion.

## 7. Imagery & art direction

- **Real photos of real students and robots** are the brand. Stock imagery and the legacy unDraw illustrations are retired wherever a photo can serve (recolor to token colors in the interim if one must stay).
- Text over photos requires a scrim: gradient from `background` (100% at text edge → 20% opposite), plus, on mobile, prefer text on solid `background` below the photo instead of overlaid. The legacy mobile hero (thin scrim, low contrast) is the canonical anti-example.
- Photo treatment: `radius-xl` when framed inside sections; full-bleed only in heroes. Consistent warm/neutral grading — no filters wars between adjacent photos.
- Every image: honest `alt`; decorative pattern images `alt=""` + `aria-hidden`.
- OG images (1200×630): photo + scrim + Orbitron title + logo, one template, per-section variants.

## 8. Components tone

- **Buttons**: variants `primary` (filled `primary`/`primary-foreground`), `outline` (1px `border`, `foreground` text, hover border-primary; over photography it gains a translucent `card` background for legibility), `ghost` (nav/tertiary). One `primary` button per view region. Min touch target 44×44px. Icon+label spacing 8px.
- **Links**: in-prose links are `primary`-colored **and underlined**; UI links (cards, nav) may drop underline at rest but must underline on hover/focus. External links get the external icon at 0.8em + `rel="noopener"`.
- **Cards**: FeatureCard = icon in a `radius-sm` accent-tinted square (12% alpha `primary` bg, `primary` icon), `h4` title with the 32px accent rule, `body` copy, optional footer link. Sponsor card = logo on `card` bg (padded, contain), name, tier badge, "since YYYY" meta, external link icon.
- **Tier badges**: outline style, `small` weight-500 — platinum `#CBD5E1`, gold `#FACC15`, silver `#A3A3A3`, bronze `#D08954`; text = badge color, 1px border same color at 40% alpha, transparent bg. (Retires the muddy filled pills.)
- **Forms**: visible `Label` above every field (no placeholder-as-label); `card` bg inputs with 1px `border`, focus = `ring` 2px; errors in `destructive` with icon + text, tied via `aria-describedby`.
- **Icons**: Tabler, outline style, 2px stroke, sizes 20/24/32. Icons always accompany text or carry `aria-label`. No emoji as UI.
- **Stat band** (FRC page motif, generalizable): Orbitron numeral (`h2` size, `primary`) + Inter label; on `card` panel with accent hairline top.

## 9. Accessibility

- WCAG 2.2 AA minimum everywhere; body text targets AAA (≥ 7:1). Contrast pairs verified live on `/styleguide` (computed ratios rendered next to swatches); the token values above were chosen to pass — changes must re-verify.
- Focus: 2px `ring` outline + 2px offset on every interactive element, never removed, high-visibility on dark.
- Keyboard: everything operable; skip link first in DOM; `aria-current="page"` in nav; disclosure menus close on Esc.
- Landmarks: one `header`/`main`/`footer`; labeled `nav`s; headings form an outline.
- Touch targets ≥ 44px; hover-only affordances forbidden (what hovers must also focus).
- `prefers-reduced-motion` honored globally (see §6); `color-scheme: dark` declared so native controls match.

## 10. Do / Don't

| Don't (seen in legacy) | Do |
|---|---|
| Yellow words, yellow underlines, and blue links competing in one viewport | One accent treatment per view: `primary` key-word in the heading, `primary` CTA, done |
| Orange "Join the Revolution" button on the green FRC page | The page theme's `primary` button — Biohazard green |
| Hero copy on a busy photo behind a thin scrim (mobile home) | Scrim recipe from §7, or text on solid ground below the photo |
| Circuit pattern behind paragraphs | Pattern on heroes/section breaks at ≤ 4% opacity only |
| 5 cards centered as 3+2 with a floating orphan | Grid math planned: 2+3 split, or redesign to 4/6 |
| `"Biohazard" - 2013` caption strips down page margins | Timeline section with framed, captioned photos in flow |
| Orbitron paragraphs / tiny Orbitron labels everywhere | Orbitron = h1–h3, stats, eyebrows; Inter for the rest |
| Filled dark-on-dark tier pills (navy "Platinum") | Outline tier badges per §8 |
| Grayscale washed-out footer logo | Full-color logo on `background`, `muted-foreground` text |
| Title Case Buttons And Headings | Sentence case |
| `alt="image"` / missing alt | Descriptive alt or explicit `alt=""` |
| Generic hero copy ("Empowering the future…") | Specific, local, human ("Robots are in Franklin County. So are we.") |

## 11. Change process

DESIGN.md changes ship as PRs with a rendered before/after (screenshot or `/styleguide` diff) and owner review. Implementation follows the doc — when code and doc disagree, the doc wins; when the doc is silent, add to it before building.
