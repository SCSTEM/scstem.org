# Phase 05 — App shell: BaseLayout, SEO component, Navbar, Footer, 404

**Prerequisites:** Phases 02, 03, 04.
**Branch:** `overhaul/05-app-shell` off `astro-rewrite`.

## Objective

The chrome every page shares, with SEO correctness built in so page phases can't forget it: a `BaseLayout` whose props *force* good metadata, plus rebuilt Navbar/Footer per DESIGN.md.

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

### 4. Navbar — `src/components/ui/Navbar.astro`

Rebuild (reference `legacy/src/components/Navbar.tsx`, 261 LOC, for link inventory and grouping only):
- Semantic `<header><nav aria-label="Main">`, logo (Phase 02 treatment), current-page indication via `aria-current="page"`.
- Mobile: disclosure menu — button with `aria-expanded` + small inline script toggling; CSS transition; no focus trap needed (non-modal); Esc closes. Works at 360px.
- Desktop: programs dropdown (if legacy has one) via CSS `:focus-within`/popover attribute — keyboard reachable.
- Sticky behavior only if DESIGN.md says so; no scroll-linked JS.

### 5. Footer — `src/components/ui/Footer.astro`

Reference `legacy/src/components/Footer.tsx` (195 LOC) for content inventory: nav links, social icons (Icon primitive), contact info, legal line. All data from `src/data/site.ts`. Semantic `<footer>`, one `<nav aria-label="Footer">`.

### 6. 404 — `src/pages/404.astro`

Branded, helpful links (home, programs, contact), noindex. CF Pages serves `404.html` from static output automatically.

### 7. Placeholder wiring

Point `src/pages/index.astro` (still placeholder) at BaseLayout so the shell is visible on the preview URL and `/styleguide`.

## Acceptance criteria

- [ ] Omitting `description` on a page using BaseLayout is a type error.
- [ ] View-source on any page: title, description, canonical, OG/Twitter set, NGO JSON-LD present and valid (paste into Google Rich Results test manually once).
- [ ] Navbar: keyboard-only operation works (tab order, Esc, aria-expanded state); usable at 360px; zero JS beyond the disclosure toggle.
- [ ] Skip link functions; landmarks: exactly one `header`, `main`, `footer`, labeled `nav`s.
- [ ] Web manifest + icons valid (Lighthouse PWA-adjacent audits pass; no console 404s).
- [ ] `pnpm check && pnpm build` green.
