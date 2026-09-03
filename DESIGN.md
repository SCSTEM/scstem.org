# SC2 Design System

Source of truth for the visual design of scstem.org. Every UI decision an implementer makes should be answerable from this document; if it isn't, propose an addition here first (PR + owner review), then build.

The system is a **brand-faithful refresh** of the 2024–2026 site, grounded in the official **Brand Guidelines v1** (colors, fonts, logo, and naming rules below are normative from that document) and settled through an owner design review in 2026-08. The organizing metaphor is the **build document**, in three layers: the page is a machined metal sheet (pockets cut _into_ it), blueprint linework and spec labels are scribed _onto_ it, and an **engineer's hand markup** — highlighter swipes, chalk circles and underlines, sketched arrows — sits over the top. The machine provides structure; the hand provides warmth; data speaks in a monospaced spec-sheet voice. The official t-shirt art (wireframe gear-bulb with dimension callouts, the circled-word tagline, the PROJECT/ORGANIZATION/URL title block) is a normative reference. The balance rule: the sheet stays technical, not themed — the bar is _great, not just good_: fewer competing treatments, stronger hierarchy, deliberate everything.

## 1. Brand essence, voice, and naming

South Central STEM Collective (SC2) is a 501(c)(3) making hands-on STEM — FIRST robotics first among it — accessible to students aged 9–18 in and around Franklin County, PA. The site speaks to three audiences at once: **students** (this looks fun and serious), **parents** (this is safe, organized, worth our time), **sponsors** (this is a credible investment in the community).

Voice: **energetic, concrete, community-proud.**

- This, not that: _workshop_, not _startup_. _Confident_, not _hype_. _Specific_ ("12+ years, 9 competition robots"), not _vague_ ("empowering the future"). _Warm_, not _corporate_.
- Sentence case everywhere — headings, buttons, nav. Title Case only for proper nouns. No ALL CAPS except eyebrow labels and SCP spec labels (§3).
- First person plural ("we build", "join us"); address the reader as "you".
- Numbers beat adjectives. Real names, real seasons, real awards (with permission).

**Name usage (from Brand Guidelines):** full name "South Central STEM Collective" with capitalized _STEM_; may break to two lines after "Central". Short name "SC2" (capitalized SC) — **never in headings**, and never on a page where the full name isn't present elsewhere. "SCSTEM" only for domains/handles, never in prose.

## 2. Color

Dark-only for now. All component color comes from **semantic tokens** — raw hex values and Tailwind palette classes are banned in components (the logo mark's fixed colors are brand-asset colors, exempt like any other image). Tokens live in `src/styles/global.css` `@theme`; a future light theme is a new token block, not a refactor.

### Brand palette (normative, Brand Guidelines v1)

Safety Yellow `#FACC15` · Science Blue `#3B82F6` · Foundation Gray `#4B5563` · Black `#171717` · White `#FAFAFA` · Hazard Green `#16A34A` · Danger Orange `#F97316` · Background Black `#262626`.

### Surfaces — the recessed system

The page is the raised material; cards are **pockets machined into it**. (This is the _opposite_ of the default elevated-lighter-card dark UI — deliberately.)

| Token          | Value     | Use                                                            |
| -------------- | --------- | -------------------------------------------------------------- |
| `background`   | `#262626` | Page ground (brand Background Black)                           |
| `card`         | `#171717` | Pockets: cards, panels, form fields, footer band (brand Black) |
| `section-tint` | `#212121` | Full-width alternate section bands                             |
| `border`       | `#3A3A3A` | Hairlines, card borders, dividers                              |

**Ground grain**: the page ground and the `section-tint` bands carry a fine monochrome grain — even, per-pixel film grain from a 600px seamless SVG noise tile (`--texture-grain`), with a mean lift of ~5 levels over `#262626` and a spread of ~4. It must never show a cell structure or a visible repeat — if a pattern can be picked out, the frequency is too low or the tile too small. It is what makes the sheet read as a surface rather than a flat hex, and it is material, not illustration: no brushed streaks, no bevels, no lighting gradients. Pockets never take it — their floors stay smooth, so the recess reads against the grain around it. Every contrast pair below is measured on the plain hex and still holds on the grained ground.

**Pocket anatomy (V2, "machined pocket")** — the standard card treatment: `card` fill, 1px `#383838` border, `radius-lg`, and inset edge physics: `box-shadow: inset 0 2px 8px rgb(0 0 0 / 0.55), inset 0 -1px 0 rgb(255 255 255 / 0.05)`.
**Feature pocket (V2+V3, "drawing pocket")**: the same, plus the engineering grid (§2 motifs) rendered _inside_ the pocket at ~5% opacity — reserved for feature moments (program cards, CTA panels, stat bands) on ≥ md screens; dense card grids and mobile stay plain V2.
**Hover (interactive pockets)**: pockets don't float — border warms to 40%-alpha `primary`, floor lifts `#171717 → #1A1A1A`, no translate, no glow, no shadow change.

### Text

| Token        | Value     | Contrast on `#262626` | Use                                            |
| ------------ | --------- | --------------------- | ---------------------------------------------- |
| `foreground` | `#FAFAFA` | ≈14.5:1 (AAA)         | Headings, nav, emphasis (brand White)          |
| `body`       | `#D4D4D4` | 10.2:1 (AAA)          | **All reading copy**                           |
| `muted`      | `#A3A3A3` | ≈6.0:1 (AA)           | Captions, meta, labels only — never paragraphs |

Rule: **AAA (≥7:1) for anything longer than a caption.** `muted` is the floor; nothing text-bearing goes dimmer.

### Accents — the fill-vs-text law

All ratios in this section are measured against `background` `#262626` and verified at build
time on `/styleguide`; the build fails if one drops below its floor.

Every brand accent is a **token pair**: the brand hex for _fills_ (buttons, bands, chips, large graphics — with a near-black label), and a brightened variant for _text/icons/focus on dark_ (the brand hexes other than yellow fail AA as dark-bg text). No exceptions, no third variants.

| Accent        | Fill (brand hex / label color) | Text-on-dark (≈ contrast)                    | Role                                                                                                                                                                        |
| ------------- | ------------------------------ | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Safety Yellow | `#FACC15` / `#171717`          | `#FACC15` (9.8:1 — bright enough to be both) | **Action**: CTAs, links, focus ring, key-word emphasis. The default `primary`.                                                                                              |
| Science Blue  | `#3B82F6` / `#171717`          | `#60A5FA` (5.9:1)                            | **Informational**: info callouts, calendar/event chips, data UI. Also the **designated primary of a future light theme** (yellow is illegible on white) — do not repurpose. |
| Hazard Green  | `#16A34A` / `#08240F`          | `#3ECF6E` (7.4:1)                            | FRC/Biohazard theme accent pair                                                                                                                                             |
| Danger Orange | `#F97316` / `#241102`          | `#FB923C` (6.6:1)                            | FLL theme accent pair                                                                                                                                                       |
| Destructive   | `#DB262F` / `#FAFAFA` (4.6:1)  | `#FCA5A5` (7.9:1)                            | **Errors only**: form validation, destructive confirmations. Not a brand accent and never decorative — it appears when something is wrong and nowhere else.                 |

### Program themes

`data-theme="frc"` / `data-theme="fll"` on the page root remap **only** `primary`, `primary-bright`, `primary-foreground`, and `ring` to the program's accent pair. Everything else is identical — program pages are the same site wearing team colors. Adding a program = one token block.

Rules:

- **One action accent per view** (the theme's `primary`). Blue may appear alongside it only in its informational role.
- Long body text is never accent-colored, never pure white — `body` token only.
- Foundation Gray `#4B5563` lives in the logo and imagery; it is not a UI token.

### Signature motifs

1. **Key-word emphasis**: display headings may emphasize exactly one phrase — either `primary`-colored text or a highlighter swipe (§2.13), never both, never more than one phrase. Link-style underlines never appear in headings.
2. **Accent hairline**: heroes end with a 2px `primary` rule, full-bleed. Card titles may carry a 32px × 2px `primary` rule beneath.
3. **Engineering grid** (replaces the legacy circuit-board texture): fine graph-paper grid (~24–28px cell, 1px `#FAFAFA` strokes) at 4–7% opacity, on heroes and section breaks and inside V2+V3 feature-pocket floors — never behind body copy, and **never on the page ground**, where it competes with the pocket grid floors and dulls the recess effect. The ground's life comes from its grain (surfaces, above) and the atmosphere devices below, not from linework. Optional **dimension-line ticks** (`primary` at ≤50%, SCP annotation) as rare garnish.
4. **Framed media**: photo collages/feature media get a 2px `primary` border + `radius-lg` — the "team picture frame".

### Atmosphere layer

Large unmodulated `background` fields read sterile. Between the hero and the footer, every major section boundary carries **exactly one** of these devices (never stacked, never behind photos):

5. **Ambient pools**: one radial gradient centred on a section's heading — `primary` at 8–10% alpha (or `#FAFAFA` at 4–6% for neutral sections), fading to transparent by ~70% and well inside the section on every side. Never anchored to the section's top edge: an ellipse cut in half by the boundary leaves a hard line. A lightness modulation of the ground that is visible on a calibrated monitor without being nameable; text contrast is unaffected. Max one per section.
6. **Ghost section numerals**: oversized Source Code Pro 600 numerals (`01`, `02`, …) at 5–8% alpha `foreground`, anchored to the heading's top edge and raised so most of the numeral stands in the section's top padding and its lower part sits behind the heading's first line — the device from the Brand Guidelines' own section pages. It never reaches the copy below the heading. Decorative (`aria-hidden`), numbering only top-level page sections, 3–4 per page max.
7. **Ruler dividers**: a full-container tick-mark strip (baseline + graduated ticks, `foreground` at ≤18%) as the _strong_ section divider; plain 1px hairlines remain the quiet default. Two standing uses: above the footer's title block (the sheet's bottom edge) and above a page's closing CTA band, unless the section before it already carries one.
8. **Registration marks**: small corner brackets (`primary` at ≤35%, 1.5px stroke, ~20px) set 12px in from the corners of one feature pocket per view — the drafting-sheet crop-mark garnish. Inset, not on the corner: on the edge they read as part of the border; inside, they frame the content. Never on standard cards.

### Scribed register (from the t-shirt art)

The blueprint devices printed _onto_ the sheet. Each appears at most once per page unless noted:

9. **Title block**: the engineering-drawing identity strip — bordered compartments, each an SCP uppercase label (`PROJECT:` / `ORGANIZATION:` / `URL:` …) over an Inter (or SCP for URLs/codes) value, 1px `border` dividers. Its home is the footer bottom (the drawing sheet's corner), horizontal strip ≥ md, stacked on mobile; contact/event pages may use the boxed stack as an info card.
10. **Scribed lineart**: the wireframe gear-bulb (and sibling blueprint drawings) as large, faint decorative art — stroke-only, `foreground` or `primary`, 4–6% opacity, on `card` bands (footer, feature panels), never behind body copy. Obtain the real vector from the merch/brand source files into `src/assets/brand/` (the mockups use a drawn approximation).
11. **Labeled callouts**: leader line (1px, dot or arrow terminus) + SCP label — figure captions under framed media ("FIG. 01 — BIOHAZARD, 2023 SEASON"), detail annotations on heroes ("DETAIL A" style). `muted` color; captions may double as the image's visible credit.

### Hand markup register (the human layer)

The engineer's markup drawn _over_ the sheet — this is what keeps the machined language from feeling sterile. **The machined and scribed layers stay perfectly geometric everywhere; hand markup is small and functional — a few strokes that mean something, not a style.** The one hand device that appears everywhere is the link underline (§2.14), and it earns that by carrying meaning. All strokes are deliberately imperfect the way a quick hand is: smooth paths with a single gentle curve, open ends, small rotation, 2–3px, `stroke-linecap: round`. Never a ruled line, never a repeating wave, and never pen jitter or displacement filters — the hand shows in the curve, not in noise. **Pill-shaped UI is banned**: a circled word is a chalk oval, never a `border-radius: 999px` box.

**Variation rule**: every markup device ships as a set of **at least 3 distinct SVG path variants** (implemented as primitives, e.g. `ChalkOval variant={1|2|3}`), further varied per-instance by small rotation/flip. Two adjacent instances never share a variant — identical "hand-drawn" marks read as a stamp and break the illusion. Swipes vary by rotation (±0.5–2°), inset, and alpha within their range.

12. **Chalk ovals**: key words circled with a hand-drawn open ellipse — `foreground` white (chalk) in hero/photo contexts, `primary` (grease pencil) on the ground. The "Real ⬭Skills⬭. Real ⬭Robots⬭. Real ⬭Fun⬭." treatment; the tagline itself is sanctioned brand copy for heroes/CTAs. Tagline/display contexts only, one run per view.
13. **Highlighter swipes**: a skewed translucent `primary` rectangle (25–35% alpha — **25% is the default**, the only value in the range that keeps white text at AAA: 7.6:1 on the ground, 9.2:1 on `card`; ±0.5–2° rotation, 2–3px radius) behind white key words — the marker-highlight alternative to `primary`-colored text. A heading uses colored text _or_ a swipe, never both; verify the white-on-swipe contrast on `/styleguide`.
14. **Hand underlines — the link grammar**: hand-drawn, slightly curved underline strokes (`primary`). **An underline means a link, always.** Every text link on the site carries one (`--texture-underline`, a repeating tile holding one smooth ~12em stroke with a gentle sag, ~2.3px, sitting ~0.2em below the baseline and following the text across line breaks; hover shades the text and never moves the stroke); nothing that is not a link is ever underlined in copy. The grammar, in full: _underline_ = link; _swipe alone_ or _oval alone_ = emphasis; _swipe + underline_ = a **featured link**, the one link in a view the page wants noticed. Ovals never appear in body copy. The `ChalkUnderline` primitive remains for display use beneath a heading or tagline phrase — headings never contain links, so it cannot be mistaken for one. Distinct from the machined 32px card rule, which stays perfectly straight — machined vs. hand is a deliberate contrast, never blended.
15. **Sketch arrows**: one hand-drawn curved arrow per page. **An arrow's target is always handwritten annotation text (§3), never a regular-font element** — a sketched arrow pointing at typeset UI breaks the fiction. The annotation may itself be a link (e.g. the handwritten "Become a sponsor").

Motion note (§6 applies): hand-markup strokes _draw on_ as their entrance (stroke-dashoffset, once, ~1100ms, reduced-motion disables) — the one sanctioned decorative animation, because it enacts the metaphor. The entrance starts when the mark scrolls into view (an IntersectionObserver in `BaseLayout`, the one script motion is allowed), not on page load, so a mark below the fold is never drawn unseen; without JavaScript the stroke is simply present.

**Register budget**: across all machined, scribed, and hand-markup devices (grid, ticks, ruler, numerals, pools, marks, title block, lineart, callouts, ovals, swipes, underlines, arrows), a viewport shows **at most 4 distinct devices**. If a new one enters a view, another leaves. Link underlines are affordance, not atmosphere, and do not count.

Restraint rule: these are atmosphere, not decoration — if a device is noticeable before the content is, it's too loud. `section-tint` bands (§2 surfaces) count as a device for their boundary.

## 3. Typography

Per Brand Guidelines: Orbitron for page headings/titles (avoid very long or small lines), Inter for body/subheadings, Source Code Pro for monospaced/stylistic elements.

| Role             | Font                    | Weights     | Where                                                                                                                                                             |
| ---------------- | ----------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display/headings | **Orbitron** (variable) | 500–700     | h1–h3 and eyebrow labels only. Never below h3 size, never italic, never long lines (≤ ~40 chars/line) — ration the display voice.                                 |
| UI & body        | **Inter** (variable)    | 400/500/600 | Everything else: body, h4–h6, nav, buttons, forms, captions                                                                                                       |
| Data voice       | **Source Code Pro**     | 400/600     | **Stats and numerals, countdowns, dates, spec labels** (ages chips, tier badges, "REF" annotations). The spec-sheet register of the build-document metaphor.      |
| Annotation hand  | **Architects Daughter** | 400         | Hand-markup annotations only (≤5 words): sketch-arrow targets, margin notes, the handwritten link they point at. Never UI chrome, body copy, headings, or labels. |

Fluid scale (clamp between 360px and 1440px viewports), defined as tokens:

| Token     | Size (min → max)      | Line height | Font                                                                 |
| --------- | --------------------- | ----------- | -------------------------------------------------------------------- |
| `display` | 2.5rem → 4.25rem      | 1.05        | Orbitron 700                                                         |
| `h1`      | 2rem → 3rem           | 1.1         | Orbitron 700                                                         |
| `h2`      | 1.5rem → 2.25rem      | 1.15        | Orbitron 600                                                         |
| `h3`      | 1.25rem → 1.5rem      | 1.25        | Orbitron 600                                                         |
| `h4`      | 1.125rem → 1.25rem    | 1.35        | Inter 600                                                            |
| `stat`    | 1.75rem → 2.25rem     | 1.1         | Source Code Pro 600, `primary`                                       |
| `body-lg` | 1.0625rem → 1.1875rem | 1.65        | Inter 400                                                            |
| `body`    | 1rem → 1.0625rem      | 1.65        | Inter 400                                                            |
| `small`   | 0.875rem              | 1.5         | Inter 400/500                                                        |
| `label`   | 0.6875–0.75rem        | 1.4         | Source Code Pro 600, +0.05em tracking, uppercase (spec labels/chips) |

- **Inter ships with its weight axis trimmed to 400–700** and cannot render heavier: the axis this table does not use was 12 KB of critical-path font (`docs/adr/0011-inter-weight-axis.md`). Widening the range means re-instancing the committed file (`docs/adr/0014-vendored-fonts.md`), not just a utility class.
- Eyebrow labels: Orbitron 500, 12px, uppercase, `+0.08em` tracking, `primary` or `muted` — Orbitron's one all-caps use; SCP `label` is the other sanctioned caps.
- Prose measure: 65–75ch (`max-w-prose`).
- Implementation note: `body` names both a color (§2) and a size (this table). Tailwind resolves
  colors first, so in code `text-body` is the **color** and the **size** utility is `text-copy`.
  Both tokens keep their documented names.
- Headings: sentence case; one `h1` per page; no skipped levels; never "SC2" in a heading (§1).

## 4. Spacing, radius, elevation

- **Spacing**: 4px base scale. Component-internal 8–24px; between-component 24–48px.
- **Section rhythm**: `py-16` (mobile) / `py-24` (≥ md), consistent on every section.
- **Radius — one end-mill**: three values, unified to the machining story. `radius-sm` **4px** (chips, spec labels, badges — stamped plates), `radius-md` **8px** (all controls: buttons, inputs, icon tiles), `radius-lg` **12px** (every cut feature: pockets, panels, framed media — one tool radius for everything machined). Nothing else; `16px` and pill radii are retired.
- **Elevation**: there is none — depth goes _down_, not up (§2 pocket anatomy). No drop shadows anywhere; the inset pocket shadows are the only shadows in the system.

## 5. Layout & navigation

- Container: `max-w-6xl` (72rem) + `px-4`/`px-6`. Heroes and accent rules full-bleed; content aligned to container.
- Grids: 1-col → 2-col (≥ md) → 3-col (≥ lg). **No orphan rows**: plan the math (5 cards = intentional 2+3).
- Breakpoints: Tailwind defaults + `3xl` = 120rem. Design mobile-first at 360px.
- **Header (sticky)**: sticky on all viewports, condensing slightly after scroll (pure CSS); `background`/95 with blur fallback, bottom hairline. Desktop: the **full-width color lockup** (`logo-color-full.svg`, ~40px) — the wordmark _is_ the identity — then About / Programs ▾ / Sponsors / Donate + primary "Get involved" button. Mobile: the **square mark alone** (brand rules forbid subbing "SC2"; the full name must appear in page content — hero/footer satisfy this).
- **Programs**: desktop hover/focus dropdown (FLL, FRC, Robots, Calendar) whose click/tap target is a real **`/programs` hub page** — zero-JS fallback and the mobile path. Never hover-only.
- **Mobile menu**: full-height sheet; ≥48px rows (About, Programs, Sponsors, Donate, Calendar); "Get involved" and "Donate" as large buttons pinned at the bottom; Esc/backdrop closes; `aria-expanded` wired. Nothing is more than two taps away.
- The about page: single flowing column (prose measure) with photo groupings as interleaved timeline sections.

## 6. Motion

CSS-only. Motion confirms — it never decorates.

- Durations: 150ms (hover/focus), 250ms (menus, accordions), 500ms (scroll-in entrances). `ease-out` entrances, `ease-in-out` toggles.
- Only `opacity` and `transform` animate.
- Scroll entrances: single fade-up (8px), once; CSS scroll-driven animations with content-visible-by-default fallback.
- Hero video: `preload="none"`, poster-first, plays in-view; `prefers-reduced-motion` disables video autoplay and all entrances. No parallax anywhere.
- Carousels: CSS scroll-snap, user-driven; sponsor strip may slow-marquee — pausable, reduced-motion-off.

## 7. Imagery & art direction

- **Real photos of real students and robots** are the brand. Stock and unDraw illustrations retire wherever a photo can serve (recolor to tokens if one must stay temporarily).
- Text over photos requires a scrim built from `background` (rgb(38 38 38)): gradient 100% at the text edge → ~20% opposite. **On mobile, heroes put text on solid ground below the photo** (photo fades into `background` via bottom gradient) — never gamble on scrims at small sizes.
- Photo treatment: `radius-lg` framed in sections; full-bleed only in heroes. Consistent warm/neutral grading.
- Every image: honest `alt`; decorative pattern/grid SVGs `aria-hidden` with `alt=""`.
- OG images (1200×630): photo + scrim + Orbitron title + lockup; one template, per-section variants.
- **Logo usage** (Brand Guidelines): color lockup on light _and_ dark; dark/light monochrome variants per background; never recolor, never set the name in another font as a substitute for the lockup where the lockup fits.

## 8. Components tone

- **Buttons**: `primary` (theme accent fill + its near-black label — on FRC pages that's Hazard Green fill, etc.), `outline` (1px `border`, `foreground` text; over photography gains a translucent `card` background), `ghost`. One primary per view region. Min touch target 44×44px (nav CTA included). `radius-md`.
- **Links**: three forms and no fourth. _In copy_: `primary`-colored with the hand underline (§2.14); a featured link adds the swipe. _In chrome_ (nav, footer, card footers): `ui-link` — `foreground`, no underline at rest, a straight 1px machined hairline on hover/focus. Chrome is a different layer from copy and never takes the hand stroke. _As a reference_: a linked logo or figure with a `Callout` beneath naming the destination (`REF — firstinspires.org`). A link that is an action is a button, not a link; the standalone underlined-text button is retired. External links: icon at 0.8em + `rel="noopener"`.
- **Cards**: pocket anatomy per §2. FeatureCard carries **one identity mark**: a photo when it has one, otherwise a Tabler icon on a stamped plate in the spec-chip anatomy (36px square, 1px 40%-alpha `primary` border, `radius-sm`, transparent fill, `primary` icon) — never both, and never a filled tile. Then an Inter 600 title with its spec chip on the same line (a row holding only a chip is a wasted row), the 32px accent rule, `body` copy, optional footer link.
- **Chips/spec labels**: SCP `label` style — uppercase, tracked, 1px 40%-alpha border in the chip's color, transparent bg. Ages ("AGES 9–16"), sponsor tiers (platinum `#CBD5E1`, gold `#FACC15`, silver `#A3A3A3`, bronze `#D08954`), event dates.
- **Stat band**: SCP 600 numeral in `primary` + Inter caption in `body`, on a pocket (feature moments get the grid floor).
- **Forms**: visible `Label` above every field; `card` bg inputs, 1px `border`, focus = `ring` 2px; errors in the destructive text token with icon + `aria-describedby`.
- **Icons**: Tabler, outline, 2px stroke, 20/24/32. Always with text or `aria-label`. No emoji as UI.
- **Long-form prose** (pages carrying an argument rather than a grid — about, news, an event body): one flowing column at prose measure. Lists take `primary` markers, `body` text, and one level of nesting at most. Blockquotes take a 2px `primary` rule on the leading edge and `body-lg` `foreground` text, with the attribution beneath in `muted` `small` — no quote glyphs, no italics; the rule is the signal. Paragraph rhythm 1rem, with 2rem above a heading that follows copy.

## 9. Accessibility

- WCAG 2.2 AA minimum everywhere; **body text AAA (≥7:1)** per §2. Contrast pairs verified live on `/styleguide` (computed ratios rendered); token changes must re-verify.
- Focus: 2px `ring` (theme accent) + 2px offset on every interactive element, never removed.
- Keyboard: everything operable; skip link first in DOM; `aria-current="page"` in nav; menus close on Esc.
- Landmarks: one `header`/`main`/`footer`; labeled `nav`s; headings form an outline.
- Touch targets ≥ 44px; hover-only affordances forbidden (dropdowns have focus + tap paths per §5).
- `prefers-reduced-motion` honored globally; `color-scheme: dark` declared.

## 10. Do / Don't

| Don't                                                                     | Do                                                                                                |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Elevated lighter-than-page cards (the stock AI dark-UI look)              | Pockets: darker cards machined _into_ the page (§2)                                               |
| Bare, unmodulated `#262626` voids between sections                        | One atmosphere device per boundary: ambient pool, ghost numeral, ruler divider, or tint band (§2) |
| Circuit-board wallpaper                                                   | Engineering grid + dimension ticks, ≤7%, heroes/section breaks only                               |
| Yellow words, yellow underlines, and blue links competing in one viewport | One action accent per view; blue only in its informational role                                   |
| Orange button on the green FRC page                                       | The page theme's primary pair                                                                     |
| Hero copy on a busy photo behind a thin scrim on mobile                   | Text on solid ground below the photo (§7)                                                         |
| Body copy in `#A3A3A3` or dimmer                                          | `body #D4D4D4` minimum; muted is captions-only                                                    |
| Orbitron paragraphs, tiny Orbitron labels, Orbitron stats                 | Orbitron = h1–h3 + eyebrows; **SCP owns numbers and spec labels**                                 |
| "SC2" in a heading; "Scstem" in prose                                     | Full name (capitalized STEM); SC2 only in prose with the full name present                        |
| Faking the logo: gear SVG + name in Inter                                 | Real lockup assets: full-width on desktop chrome, square mark on mobile                           |
| Filled dark-on-dark tier pills                                            | SCP outline chips per §8                                                                          |
| Pill-shaped UI (`border-radius: 999px` capsules)                          | Radius tokens only; circled words are hand-drawn chalk ovals (§2.12)                              |
| 5 cards centered as 3+2 with a floating orphan                            | Grid math planned: intentional 2+3                                                                |
| Drop shadows, glows, hover-lift on pockets                                | Border warms + floor lifts one step; depth only goes down                                         |
| `alt="image"` / missing alt                                               | Descriptive alt or explicit `alt=""`                                                              |
| Generic hero copy ("Empowering the future…")                              | Specific, local, human                                                                            |

## 11. Change process

DESIGN.md changes ship as PRs with a rendered before/after (screenshot or `/styleguide` diff) and owner review. Implementation follows the doc — when code and doc disagree, the doc wins; when the doc is silent, add to it before building.
