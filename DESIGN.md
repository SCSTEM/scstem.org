# SC2 Design System

Source of truth for the visual design of scstem.org and every other surface that wears the SC2 brand: the team wiki, and web apps built for the teams. Every UI decision an implementer makes should be answerable from this document; if it isn't, propose an addition here first (PR + owner review), then build.

The system is a **brand-faithful refresh** of the 2024–2026 site, grounded in the official **Brand Guidelines v1** (colors, fonts, logo, and naming rules below are normative from that document) and settled through owner design reviews in 2026-08 and 2026-09. The organizing metaphor is the **build document**, in three layers: the page is a machined metal sheet (pockets cut _into_ it), blueprint linework and spec labels are scribed _onto_ it, and an **engineer's marker** — highlighter swipes, circled words, underlines, arrows, revision clouds — marks it up. The machine provides structure; the hand provides warmth; data speaks in a monospaced spec-sheet voice. The official t-shirt art (wireframe gear-bulb with dimension callouts, the circled-word tagline, the PROJECT/ORGANIZATION/URL title block, the lockup's crossing construction lines) is a normative reference. The balance rule: the sheet stays technical, not themed — fewer competing treatments, stronger hierarchy, deliberate everything.

## 1. Brand essence, voice, and naming

South Central STEM Collective (SC2) is a 501(c)(3) making hands-on STEM — FIRST robotics first among it — accessible to students aged 9–18 in and around Franklin County, PA. The site speaks to three audiences at once: **students** (this looks fun and serious), **parents** (this is safe, organized, worth our time), **sponsors** (this is a credible investment in the community).

Voice: **energetic, concrete, community-proud.**

- This, not that: _workshop_, not _startup_. _Confident_, not _hype_. _Specific_ ("12+ years, 9 competition robots"), not _vague_ ("empowering the future"). _Warm_, not _corporate_.
- Sentence case everywhere — headings, buttons, nav. Title Case only for proper nouns. No ALL CAPS except SCP labels (§3).
- First person plural ("we build", "join us"); address the reader as "you".
- Numbers beat adjectives. Real names, real seasons, real awards (with permission).

**Name usage (from Brand Guidelines):** full name "South Central STEM Collective" with capitalized _STEM_; may break to two lines after "Central". Short name "SC2" (capitalized SC) — **never in headings**, and never on a page where the full name isn't present elsewhere. "SCSTEM" only for domains/handles, never in prose.

**_FIRST®_** is a word mark: italic, with its ®, wherever the font has an italic (Inter copy, card titles). In an Orbitron heading it stands upright, ® included — Orbitron has no italic (§3), so h1–h3 turn off synthesized italic rather than take a faux oblique.

## 2. Color

### Tokens and switches

Every visual value lives in **`src/styles/tokens.css`**: plain CSS custom properties named `--sc2-*`, with no build step and no Tailwind, so this site, the wiki and any web app import the same file. This site maps it onto Tailwind in `global.css` (`@theme inline`). Components read tokens and nothing else: raw hex values and Tailwind palette classes are banned in components (the logo mark's fixed colors are brand-asset colors, exempt like any other image).

Three independent switches set the look. Each is an attribute on `<html>` or on any element below it, and they nest:

| Switch          | Values                                                           | Default  | Changes                                                            |
| --------------- | ---------------------------------------------------------------- | -------- | ------------------------------------------------------------------ |
| `data-mode`     | `dark` — black-anodized steel; `light` — clear-anodized aluminum | `dark`   | Every neutral, text, shadow and grain value                        |
| `data-accent`   | `green` (Biohazard / FRC), `orange` (FLL)                        | yellow   | The accent set only (below)                                        |
| `data-register` | `blueprint` — the drawing of the part                            | the shop | Neutrals and grid lines, to cyanotype (dark) or whiteprint (light) |

Any combination is valid, and `/styleguide` gates every one. Colors are written once as `light-dark(light, dark)`, so the finish follows `color-scheme` and a nested switch needs no restated tokens; the few values `light-dark()` cannot carry (the grain image, the underline images) switch in the `[data-mode]` blocks. A new accent is one `[data-accent]` block.

### Brand palette (normative, Brand Guidelines v1)

Safety Yellow `#FACC15` · Science Blue `#3B82F6` · Foundation Gray `#4B5563` · Black `#171717` · White `#FAFAFA` · Hazard Green `#16A34A` · Danger Orange `#F97316` · Background Black `#262626`.

### Surfaces — cut into metal, laid on the table

The page is the raised material; cards are **pockets machined into it**. (This is the _opposite_ of the default elevated-lighter-card dark UI — deliberately.) Page-scale contrast comes from alternation: the grained ground is the _sheet_, and full-width **ink bands** are the _drafting table_ it lies on. The physics invert on the table: a card on a band is a **raised plate** laid on it. One rule, two contexts — **recessed on the ground, raised on the band** — in both finishes.

| Token          | Dark      | Light     | Use                                                                  |
| -------------- | --------- | --------- | -------------------------------------------------------------------- |
| `background`   | `#262626` | `#E4E6E9` | Page ground — the sheet                                              |
| `card`         | `#171717` | `#D8DBDF` | Pockets on the ground: cards, panels, form fields                    |
| `card-hover`   | `#1F1F1F` | `#DFE2E5` | A pocket floor lifting a step                                        |
| `band`         | `#121212` | `#D1D5DA` | Ink bands — the drafting table — and the footer                      |
| `plate`        | `#232323` | `#EEF0F2` | Pockets inside a band: raised plates (`plate-border`, `plate-hover`) |
| `sheet`        | `#2E2E2E` | `#EFF1F3` | The neutral keycap's face (§8)                                       |
| `border`       | `#3A3A3A` | `#C2C6CC` | Hairlines, card borders, dividers (`pocket-border` for pocket walls) |
| `control-edge` | `#737373` | `#6B7178` | Control boundaries: ≥ 3:1 on ground, card, band and plate            |
| `ink`          | `#0C0C0C` | `#8E949B` | Drafted shadow ink (§4) — never a fill                               |

The light finish is **clear-anodized aluminum**: the bare-metal twin of the dark sheet, cool grey with a faint blue bias. It is not an inverted palette: pockets still cut down, plates still rise, and edges are still drafted.

**Ground grain**: the page ground carries a fine monochrome grain — even, per-pixel film grain from a 600px seamless SVG noise tile (`--sc2-texture-grain`), near-white specks on the dark finish and near-black on the light — visible as texture at arm's length, never as a different ground. It must never show a cell structure or a visible repeat. It is material, not illustration: no brushed streaks, no bevels. Pockets never take it — their floors stay smooth, so the recess reads against the grain around it — and neither do bands. Every contrast pair is measured on the plain hex.

**Pocket anatomy ("machined pocket")** — the standard card: `card` fill, 1px `pocket-border`, `radius-lg`, and inset edge physics (`--sc2-shadow-pocket`): a dark upper wall and a lit lower lip. **The floor is lit**: a soft top-to-bottom gradient over the fill — shadowed under the top wall, a step brighter toward the lip (`--sc2-pocket-shade` → transparent → `--sc2-pocket-lit`), a few levels either side of the floor color. It is the one gradient a surface takes, and it reads as a recess, never as gloss.
**Plate anatomy (a pocket inside a band)**: the same element, laid on the table — `plate` fill, 1px `plate-border`, `radius-lg`, a hairline top highlight and a contact shadow (`--sc2-shadow-plate`). Plates are flat: light falls on them, not into them. Components never choose: a pocket becomes a plate by being inside a band.
**Feature pocket ("drawing pocket")**: the same, plus the engineering grid (§2 motifs) rendered _inside_ the pocket floor — reserved for feature moments (program cards, CTA panels, stat bands) on ≥ md screens; dense card grids and mobile stay plain.
**Hover (interactive pockets)**: pockets don't float — the border warms to 60%-alpha `primary`, the floor lifts to `card-hover` (`plate-hover` on a plate), and a card's footer arrow nudges 2px (reduced motion: no nudge). No translate of the card, no glow, no shadow change.

### Text

| Token        | Dark      | Light     | Use                                             |
| ------------ | --------- | --------- | ----------------------------------------------- |
| `foreground` | `#FAFAFA` | `#16181B` | Headings, nav, emphasis, links in light (§2.14) |
| `body`       | `#D4D4D4` | `#2B2F34` | **All reading copy**                            |
| `muted`      | `#A3A3A3` | `#4B5057` | Captions, meta, labels only — never paragraphs  |

Rule: **AAA (≥ 7:1) for anything longer than a caption; AA (4.5:1) for everything else that carries text, including the worst point inside a band, where a major and a minor drafting-grid line cross.** `muted` is the floor; nothing text-bearing goes dimmer. `/styleguide` gates every text token on every surface in every finish, register and accent; the build fails if one drops below its floor.

### Accents — the fill-vs-text law

Every accent is a **set**, swapped whole by `data-accent`: the brand hex for _fills_ (buttons, rules, chips' borders, large graphics — with a near-black label), a text color for _text, icons and focus_ on the ground, the **marker** color for hand strokes (§2.12–2.20), and a solid highlighter for swipes. The brand hexes other than yellow fail as text on dark, and none of them pass as text on light, so the text value differs by finish. No exceptions, no fourth variant.

| Accent        | Fill / label          | Text: dark / light    | Marker: dark / light  | Role                                                             |
| ------------- | --------------------- | --------------------- | --------------------- | ---------------------------------------------------------------- |
| Safety Yellow | `#FACC15` / `#171717` | `#FACC15` / `#713F12` | `#FACC15` / `#D1A107` | **Action** (default): CTAs, links, focus ring, key-word emphasis |
| Hazard Green  | `#16A34A` / `#08240F` | `#3ECF6E` / `#14532D` | `#16A34A` / `#1EB256` | `data-accent="green"`: Biohazard, FRC                            |
| Danger Orange | `#F97316` / `#241102` | `#FB923C` / `#7C2D12` | `#F97316` / `#E08437` | `data-accent="orange"`: FLL                                      |

Two fixed pairs sit outside the accent set: **Science Blue** (`#3B82F6` fill / `#171717` label; text `#60A5FA` dark, `#1E40AF` light, `#93C5FD` on cyanotype) for informational callouts, calendar chips and data UI; and **Destructive** (`#DB262F` / `#FAFAFA`; text `#FCA5A5` dark, `#991B1B` light) for errors only — form validation and destructive confirmations. Destructive is not a brand accent and never decorative. Sponsor-tier chips (§8) have their own text colors per finish.

**Yellow on the light finish** is 1.5:1 against the ground, so it is never text there. It stays a fill, a highlighter and a marker: links are **ink with a yellow marker underline**, emphasis is a highlighter swipe, and the deep text value (`#713F12`) covers small labels, chips, stat numerals and icons only.

Rules:

- **One action accent per view** (the page's `primary`). Blue may appear alongside it only in its informational role.
- Long body text is never accent-colored — `body` token only.
- Foundation Gray `#4B5563` lives in the logo and imagery; it is not a UI token.
- Program pages set their accent from `programs[key].accent` in `src/data/site.ts`; the org-wide `sc2` look is yellow.

### The blueprint register

`data-register="blueprint"` turns the sheet into the drawing of the part: linework comes forward and material recedes. It is for pages that are _about_ the drawing — 404 and under-construction pages, special pages, and the team wiki — never for a page whose job is persuasion (home, programs, sponsors, donate).

| Token        | Cyanotype (dark) | Whiteprint (light) |
| ------------ | ---------------- | ------------------ |
| `background` | `#0F2B52`        | `#F3F6FA`          |
| `card`       | `#0B2242`        | `#E4EAF3`          |
| `band`       | `#0A1F3D`        | `#DCE4F0`          |
| `plate`      | `#133566`        | `#FFFFFF`          |
| `border`     | `#2F4C75`        | `#B7C6DE`          |
| `foreground` | `#FAFAFA`        | `#0B1F3A`          |
| `body`       | `#D6E1F0`        | `#26405F`          |
| `muted`      | `#A9BDD8`        | `#3E5270`          |

The rest of the set (`card-hover`, `pocket-border`, `plate-border`, `plate-hover`, `sheet`, `control-edge`, `ink`) is in `tokens.css`. Accents are unchanged: yellow, green and orange all read on both prints.

**The drawing frame**: on a blueprint page the drafting grid (both weights) lives in the page margins only. The content column sits inside a single 1px frame line at the container edge, like the border of a drawing sheet, with zone numbers (1, 2, 3 …) along the top edge and zone letters (A, B, C …) down the left, set in SCP `label` at `muted`. Inside the frame the ground is plain: **no grid line ever crosses text on a blueprint page**. Below `md`, where the margins vanish, the frame and grid go with them. Photos on a blueprint page go duotone (grayscale, multiplied with the print's blue). Whether other special pages take the frame or soft margins without one is open (`plan/todo.md`); the frame is the default.

### Signature motifs

1. **Key-word emphasis**: display headings may emphasize exactly one phrase — either `primary-bright` text or a highlighter swipe (§2.13), never both, never more than one phrase. Link-style underlines never appear in headings.
2. **Accent hairline**: heroes end with a 2px `primary` rule, full-bleed. Card titles may carry a 32px × 2px `primary` rule beneath.
3. **Engineering grid**: fine graph-paper grid (26px cell, 1px `foreground` strokes) at 4–7% opacity, on heroes and section breaks and inside feature-pocket floors — never behind body copy on the ground, and **never on the bare page ground of the shop register**. **The drafting grid** is the same grid at blueprint strength, in two weights — a 26px minor cell and a 130px (5 × minor) major cell, the line-weight hierarchy of a real drawing — in the register's line colors (`--sc2-grid-minor`, `--sc2-grid-major`; fainter on the light finish, where ink lines read stronger). It is feathered with a mask so it never ends on a hard edge, and its homes are: **inside a band** (radial feather), **over the copy side of a photo hero** from `md` up (feathered out by 70% of the width, before the photo's subject), and **the margins of a blueprint page** (outside the drawing frame, above). The line colors are the ceiling: `/styleguide` gates every text token at the worst crossing. Optional **dimension-line ticks** (`primary` at ≤ 50%, SCP annotation) as rare garnish.
4. **Framed media**: photo collages/feature media get a 2px `primary` border + `radius-lg` — the "team picture frame" — mounted on the sheet with a 6px **drafted edge** (`--sc2-shadow-drafted-2`, §4). On a band, where ink on ink would not show, the print takes the plate's contact shadow instead.

### Atmosphere layer

Large unmodulated `background` fields read sterile. Between the hero and the footer, every major section boundary carries **exactly one** of these devices (never stacked, never behind photos):

**Ink bands** (`Section atmosphere="band"`): the drafting table — a full-width `band` surface with a 1px `primary`/30% top edge, a 1px bottom edge, the accent **edge vignette** (`primary` at 9%, gone 12% in from each side — part of the band's anatomy, never a free device), and the drafting grid (§2.3). A band is the one device for its boundary: it carries no pool, bubble, or ruler. **Two bands never touch** — two tables side by side read as one slab with a seam — and the footer is a band, so a page never ends on one. The build enforces both: every `Section`, the `Hero` and the footer declare their surface, and a page where two bands are consecutive fails.

5. **Ambient pools**: one radial gradient centred on a section's heading — `primary` at 8–10% alpha (or `foreground` at 4–6% for neutral sections), fading to transparent by ~70% and well inside the section on every side. Never anchored to the section's top edge: an ellipse cut in half by the boundary leaves a hard line. Max one per section.
6. **Grid bubbles** (`Section atmosphere="bubble"`): the column-grid marker from architectural plans — a 30px circle (1.25px `foreground` at 55%) holding the section number in SCP 600 (`01`, `02`, …), at the start of a thin dash-dot center line (`foreground` at ≤ 24%) that runs the width of the container above the section's heading. It numbers top-level page sections only, in order, 3–5 per page, and is decorative (`aria-hidden`).
7. **Ruler dividers**: a full-container tick-mark strip (baseline + graduated ticks, `foreground` at ≤ 18%) as the _strong_ section divider; plain 1px hairlines remain the quiet default. Two standing uses: above the footer's title block (the sheet's bottom edge) and above a page's closing CTA band, unless the section before it already carries one.
8. **Registration marks — construction lines**: at each corner of one feature pocket per view, two 1px lines (`foreground` at 40%) run along the pocket's edges past the corner and cross just outside it, extending ~16px beyond — the construction lines of the lockup on the t-shirt front. They sit outside the pocket, so the pocket needs ~20px of clear space around it. Never on standard cards.

### Scribed register (from the t-shirt art)

The blueprint devices printed _onto_ the sheet. Each appears at most once per page unless noted:

9. **Title block**: the engineering-drawing identity strip — bordered compartments, each an SCP uppercase label (`PROJECT:` / `ORGANIZATION:` / `URL:` …) over an Inter (or SCP for URLs/codes) value, 1px `border` dividers. Its home is the footer bottom (the drawing sheet's corner), horizontal strip ≥ md, stacked on mobile; contact/event pages may use the boxed stack as an info card, and a wiki page uses it for its metadata (owner, updated, revision).
10. **Scribed lineart**: the wireframe gear-bulb (and sibling blueprint drawings) as large, faint decorative art — stroke-only, `foreground` or `primary`, 4–6% opacity, on the footer and feature panels, never behind body copy. Obtain the real vector from the merch/brand source files into `src/assets/brand/`.
11. **Labeled callouts**: leader line (1px, dot or arrow terminus) + SCP label — figure captions under framed media ("FIG. 01 — BIOHAZARD, 2023 SEASON"), detail annotations on heroes ("DETAIL A" style). `muted` color; captions may double as the image's visible credit.

### Hand markup register (the human layer)

The engineer's marker drawn _over_ the sheet — this is what keeps the machined language from feeling sterile. **The machined and scribed layers stay perfectly geometric everywhere; hand markup is small and functional — a few strokes that mean something, not a style.** The one hand device that appears everywhere is the link underline (§2.14), and it earns that by carrying meaning.

**The stroke is a felt marker**: 4.5px, round caps and joins, 90% opacity, in the accent's **marker** color (`--sc2-mark`; on photography, chalk white `foreground`). Paths are smooth with a single gentle curve, open ends and small rotation — never a ruled line, never a repeating wave, never pen jitter or displacement filters: the hand shows in the curve, not in noise. **Pill-shaped UI is banned**: a circled word is a marker oval, never a `border-radius: 999px` box.

**Variation rule**: every markup device ships as a set of **at least 3 distinct path variants** (primitives take `variant={1|2|3}`), further varied per instance by small rotation/flip. Two adjacent instances never share a variant — identical "hand-drawn" marks read as a stamp and break the illusion.

12. **Marker ovals**: key words circled with a hand-drawn open ellipse — the "Real ⬭Skills⬭. Real ⬭Robots⬭. Real ⬭Fun⬭." treatment; the tagline itself is sanctioned brand copy for heroes/CTAs. Tagline/display contexts only, one run per view.
13. **Highlighter swipes**: a skewed highlighter bar (±0.5–2° rotation, 2px radius) behind key words — the marker alternative to accent-colored text. On the dark finish it is translucent `primary` (`--sc2-swipe`, 25% at body sizes; `--sc2-swipe-display`, 35% inside an h1 or h2) behind white words; on the light finish it is a solid highlighter tint behind ink words. Body sizes hold AAA, display sizes AA-large, in every finish and accent. A heading uses accent text _or_ a swipe, never both.
14. **Hand underlines — the link grammar**: **an underline means a link, always.** Every text link carries one: a 4.2px marker stroke that **drifts** — nearly straight, rising ~2px toward the end, the way a right-handed stroke pulls — stretched to the link's width (to each line's width when it wraps, one stroke per line, never a seam), its ends ~0.16em below the text. It comes in **three drift variants**, rotated from link to link (`:nth-of-type`), so neighboring links never share a stroke. On the dark finish the link text is `primary-bright` and hover shades it to `foreground`; on the light finish the text is ink (`foreground`) and hover shades it to `primary-bright`. The stroke never moves. Nothing that is not a link is ever underlined in copy. The grammar, in full: _underline_ = link; _swipe alone_ or _oval alone_ = emphasis; _swipe + underline_ = a **featured link**, the one link in a view the page wants noticed. Ovals never appear in body copy. The `ChalkUnderline` primitive remains for display use beneath a heading or tagline phrase — headings never contain links, so it cannot be mistaken for one. Distinct from the machined 32px card rule, which stays perfectly straight.
15. **Leader notes**: a short handwritten note (§3, ≤ 5 words) with a sketched arrow from the note to what it is about — a handwritten link, a button, or a field ("start here!" → Get involved). One per view. **The arrow always starts at handwriting**: a sketched arrow never floats free, and never points from typeset text.
16. **Revision clouds**: the drafting mark for "this changed" — a scalloped marker cloud around an element, with a **delta tag** (a small marker triangle holding the revision number in SCP) at its top right, and optionally a leader note saying what changed ("moved up a week"). Only for something that really is new or changed — a moved date, a new season, an updated wiki section — and removed once it is no longer news. One per view.
17. **Strike and correct**: a word struck through with a single marker stroke, with the handwritten correction above it and a caret below. Display headings only, once per site section; the corrected sentence must read correctly to a screen reader (the struck word is hidden from assistive tech, the correction is read in its place).
18. **Circled controls**: a marker oval around the one control a view most wants pressed. Primary buttons only, once per page, never alongside a leader note on the same control.
19. **Tick marks**: hand ticks in place of bullets for checklists and completed steps. Lists only; mostly the wiki.
20. **Margin brackets**: a tall marker brace beside a paragraph with a short leader note ("read this first"). Long-form prose only, once per page.

Devices 19 and 20 are specified here for the wiki; they are built as primitives when the first page that uses them is.

Motion note (§6 applies): hand-markup strokes _draw on_ as their entrance (stroke-dashoffset, once, ~1100ms, reduced-motion disables) — the one sanctioned decorative animation, because it enacts the metaphor. The entrance starts when the mark scrolls into view (an IntersectionObserver in `BaseLayout`, the one script motion is allowed), not on page load; without JavaScript the stroke is simply present.

**Register budget**: across all machined, scribed, and hand-markup devices (grid, ticks, ruler, bubbles, pools, marks, title block, lineart, callouts, ovals, swipes, arrows, clouds, strikes), a viewport shows **at most 4 distinct devices**. If a new one enters a view, another leaves. Link underlines are affordance, not atmosphere, and do not count; nor does the drawing frame of a blueprint page, which is the page itself.

Restraint rule: these are atmosphere, not decoration — if a device is noticeable before the content is, it's too loud. A band counts as the one device for its boundary.

## 3. Typography

Per Brand Guidelines: Orbitron for page headings/titles (avoid very long or small lines), Inter for body/subheadings, Source Code Pro for monospaced/stylistic elements.

| Role             | Font                    | Weights     | Where                                                                                                                                                        |
| ---------------- | ----------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Display/headings | **Orbitron** (variable) | 600–700     | `display` and h1–h3 only. Never below h3 size, never italic, never long lines (≤ ~40 chars/line).                                                            |
| UI & body        | **Inter** (variable)    | 400/500/600 | Everything else: body, h4–h6, nav, buttons, forms, captions                                                                                                  |
| Data voice       | **Source Code Pro**     | 400/600     | Every small-caps label (eyebrows, chips, spec labels), stat numerals, countdowns, dates, codes; a year inside a sentence stays in the sentence's font        |
| Annotation hand  | **Architects Daughter** | 400         | Hand-markup annotations only (≤ 5 words): leader notes, corrections, the handwritten link a note points at. Never UI chrome, body copy, headings, or labels. |

**Nine text roles, three line heights.** Pick the role the text plays; its size, leading and font follow. Sizes are fluid between 360px and 1440px viewports.

| Role      | Size (min → max)      | Line height   | Font                                                     |
| --------- | --------------------- | ------------- | -------------------------------------------------------- |
| `display` | 2.5rem → 4.25rem      | tight (1.1)   | Orbitron 700 — the hero heading only                     |
| `h1`      | 2rem → 3rem           | tight (1.1)   | Orbitron 700                                             |
| `h2`      | 1.5rem → 2.25rem      | tight (1.1)   | Orbitron 600                                             |
| `h3`      | 1.25rem → 1.5rem      | snug (1.3)    | Orbitron 600                                             |
| `h4`      | 1.125rem → 1.25rem    | snug (1.3)    | Inter 600 — card titles, subheads                        |
| `lead`    | 1.0625rem → 1.1875rem | relaxed (1.6) | Inter 400 — a section's intro paragraph                  |
| `copy`    | 1rem → 1.0625rem      | relaxed (1.6) | Inter 400 — all reading text; the default                |
| `small`   | 0.875rem              | relaxed (1.6) | Inter 400/500 — captions, meta, card body in dense grids |
| `label`   | 0.6875rem → 0.75rem   | snug (1.3)    | Source Code Pro 600, uppercase, +0.05em tracking         |

- **Eyebrows are labels**: `label` in `primary-bright` (or `muted`) above a heading. There is no second caps style.
- **Stats are data at `h2` size**: Source Code Pro 600, tight, tabular figures, `primary-bright` (the `stat` utility).
- The size role for reading text is `copy` rather than `body`, which is the color (§2): `text-copy` is the size, `text-body` the color.
- **Inter ships with its weight axis trimmed to 400–700** and cannot render heavier (`docs/adr/0011-inter-weight-axis.md`). Widening the range means re-instancing the committed file (`docs/adr/0014-vendored-fonts.md`), not just a utility class.
- Prose measure: 65–75ch (`measure`).
- Headings: sentence case; one `h1` per page; no skipped levels; never "SC2" in a heading (§1).

## 4. Spacing, radius, elevation

**Spacing — nine steps.** Use these, by context. Other values are allowed when a layout genuinely needs one, but they are the exception a reviewer asks about, not a choice to make.

| Step (Tailwind) | 1   | 2   | 3   | 4   | 6   | 8   | 12  | 16  | 24  |
| --------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| px              | 4   | 8   | 12  | 16  | 24  | 32  | 48  | 64  | 96  |

- **Inside a component** (padding, the gap between a label and its value): 8 · 12 · 16 · 24. Cards are 24 inside; chips 4 × 8.
- **Between components** (grid gaps, stacked blocks): 24 · 32 · 48.
- **Section rhythm**: 64 on mobile, 96 from `md` (`section-y`), consistent on every section, and never doubled: two sections on the same ground share one padding at their boundary, and no component margin (the footer included) adds to a section's padding. A band keeps its padding on both sides of its edge.
- `tokens.css` carries the same steps as `--sc2-space-1` … `--sc2-space-24` (the Tailwind numbers), so a surface without Tailwind uses the same names.

**Radius — three kinds of object.** Ask what kind of thing it is; the radius follows.

| Token       | Value | Kind of object                                                |
| ----------- | ----- | ------------------------------------------------------------- |
| `radius-sm` | 4px   | **Stamped**: chips, spec labels, badges, the icon plate       |
| `radius-md` | 8px   | **Control**: buttons, inputs, toggles                         |
| `radius-lg` | 12px  | **Cut**: pockets, plates, panels, framed media — one end-mill |

Nothing else; pill radii are banned. **Nested corners**: an inner radius is the outer radius minus the inset between them, never below 4px (a photo inset 8px in a pocket takes 4px).

**Elevation — drafted, not rendered**: depth is drawn the way a draftsman draws it, or cut. Pockets on the ground go _down_ (§2 pocket anatomy). What rises is drawn with **zero-blur offsets in `ink`, down-right only**: `--sc2-shadow-drafted-1` (3px, a keycap at rest), `--sc2-shadow-drafted-2` (6px, framed media), `--sc2-shadow-press` (1px, a pressed keycap). The plate's contact shadow is the one soft shadow, and only a plate — or a print laid on a band — takes it. Blurred drop shadows and glows stay banned everywhere else; a pocket on the ground never rises.

## 5. Layout & navigation

- Container: `max-w-6xl` (72rem) + `px-4`/`px-6`. Heroes and accent rules full-bleed; content aligned to container.
- Grids: 1-col → 2-col (≥ md) → 3-col (≥ lg). **No orphan rows**: plan the math (5 cards = intentional 2+3).
- Where the item count is data rather than a design choice (a sponsor tier), the column count follows the count: a lone item takes a **full-width feature row** (feature pocket, logo and text side by side ≥ md), two and four sit in pairs, three share one row, five and up use the 3-col grid. A row is never mostly empty.
- Breakpoints: Tailwind defaults + `3xl` = 120rem. Design mobile-first at 360px.
- **Header (sticky)**: sticky on all viewports, condensing slightly after scroll (pure CSS); `background`/95 with blur fallback, bottom hairline. Desktop: the **full-width lockup** — the Light lockup (`logo-white-full.svg`) on the dark finish, the Dark lockup (`logo-black-full.svg`) on the light finish, 40px tall — then About / Programs ▾ / Sponsors / Donate, the **mode toggle**, and the primary "Get involved" button. Mobile: the **square mark alone** (brand rules forbid subbing "SC2"; the full name must appear in page content — hero/footer satisfy this).
- **Mode toggle**: a 44px square neutral keycap (§8) holding a sun icon on the dark finish and a moon on the light, labelled "Switch to light mode" / "Switch to dark mode". Every page opens **dark**; a visitor's choice is remembered (`localStorage`, key `sc2-mode`) and applied by an inline script in `<head>` before first paint, so a light-mode visitor never sees a dark flash. On mobile it sits in the menu sheet above the pinned buttons.
- **Programs**: desktop hover/focus dropdown (FLL, FRC, Robots, Calendar) whose click/tap target is a real **`/programs` hub page** — zero-JS fallback and the mobile path. Never hover-only.
- **Mobile menu**: full-height sheet; ≥ 48px rows (About, Programs, Sponsors, Donate, Calendar); "Get involved" and "Donate" as large buttons pinned at the bottom; Esc/backdrop closes; `aria-expanded` wired. Nothing is more than two taps away.
- The about page: single flowing column (prose measure) with photo groupings as interleaved timeline sections.

## 6. Motion

CSS-only, except the two sanctioned scripts (the hand-markup entrance observer and the mode toggle). Motion confirms — it never decorates.

- Durations: 150ms (hover/focus), 250ms (menus, accordions), 500ms (scroll-in entrances). `ease-out` entrances, `ease-in-out` toggles.
- **Keycaps** (§8): hover lifts the face 1px up-left as its offset grows to 4px; `:active` presses it 2px down-right onto a 1px offset. 150ms `ease-in-out`, `translate` and `box-shadow` only. Reduced motion keeps the offsets and drops the translate, so every state still reads. A card's footer arrow nudges 2px on hover under the same rule.
- Switching finish does not animate: colors change at once.
- Only `opacity` and `transform` animate.
- Scroll entrances: single fade-up (8px), once; CSS scroll-driven animations with content-visible-by-default fallback.
- Hero video: `preload="none"`, poster-first, plays in-view; `prefers-reduced-motion` disables video autoplay and all entrances. No parallax anywhere.
- Carousels: CSS scroll-snap, user-driven; sponsor strip may slow-marquee — pausable, reduced-motion-off.

## 7. Imagery & art direction

- **Real photos of real students and robots** are the brand. Stock and unDraw illustrations retire wherever a photo can serve.
- Text over photos requires a scrim built from `background`. On the dark finish: 100% at the text edge → ~20% opposite. On the light finish the scrim holds **solid ground across the copy column** (100% to 30% of the width), eases to 86% by the middle and ~28% at the far edge, and the photo is pulled back slightly (saturate 85%, contrast 92%, brightness 104%) so it sits in the aluminum rather than punching through it; the hero's drafting grid draws in ink. **On mobile, heroes put text on solid ground below the photo** (photo fades into `background` via bottom gradient) — never gamble on scrims at small sizes.
- On a blueprint page, photos go duotone: grayscale, multiplied with the print's blue.
- **Logos drawn for a dark ground** — every sponsor and _FIRST_ logo the site holds — keep that ground on the light finish: they sit on a **print** (`print`, brand Background Black, `radius-md`), which is transparent on the dark finish. Never recolor a partner's logo to fit the finish.
- Photo treatment: `radius-lg` framed in sections; full-bleed only in heroes. Consistent warm/neutral grading.
- Every image: honest `alt`; decorative pattern/grid SVGs `aria-hidden` with `alt=""`.
- OG images (1200×630): photo + scrim + Orbitron title + lockup; one template, per-section variants. Always the dark finish.
- **Logo usage** (Brand Guidelines p.4–5): the **Light full-width lockup** (`logo-white-full.svg`) on dark chrome and the **Dark lockup** (`logo-black-full.svg`) on light chrome — the header ≥ md and the footer; the color lockup's Foundation Gray wordmark is too faint for the organization's own name on either. The color lockup is for large sizes. The **color square mark** stays on mobile and in the favicon in both finishes — its gear carries no text. Never recolor, never set the name in another font as a substitute for the lockup where the lockup fits.

## 8. Components tone

- **Buttons are keycaps** (§4, §6): `primary` — the accent fill + its near-black label standing on a 3px drafted edge in the accent sunk into `ink` (primary 35%); hover lifts, `:active` presses, and the fill never dims. `outline` — the neutral keycap: opaque `sheet` face, 1px `control-edge` border, `foreground` text, an `ink` drafted edge; hover warms the border to `primary`. `ghost` and `secondary` stay flat. One primary per view region. Min touch target 44×44px (nav CTA included). `radius-md`. A hero's actions stack full-width below `sm`, so a wrapped pair never shows two widths.
- **Links**: three forms and no fourth. _In copy_: the hand underline (§2.14); a featured link adds the swipe. _In chrome_ (nav, footer, card footers): `ui-link` — `foreground`, no underline at rest, a straight 1px machined hairline on hover/focus. Chrome is a different layer from copy and never takes the hand stroke. _As a reference_: a linked logo or figure with a `Callout` beneath naming the destination (`REF — firstinspires.org`). A link that is an action is a button, not a link. External links: icon at 0.8em + `rel="noopener"`.
- **Cards**: pocket anatomy per §2. FeatureCard carries **one identity mark**: a photo when it has one, otherwise an icon on a **stamped plate** (36px square, 1px 40%-alpha `primary` border, `radius-sm`, transparent fill, `primary-bright` 20px icon) — never both, and never a filled tile. Then an `h4` title with its spec chip on the same line, the 32px accent rule, `body` copy, optional footer link.
- **Chips/spec labels**: `label` style — uppercase, tracked, 1px 40%-alpha border in the chip's color, transparent bg, `radius-sm`. Ages ("AGES 9–16"), sponsor tiers, event dates. Tier colors, dark / light: platinum `#CBD5E1` / `#475569`, gold `#FACC15` / `#854D0E`, silver `#A3A3A3` / `#52525B`, bronze `#D08954` / `#9A3412`.
- **Stat band**: SCP stat numeral (§3) + Inter caption in `body`, on a pocket (feature moments get the grid floor) — a plate when it sits in a band.
- **Forms**: visible `Label` above every field; `card` bg inputs, 1px `border`, focus = `ring` 2px; errors in the destructive text token with icon + `aria-describedby`.
- **Icons**: **IBM Carbon** (`@carbon/icons`), the 32px masters, filled in `currentColor`, rendered at 16 / 20 / 24 / 32px — engineering glyphs drawn on a square grid, including the brand logos the footer needs. One set, never mixed with another. Always with text or an `aria-label`. No emoji as UI.
- **Long-form prose** (pages carrying an argument rather than a grid — about, news, an event body, a wiki page): one flowing column at prose measure. Lists take `primary` markers (or tick marks, §2.19, for checklists), `body` text, and one level of nesting at most. Blockquotes take a 2px `primary` rule on the leading edge and `lead` `foreground` text, with the attribution beneath in `muted` `small` — no quote glyphs, no italics. Paragraph rhythm 16px, with 32px above a heading that follows copy.

## 9. Accessibility

- WCAG 2.2 AA minimum everywhere; **body text AAA (≥ 7:1)** per §2, in both finishes and both registers. Contrast pairs verified at build time on `/styleguide` (computed ratios rendered); token changes must re-verify.
- The light finish's yellow link underline is below 3:1 against the ground; the link is still identified by its shape, and hover and focus both change the text color.
- Focus: 2px `ring` (accent text color) + 2px offset on every interactive element, never removed.
- Keyboard: everything operable; skip link first in DOM; `aria-current="page"` in nav; menus close on Esc; the mode toggle is a real `<button>` whose label names the finish it switches to.
- Landmarks: one `header`/`main`/`footer`; labeled `nav`s; headings form an outline.
- Touch targets ≥ 44px; hover-only affordances forbidden (dropdowns have focus + tap paths per §5).
- `prefers-reduced-motion` honored globally; `color-scheme` set by the finish.

## 10. Do / Don't

| Don't                                                                       | Do                                                                                                 |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Elevated lighter-than-page cards on the ground (the stock AI dark-UI look)  | Pockets on the ground; a lighter plate only where it lies on a band (§2)                           |
| A light mode that inverts the dark one                                      | The same part in a second finish: pockets still cut, plates still rise                             |
| Bare, unmodulated `background` voids between sections                       | One atmosphere device per boundary: ambient pool, grid bubble, ruler divider, or ink band (§2)     |
| Circuit-board wallpaper; a grid behind body copy on the ground              | Engineering grid + dimension ticks, ≤ 7%; the drafting grid in bands, heroes and blueprint margins |
| Yellow text on the light finish                                             | Ink text with a yellow marker; deep amber only for small labels and icons                          |
| Yellow words, yellow underlines, and blue links competing in one viewport   | One action accent per view; blue only in its informational role                                    |
| Orange button on the green FRC page                                         | The page's accent set                                                                              |
| Hero copy on a busy photo behind a thin scrim on mobile                     | Text on solid ground below the photo (§7)                                                          |
| Body copy in `muted` or dimmer                                              | `body` minimum; muted is captions-only                                                             |
| Orbitron paragraphs, tiny Orbitron labels, Orbitron stats                   | Orbitron = display and h1–h3; **SCP owns numbers and every label**                                 |
| A size, space or radius picked by eye                                       | The role (§3), step (§4), or kind of object (§4) it is                                             |
| "SC2" in a heading; "Scstem" in prose                                       | Full name (capitalized STEM); SC2 only in prose with the full name present                         |
| Faking the logo: gear SVG + name in Inter                                   | Real lockup assets: full-width on desktop chrome, square mark on mobile                            |
| Pill-shaped UI (`border-radius: 999px` capsules)                            | Radius tokens only; circled words are marker ovals (§2.12)                                         |
| 5 cards centered as 3+2 with a floating orphan                              | Grid math planned: intentional 2+3                                                                 |
| Blurred shadows and glows; lifting a _pocket_                               | Drafted zero-blur offsets on controls and framed media; plates only on a band                      |
| Two bands touching; a band carrying a second device                         | A sheet section between bands; the band is its boundary's one device                               |
| A sketched arrow pointing from typeset text; a revision cloud as decoration | Arrows start at handwriting (§2.15); clouds mark real changes (§2.16)                              |
| A button that dims on hover                                                 | A keycap that lifts, then presses                                                                  |
| Icons from two sets on one page                                             | Carbon only (§8)                                                                                   |
| `alt="image"` / missing alt                                                 | Descriptive alt or explicit `alt=""`                                                               |
| Generic hero copy ("Empowering the future…")                                | Specific, local, human                                                                             |

## 11. Change process

DESIGN.md changes ship as PRs with a rendered before/after (screenshot or `/styleguide` diff) and owner review. Implementation follows the doc — when code and doc disagree, the doc wins; when the doc is silent, add to it before building. A token change is an edit to `src/styles/tokens.css`, and `/styleguide` re-gates it in every finish, register and accent on the next build.
