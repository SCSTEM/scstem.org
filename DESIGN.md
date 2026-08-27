# SC2 Design System

Source of truth for the visual design of scstem.org. Every UI decision an implementer makes should be answerable from this document; if it isn't, propose an addition here first (PR + owner review), then build.

The system is a **brand-faithful refresh** of the 2024–2026 site, grounded in the official **Brand Guidelines v1** (colors, fonts, logo, and naming rules below are normative from that document) and settled through an owner design review in 2026-08. The organizing metaphor is the **build document**: the page is a machined surface, cards are pockets cut into it, the texture is engineering graph paper, and data speaks in a monospaced spec-sheet voice. The bar is *great, not just good*: fewer competing treatments, stronger hierarchy, deliberate everything.

## 1. Brand essence, voice, and naming

South Central STEM Collective (SC2) is a 501(c)(3) making hands-on STEM — FIRST robotics first among it — accessible to students aged 9–18 in and around Franklin County, PA. The site speaks to three audiences at once: **students** (this looks fun and serious), **parents** (this is safe, organized, worth our time), **sponsors** (this is a credible investment in the community).

Voice: **energetic, concrete, community-proud.**
- This, not that: *workshop*, not *startup*. *Confident*, not *hype*. *Specific* ("12+ years, 9 competition robots"), not *vague* ("empowering the future"). *Warm*, not *corporate*.
- Sentence case everywhere — headings, buttons, nav. Title Case only for proper nouns. No ALL CAPS except eyebrow labels and SCP spec labels (§3).
- First person plural ("we build", "join us"); address the reader as "you".
- Numbers beat adjectives. Real names, real seasons, real awards (with permission).

**Name usage (from Brand Guidelines):** full name "South Central STEM Collective" with capitalized *STEM*; may break to two lines after "Central". Short name "SC2" (capitalized SC) — **never in headings**, and never on a page where the full name isn't present elsewhere. "SCSTEM" only for domains/handles, never in prose.

## 2. Color

Dark-only for now (D15). All component color comes from **semantic tokens** — raw hex values and Tailwind palette classes are banned in components (the logo mark's fixed colors are brand-asset colors, exempt like any other image). Tokens live in `src/styles/global.css` `@theme`; a future light theme is a new token block, not a refactor.

### Brand palette (normative, Brand Guidelines v1)

Safety Yellow `#FACC15` · Science Blue `#3B82F6` · Foundation Gray `#4B5563` · Black `#171717` · White `#FAFAFA` · Hazard Green `#16A34A` · Danger Orange `#F97316` · Background Black `#262626`.

### Surfaces — the recessed system

The page is the raised material; cards are **pockets machined into it**. (This is the *opposite* of the default elevated-lighter-card dark UI — deliberately.)

| Token | Value | Use |
|---|---|---|
| `background` | `#262626` | Page ground (brand Background Black) |
| `card` | `#171717` | Pockets: cards, panels, form fields, footer band (brand Black) |
| `section-tint` | `#212121` | Full-width alternate section bands |
| `border` | `#3A3A3A` | Hairlines, card borders, dividers |

**Pocket anatomy (V2, "machined pocket")** — the standard card treatment: `card` fill, 1px `#383838` border, `radius-lg`, and inset edge physics: `box-shadow: inset 0 2px 8px rgb(0 0 0 / 0.55), inset 0 -1px 0 rgb(255 255 255 / 0.05)`.
**Feature pocket (V2+V3, "drawing pocket")**: the same, plus the engineering grid (§2 motifs) rendered *inside* the pocket at ~5% opacity — reserved for feature moments (program cards, CTA panels, stat bands) on ≥ md screens; dense card grids and mobile stay plain V2.
**Hover (interactive pockets)**: pockets don't float — border warms to 40%-alpha `primary`, floor lifts `#171717 → #1A1A1A`, no translate, no glow, no shadow change.

### Text

| Token | Value | Contrast on `#262626` | Use |
|---|---|---|---|
| `foreground` | `#FAFAFA` | ≈14.5:1 (AAA) | Headings, nav, emphasis (brand White) |
| `body` | `#D4D4D4` | ≈11.5:1 (AAA) | **All reading copy** |
| `muted` | `#A3A3A3` | ≈6.0:1 (AA) | Captions, meta, labels only — never paragraphs |

Rule: **AAA (≥7:1) for anything longer than a caption.** `muted` is the floor; nothing text-bearing goes dimmer.

### Accents — the fill-vs-text law

Every brand accent is a **token pair**: the brand hex for *fills* (buttons, bands, chips, large graphics — with a near-black label), and a brightened variant for *text/icons/focus on dark* (the brand hexes other than yellow fail AA as dark-bg text). No exceptions, no third variants.

| Accent | Fill (brand hex / label color) | Text-on-dark (≈ contrast) | Role |
|---|---|---|---|
| Safety Yellow | `#FACC15` / `#171717` | `#FACC15` (9.9:1 — bright enough to be both) | **Action**: CTAs, links, focus ring, key-word emphasis. The default `primary`. |
| Science Blue | `#3B82F6` / `#FAFAFA` | `#60A5FA` (6.0:1) | **Informational**: info callouts, calendar/event chips, data UI. Also the **designated primary of a future light theme** (yellow is illegible on white) — do not repurpose. |
| Hazard Green | `#16A34A` / `#08240F` | `#3ECF6E` (7.4:1) | FRC/Biohazard theme accent pair |
| Danger Orange | `#F97316` / `#241102` | `#FB923C` (8.0:1) | FLL theme accent pair |

### Program themes (D16)

`data-theme="frc"` / `data-theme="fll"` on the page root remap **only** `primary`, `primary-bright`, `primary-foreground`, and `ring` to the program's accent pair. Everything else is identical — program pages are the same site wearing team colors. Adding a program = one token block.

Rules:
- **One action accent per view** (the theme's `primary`). Blue may appear alongside it only in its informational role. The legacy mix (yellow CTA + blue links + orange button on one page) stays dead.
- Long body text is never accent-colored, never pure white — `body` token only.
- Foundation Gray `#4B5563` lives in the logo and imagery; it is not a UI token.

### Signature motifs

1. **Key-word emphasis**: display headings may color exactly one phrase in `primary` ("Robots are in Franklin County. **So are we.**"). Colored text only — no underlines/highlighter marks in headings.
2. **Accent hairline**: heroes end with a 2px `primary` rule, full-bleed. Card titles may carry a 32px × 2px `primary` rule beneath.
3. **Engineering grid** (replaces the legacy circuit-board texture): fine graph-paper grid (~24–28px cell, 1px `#FAFAFA` strokes) at 4–7% opacity, on heroes and section breaks — never behind body copy. Optional **dimension-line ticks** (measure lines with arrowheads, `primary` at ≤50% opacity, SCP annotation) as rare garnish on heroes/section dividers. Inside feature pockets per the V2+V3 spec above.
4. **Framed media**: photo collages/feature media get a 2px `primary` border + `radius-xl` — the "team picture frame".

### Atmosphere layer

Large unmodulated `background` fields read sterile. Between the hero and the footer, every major section boundary carries **exactly one** of these devices (never stacked, never behind photos):

5. **Ambient pools**: one radial gradient anchored to a section's top or its heading — `primary` at 2–4% alpha (or `#FAFAFA` at ~2% for neutral sections), fading to transparent by ~70%. A ±2-lightness modulation of the ground; text contrast is unaffected. Max one per section.
6. **Ghost section numerals**: oversized Source Code Pro 600 numerals (`01`, `02`, …) at 3–5% alpha `foreground`, placed behind section headings — the device from the Brand Guidelines' own section pages. Decorative (`aria-hidden`), numbering only top-level page sections, 3–4 per page max.
7. **Ruler dividers**: a full-container tick-mark strip (baseline + graduated ticks, `foreground` at ≤12%) as the *strong* section divider; plain 1px hairlines remain the quiet default.

Restraint rule: these are atmosphere, not decoration — if a device is noticeable before the content is, it's too loud. `section-tint` bands (§2 surfaces) count as a device for their boundary.

## 3. Typography

Per Brand Guidelines: Orbitron for page headings/titles (avoid very long or small lines), Inter for body/subheadings, Source Code Pro for monospaced/stylistic elements.

| Role | Font | Weights | Where |
|---|---|---|---|
| Display/headings | **Orbitron** (variable) | 500–700 | h1–h3 and eyebrow labels only. Never below h3 size, never italic, never long lines (≤ ~40 chars/line) — ration the display voice. |
| UI & body | **Inter** (variable) | 400/500/600 | Everything else: body, h4–h6, nav, buttons, forms, captions |
| Data voice | **Source Code Pro** | 400/600 | **Stats and numerals, countdowns, dates, spec labels** (ages chips, tier badges, "REF" annotations). The spec-sheet register of the build-document metaphor. |

Fluid scale (clamp between 360px and 1440px viewports), defined as tokens:

| Token | Size (min → max) | Line height | Font |
|---|---|---|---|
| `display` | 2.5rem → 4.25rem | 1.05 | Orbitron 700 |
| `h1` | 2rem → 3rem | 1.1 | Orbitron 700 |
| `h2` | 1.5rem → 2.25rem | 1.15 | Orbitron 600 |
| `h3` | 1.25rem → 1.5rem | 1.25 | Orbitron 600 |
| `h4` | 1.125rem → 1.25rem | 1.35 | Inter 600 |
| `stat` | 1.75rem → 2.25rem | 1.1 | Source Code Pro 600, `primary` |
| `body-lg` | 1.0625rem → 1.1875rem | 1.65 | Inter 400 |
| `body` | 1rem → 1.0625rem | 1.65 | Inter 400 |
| `small` | 0.875rem | 1.5 | Inter 400/500 |
| `label` | 0.6875–0.75rem | 1.4 | Source Code Pro 600, +0.05em tracking, uppercase (spec labels/chips) |

- Eyebrow labels: Orbitron 500, 12px, uppercase, `+0.08em` tracking, `primary` or `muted` — Orbitron's one all-caps use; SCP `label` is the other sanctioned caps.
- Prose measure: 65–75ch (`max-w-prose`).
- Headings: sentence case; one `h1` per page; no skipped levels; never "SC2" in a heading (§1).

## 4. Spacing, radius, elevation

- **Spacing**: 4px base scale. Component-internal 8–24px; between-component 24–48px.
- **Section rhythm**: `py-16` (mobile) / `py-24` (≥ md), consistent on every section.
- **Radius**: `radius-sm` 6px (badges, inputs), `radius-md` 8px (buttons), `radius-lg` 12px (cards/pockets), `radius-xl` 16px (framed media, feature panels).
- **Elevation**: there is none — depth goes *down*, not up (§2 pocket anatomy). No drop shadows anywhere; the inset pocket shadows are the only shadows in the system.

## 5. Layout & navigation

- Container: `max-w-6xl` (72rem) + `px-4`/`px-6`. Heroes and accent rules full-bleed; content aligned to container.
- Grids: 1-col → 2-col (≥ md) → 3-col (≥ lg). **No orphan rows**: plan the math (5 cards = intentional 2+3).
- Breakpoints: Tailwind defaults + `3xl` = 120rem. Design mobile-first at 360px.
- **Header (sticky)**: sticky on all viewports, condensing slightly after scroll (pure CSS); `background`/95 with blur fallback, bottom hairline. Desktop: the **full-width color lockup** (`logo-color-full.svg`, ~40px) — the wordmark *is* the identity — then About / Programs ▾ / Sponsors / Donate + primary "Get involved" button. Mobile: the **square mark alone** (brand rules forbid subbing "SC2"; the full name must appear in page content — hero/footer satisfy this).
- **Programs**: desktop hover/focus dropdown (FLL, FRC, Robots, Calendar) whose click/tap target is a real **`/programs` hub page** — zero-JS fallback and the mobile path. Never hover-only.
- **Mobile menu**: full-height sheet; ≥48px rows (About, Programs, Sponsors, Donate, Calendar); "Get involved" and "Donate" as large buttons pinned at the bottom; Esc/backdrop closes; `aria-expanded` wired. Nothing is more than two taps away.
- The about page: single flowing column (prose measure) with photo groupings as interleaved timeline sections — the legacy 3-column photo rails are retired.

## 6. Motion

CSS-only (D3, D20). Motion confirms — it never decorates.

- Durations: 150ms (hover/focus), 250ms (menus, accordions), 500ms (scroll-in entrances). `ease-out` entrances, `ease-in-out` toggles.
- Only `opacity` and `transform` animate.
- Scroll entrances: single fade-up (8px), once; CSS scroll-driven animations with content-visible-by-default fallback.
- Hero video: `preload="none"`, poster-first, plays in-view; `prefers-reduced-motion` disables video autoplay and all entrances. No parallax anywhere.
- Carousels: CSS scroll-snap, user-driven; sponsor strip may slow-marquee — pausable, reduced-motion-off.

## 7. Imagery & art direction

- **Real photos of real students and robots** are the brand. Stock and unDraw illustrations retire wherever a photo can serve (recolor to tokens if one must stay temporarily).
- Text over photos requires a scrim built from `background` (rgb(38 38 38)): gradient 100% at the text edge → ~20% opposite. **On mobile, heroes put text on solid ground below the photo** (photo fades into `background` via bottom gradient) — never gamble on scrims at small sizes.
- Photo treatment: `radius-xl` framed in sections; full-bleed only in heroes. Consistent warm/neutral grading.
- Every image: honest `alt`; decorative pattern/grid SVGs `aria-hidden` with `alt=""`.
- OG images (1200×630): photo + scrim + Orbitron title + lockup; one template, per-section variants.
- **Logo usage** (Brand Guidelines): color lockup on light *and* dark; dark/light monochrome variants per background; never recolor, never set the name in another font as a substitute for the lockup where the lockup fits.

## 8. Components tone

- **Buttons**: `primary` (theme accent fill + its near-black label — on FRC pages that's Hazard Green fill, etc.), `outline` (1px `border`, `foreground` text; over photography gains a translucent `card` background), `ghost`. One primary per view region. Min touch target 44×44px (nav CTA included). `radius-md`.
- **Links**: in-prose links `primary`-colored **and underlined**; UI links may drop underline at rest but underline on hover/focus. External links: icon at 0.8em + `rel="noopener"`.
- **Cards**: pocket anatomy per §2. FeatureCard = icon in `radius-sm` accent-tinted square (12% alpha `primary` bg, `primary` icon), Inter 600 title with the 32px accent rule, `body` copy, optional footer link.
- **Chips/spec labels**: SCP `label` style — uppercase, tracked, 1px 40%-alpha border in the chip's color, transparent bg. Ages ("AGES 9–16"), sponsor tiers (platinum `#CBD5E1`, gold `#FACC15`, silver `#A3A3A3`, bronze `#D08954`), event dates.
- **Stat band**: SCP 600 numeral in `primary` + Inter caption in `body`, on a pocket (feature moments get the grid floor).
- **Forms**: visible `Label` above every field; `card` bg inputs, 1px `border`, focus = `ring` 2px; errors in the destructive text token with icon + `aria-describedby`.
- **Icons**: Tabler, outline, 2px stroke, 20/24/32. Always with text or `aria-label`. No emoji as UI.

## 9. Accessibility

- WCAG 2.2 AA minimum everywhere; **body text AAA (≥7:1)** per §2. Contrast pairs verified live on `/styleguide` (computed ratios rendered); token changes must re-verify.
- Focus: 2px `ring` (theme accent) + 2px offset on every interactive element, never removed.
- Keyboard: everything operable; skip link first in DOM; `aria-current="page"` in nav; menus close on Esc.
- Landmarks: one `header`/`main`/`footer`; labeled `nav`s; headings form an outline.
- Touch targets ≥ 44px; hover-only affordances forbidden (dropdowns have focus + tap paths per §5).
- `prefers-reduced-motion` honored globally; `color-scheme: dark` declared.

## 10. Do / Don't

| Don't | Do |
|---|---|
| Elevated lighter-than-page cards (the stock AI dark-UI look) | Pockets: darker cards machined *into* the page (§2) |
| Bare, unmodulated `#262626` voids between sections | One atmosphere device per boundary: ambient pool, ghost numeral, ruler divider, or tint band (§2) |
| Circuit-board wallpaper | Engineering grid + dimension ticks, ≤7%, heroes/section breaks only |
| Yellow words, yellow underlines, and blue links competing in one viewport | One action accent per view; blue only in its informational role |
| Orange button on the green FRC page | The page theme's primary pair |
| Hero copy on a busy photo behind a thin scrim on mobile | Text on solid ground below the photo (§7) |
| Body copy in `#A3A3A3` or dimmer | `body #D4D4D4` minimum; muted is captions-only |
| Orbitron paragraphs, tiny Orbitron labels, Orbitron stats | Orbitron = h1–h3 + eyebrows; **SCP owns numbers and spec labels** |
| "SC2" in a heading; "Scstem" in prose | Full name (capitalized STEM); SC2 only in prose with the full name present |
| Faking the logo: gear SVG + name in Inter | Real lockup assets: full-width on desktop chrome, square mark on mobile |
| Filled dark-on-dark tier pills | SCP outline chips per §8 |
| 5 cards centered as 3+2 with a floating orphan | Grid math planned: intentional 2+3 |
| Drop shadows, glows, hover-lift on pockets | Border warms + floor lifts one step; depth only goes down |
| `alt="image"` / missing alt | Descriptive alt or explicit `alt=""` |
| Generic hero copy ("Empowering the future…") | Specific, local, human |

## 11. Change process

DESIGN.md changes ship as PRs with a rendered before/after (screenshot or `/styleguide` diff) and owner review. Implementation follows the doc — when code and doc disagree, the doc wins; when the doc is silent, add to it before building.
