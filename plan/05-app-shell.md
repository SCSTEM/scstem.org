# Phase 05 — App shell: BaseLayout, SEO component, Navbar, Footer, 404

**Prerequisites:** Phases 02, 03, 04.
**Stack layer:** `overhaul/05-app-shell`, stacked on `overhaul/04-content-model` (D23).

## Objective

The chrome every page shares, with SEO correctness built in so page phases can't forget it: a `BaseLayout` whose props _force_ good metadata, plus rebuilt Navbar/Footer per DESIGN.md.

## Tasks

### 1. `src/components/Seo.astro`

Rendered inside `<head>` by BaseLayout. Props:

- `title: string` (required), `description: string` (**required** — compile error if missing), `ogImage?: ImageMetadata | string` (default: site-wide OG image), `ogType?: "website" | "article"`, `canonical?: URL` (default: `Astro.url` against `site`), `noindex?: boolean`.
- Emits: `<title>` with template `%s | South Central STEM Collective` (bare site title on the homepage), meta description, canonical link, full Open Graph set (`og:title/description/type/url/image` + image dimensions/alt), Twitter card (`summary_large_image`), `theme-color`.
- **No `keywords` meta** (legacy's 22-keyword list is dropped — obsolete signal).

### 2. JSON-LD foundation — `src/lib/jsonld.ts`

Typed builder helpers returning `schema.org` objects, serialized via a tiny `<JsonLd data={...} />` component (`<script type="application/ld+json">` with `JSON.stringify` — set:html safe since data is our own):

- `organization()` — `@type: NGO` (nonprofit): name, alternateName "SC2", url, logo, email, address, `sameAs` socials — all from `src/data/site.ts`. Emitted on every page via BaseLayout.
- `webSite()` — name + url, homepage only.
- `breadcrumbs(items)` — used by nested pages (Phases 07/08).
- (Event/FAQPage builders added in Phase 08.)

### 3. `src/layouts/BaseLayout.astro`

- HTML skeleton: `lang="en"`, `color-scheme` meta, viewport, font preloads (from Phase 02 `fonts.ts`), `global.css`, Seo component (props passed through — every page must supply title/description), favicon set, org JSON-LD, named slot for extra head (per-page JSON-LD).
- Body: skip link ("Skip to content"), `<Navbar />`, `<main id="main">` slot, `<Footer />`. Optional `theme?: "frc" | "fll"` prop → `data-theme` on `<html>`.
- Favicon/manifest set in `public/`: `favicon.ico` (carry over), new `icon.svg`, `apple-touch-icon.png` (180px), `site.webmanifest` (name, short_name SC2, theme/background colors from tokens, icons 192/512). Generate from the legacy logo asset.
- `src/layouts/ProgramLayout.astro`: thin wrapper setting `theme` — replaces the duplicated legacy FRC/FLL layouts.

### 4. Navbar — `src/components/ui/Navbar.astro` (spec: DESIGN.md §5, D26)

Rebuild (reference `legacy/src/components/Navbar.tsx`, 261 LOC, for link inventory only):

- Semantic `<header><nav aria-label="Main">`; **sticky on all viewports**, condensing slightly after scroll via pure CSS (scroll-driven animation with graceful no-support fallback); `background`/95 bg, bottom hairline.
- Identity: **full-width color lockup** (`src/assets/brand/logo-color-full.svg`, ~40px) on ≥ md; **square mark alone** on mobile (brand rules: never "SC2" as a name substitute; the full name appears in page content).
- Links: About / Programs ▾ / Sponsors / Donate + primary "Get involved" button (≥44px target). `aria-current="page"` states.
- **Programs dropdown**: CSS `:focus-within`/popover-attribute disclosure listing FLL, FRC, Robots, Calendar — while the "Programs" link itself navigates to the **`/programs` hub page** (Phase 07), so touch and no-JS users get a real destination. Keyboard reachable, Esc closes.
- Mobile menu: **full-height sheet** — ≥48px rows (About, Programs, Sponsors, Calendar), "Get involved" + "Donate" as large buttons pinned at the bottom; `aria-expanded` toggle script (~20 lines), Esc/backdrop close, body scroll locked while open.
  (Backdrop close is not implemented: the sheet is opaque and its nav fills it, so there is no
  backdrop to tap — the listener that claimed to do this could never fire. See the notes below.)

### 5. Footer — `src/components/ui/Footer.astro`

Reference `legacy/src/components/Footer.tsx` (195 LOC) for content inventory: nav links, social icons (Icon primitive), contact info, legal line. All data from `src/data/site.ts`. Semantic `<footer>`, one `<nav aria-label="Footer">`. Styled as a recessed `card` band (DESIGN.md §2) with the full-width color lockup — never a grayscale logo.

### 6. 404 — `src/pages/404.astro`

Branded, helpful links (home, programs, contact), noindex. CF Pages serves `404.html` from static output automatically.

### 7. Placeholder wiring

Point `src/pages/index.astro` (still placeholder) at BaseLayout so the shell is visible on the preview URL and `/styleguide`.

## Acceptance criteria

- [x] Omitting `description` on a page using BaseLayout is a type error — verified: `Property 'description' is missing in type '{ children: any; title: string; }' but required in type 'Props'`.
- [x] View-source on any page: title, description, canonical, full OG/Twitter set, and NGO JSON-LD present. Homepage also emits WebSite. (Rich Results test is blocked from this environment — `validator.schema.org` and `search.google.com` are not reachable — so that one manual check is outstanding; noted for Phase 10, which already tasks validating every JSON-LD shape.)
- [x] Navbar keyboard-only operation: skip link is the first tab stop and becomes visible on focus; the Programs panel is keyboard reachable and **Esc closes it**; the mobile toggle is 44×44, flips `aria-expanded`, locks body scroll, and Esc closes it and returns focus. Usable at 360px; the only script is the ~30-line sheet toggle. Verified in a real browser: the panel opens on click, closes on Esc and on light-dismiss, and exposes `expanded` in the accessibility tree; the sheet swaps its icon, locks scroll, marks the page behind it `inert` (only the close button stays focusable), and closes when the viewport crosses `md`.
- [x] Skip link functions; landmarks are exactly one `header`, `main`, `footer`, and three labeled `nav`s (Main, Mobile, Footer).
- [x] Web manifest + icons valid, no console 404s: `favicon.ico` carried over, `icon.svg` from the square mark, and 180/192/512 PNGs rendered from it.
- [x] `pnpm check && pnpm build` green.

### Notes and deviations

- **The Programs panel is a native `popover`, not a `:focus-within` disclosure.** The brief named
  both options; `:focus-within` has no dismissal path, so it could not satisfy this phase's own
  "Esc closes" requirement (§9: "menus close on Esc") and missed WCAG 2.2 SC 1.4.13. The
  `popover` attribute supplies Esc, light-dismiss, top-layer placement and the `expanded` state
  with no script — rung 1 of the primitives README's interactivity ladder. The `/programs` link
  keeps its real destination; the chevron beside it is the invoker.
- **Nav inventory lives in `src/data/site.ts`.** The header, the mobile sheet, the footer and the
  404 page each declared their own list, and they had already diverged. The desktop/sheet split is
  now the `surfaces` field on each entry, so it reads as a decision rather than an omission.
- **`ui-link`, `external-link` and `container-page` are utilities.** DESIGN.md §8's "UI links may
  drop underline at rest but underline on hover/focus" was half-implemented: twelve call sites
  wrote `no-underline` and no chrome link underlined on hover. Same for §8's external-link icon and
  §5's container gutters, which were a class string repeated at five sites.
- **The sheet marks the page behind it `inert`.** It is opaque and covers the viewport, so Tab past
  its last item used to walk every invisible link in `main` and `footer`.
- **The header lockup animates `scale`, not `height`.** `height` is not a compositor property, so
  the old keyframe relayouted the sticky header and reflowed the page on every scroll frame
  through the first 120px — against §6's "only `opacity` and `transform` animate".
- **`site.webmanifest` is a generated route.** It restated the org name, a third variant of the
  description, and both brand colours as literals. `src/pages/site.webmanifest.ts` builds it from
  `site.ts`, and its maskable entry points at a separate padded render: the plain 512 spans ~88% of
  its box, so a launcher mask clipped the gear teeth — reusing it was worse than declaring no
  maskable icon at all.

- **The mobile sheet has no backdrop dismissal.** The brief asks for "Esc/backdrop close". The
  sheet is `fixed inset-0` and opaque, and its `<nav>` is `h-full` — exactly the same box — so
  there is no backdrop, visible or hittable, and the `event.target === sheet` listener could never
  fire. Esc and the toggle are the two ways out. Reshaping the sheet into a narrower column just to
  create a tap target would be a design change, not a bug fix, so it is recorded here instead.
- **The offline link check needed an interim exclusion list.** The chrome built here links to ten
  routes Phase 07 builds (`/about`, `/sponsors`, `/contact`, `/donate`, `/get-involved`,
  `/programs`, `/programs/fll`, `/programs/frc`, `/programs/frc/robots`, `/calendar/sc2`), so
  lychee failed on every page carrying the header and footer — a correct finding about an
  unavoidable ordering problem, not a tooling bug. `.lycheeignore` excludes exactly those ten and
  nothing else, and `tools/checks/stale-link-ignores.mjs` fails CI if an excluded route has since
  been built, so the list cannot outlive its purpose. Phase 07's acceptance now requires the file
  to be gone.

- **`sharp` became a direct dependency.** The first real `<Image>` use made astro:assets need
  it; `pnpm-workspace.yaml`'s `allowBuilds: sharp` already anticipated this.
- **Icons were generated with sharp, not committed by hand.** `apple-touch-icon.png` is flattened
  onto the brand ground (`#262626`) because iOS ignores transparency and would otherwise composite
  it on black.
- **`exactOptionalPropertyTypes` forced a signature choice.** A layout that _forwards_ optional
  props passes explicit `undefined`, which that flag treats as distinct from an absent prop. The
  receiving props are therefore declared `?: T | undefined` rather than filtering props at each
  call site.
- **The OG image is legacy's `opengraph-image.png`**, moved to `public/og/default.png`. Phase 10
  produces the curated per-section set; inventing a template now would be work Phase 10 redoes.
- **Footer content grew slightly beyond legacy's inventory**: legacy had two link columns
  (Support us, Find us online) and pointed Donate at `/wiki/donations`. This version points Donate
  at the real `/donate` page and adds a Programs column (FLL, FRC, Calendar), because the footer
  is the only place a program link appears once the mobile sheet is closed. Copy is otherwise
  verbatim, including the 501(c)(3) line.
- **The header condense uses a scroll-driven animation** behind `@supports` and
  `prefers-reduced-motion`. Where unsupported the header keeps full height, which is the correct
  fallback.
- `src/lib/jsonld.ts`, `src/data/site.ts`, and `ProgramLayout.astro` are registered as knip
  entries: they are the shell's API and get consumed by Phases 07-08. Each carries a comment
  saying so, so the entries can be removed when they are genuinely referenced.
