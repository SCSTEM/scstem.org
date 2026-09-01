# Phase 07 — Remaining pages

**Prerequisites:** Phase 06 **including owner sign-off**.
**Stack layers:** the groups below may land as sub-layers `overhaul/07a-…` through `overhaul/07d-…`, stacked in group order on `overhaul/06-homepage` (D23) — or as one `overhaul/07-pages` layer with one commit series per group. Groups are content-independent and can be *built* by parallel agents (worktrees), but they *land* in stack order.

## Objective

Port every remaining non-event route at DESIGN.md quality with verbatim legacy copy (D8). URLs unchanged (D17). Every page: BaseLayout, unique title + description, breadcrumbs JSON-LD where nested.

Shared rules for all groups:
- Reference the legacy page for copy/content inventory only; rebuild with `ui/` + primitives.
- Images via astro:assets with explicit dimensions (sources may still be heavy — Phase 09 fixes sources; markup must already be responsive: `widths`/`sizes`, lazy below the fold).
- Any repeating content discovered that should be a collection → add to Phase 04's collections in the same PR (schema + ADR note), don't inline it.
- **Copy porting trap** (overview standing rule 4): a line break before an inline `<em>`/`<code>`/component collapses the preceding space in Astro's output. When porting prose, diff the *rendered* visible text against legacy, not the source.
- The pages here are already linked from `nav.primary` in `src/data/site.ts` — do not add ad-hoc links; if a page's title differs from its nav label, the nav label wins in chrome. `/contact` is deliberately not a nav route (the 404 page titles it literally).

## Group A — About & Sponsors

### `/about` (`legacy/src/app/about/page.tsx` + `components.tsx`)
- Port history/mission copy; team-year photo section renders from `frc/team-photos` + `fll/team-photos` collections (replaces 14 hardcoded imports). Consider a `Carousel` primitive or a grid per DESIGN.md.
- `breadcrumbs()` JSON-LD.

### `/sponsors` (`legacy/src/app/sponsors/page.tsx`)
- Grid grouped by level (Badge for tier), from the collection, `active: true` only; "become a sponsor" CTA + sponsor-packet link from `site.ts`.
- Optional past-sponsors acknowledgment section (active:false, name-only) — implementer's judgment, flag in PR.

## Group B — Contact, Donate, Get involved

### `/contact` (`legacy/src/app/contact/page.tsx`, `legacy/src/components/forms/*`)
- Rebuild form with Input/Textarea/Label/FieldError primitives: native validation attributes + a small vanilla `<script>` for fetch submit to the existing `/api/form/submit` Pages Function, inline success/error states, disabled-while-pending.
- Turnstile: vanilla widget (`https://challenges.cloudflare.com/turnstile/v0/api.js` with `defer`, explicit render into a div) — replaces the React wrapper. Site key via `PUBLIC_TURNSTILE_SITE_KEY` env (document in `docs/tooling.md`; dev uses the always-pass test key from `legacy/.env.development`).
- No-JS fallback: form still renders; if fetch-submit requires JS, include a `<noscript>` note with the contact email.
- `functions/` stays as-is this phase; only fix types/lint if `check` requires.

### `/donate` (`legacy/src/app/donate/page.tsx`)
- `donateCards` → typed const in frontmatter; CTAs to donate/wishlist URLs from `site.ts`.

### `/get-involved` (`legacy/src/app/get-involved/page.tsx`)
- Keep the embedded Google Form; lazy-load the iframe (`loading="lazy"` + optional click-to-load facade if DESIGN.md prefers); intro copy + fallback direct link to the form URL from `site.ts`.

## Group C — Programs (FRC/FLL)

### `/programs` (new — the hub page backing the nav dropdown, D26)
- No legacy counterpart. Program cards for FLL and FRC (same `ui/` components as the homepage programs section, fuller copy), plus links to Robots and the calendars. Title/description written fresh; breadcrumbs JSON-LD. This is the tap target for "Programs" on touch/no-JS (Phase 05 navbar).

### `/programs/frc` (`legacy/src/app/programs/frc/page.tsx` + `components.tsx`)
- ProgramLayout `theme="frc"`. Port copy/sections; team identity (Biohazard) media from `src/assets/frc/`.

### `/programs/fll` (`legacy/src/app/programs/fll/page.tsx`)
- ProgramLayout `theme="fll"`. Port copy.

### `/programs/frc/robots` (`legacy/src/app/programs/frc/robots/page.tsx`)
- Renders `frc/robots` collection newest-first: robot cards/sections with image, name, game, achievements, prose body.
- Replace `react-scroll-parallax` background with a static treated image or CSS-only effect per DESIGN.md motion rules. The 11.3 MB background source gets resized properly by astro:assets markup now, re-encoded in Phase 09.
- Breadcrumbs JSON-LD (Programs → FRC → Robots).

## Group D — Calendars (D19)

### New Pages Function: `functions/api/calendar/[name].ts`
- Validates `name` against the calendar IDs in a shared server-side map (mirror `site.ts` values; functions can't import from `src/` — duplicate the two IDs with a comment pointing at `site.ts`).
- Fetches the calendar's public ICS feed server-side, parses upcoming events (next ~90 days) into JSON `{title, start, end, location, description}[]`. Parse with a minimal hand-rolled ICS parser (the feed shape is stable) — avoid adding a heavy dependency; if parsing proves gnarly, a micro ICS lib is acceptable with an ADR.
- Cache: `Cache-Control: public, max-age=900` + CF cache API.

### `/calendar/frc`, `/calendar/sc2` (`legacy/src/app/calendar/[name]/page.tsx`)
- Static paths for `frc` | `sc2` (keep `[name].astro` with `getStaticPaths`).
- Branded agenda list rendered by a small vanilla `<script>` fetching `/api/calendar/<name>`; Skeleton primitive while loading; error state.
- No-JS/agent fallback rendered statically: a link "View on Google Calendar" (public embed URL) — always present.

## Acceptance criteria

- [x] **`.lycheeignore` is deleted.** It exists only because the Phase 05 app shell links to the routes this phase builds; `tools/checks/stale-link-ignores.mjs` fails CI for any entry whose page has landed, so entries must be removed as each group ships. This phase is not done while the file exists. *(The guard script and its CI step went with it — a check that can now only ever no-op.)*
- [x] **`src/layouts/ProgramLayout.astro`'s `knip.jsonc` entry is deleted** — the program pages built in Group C are its real consumers, so the seam closes with them (same mechanism as Phase 08's `event-date` entry).
- [x] All routes above build at their exact legacy URLs; visible-copy parity per page (intentional diffs listed in PRs).
- [x] No page defines colors/spacing outside tokens; all imagery through astro:assets with dimensions.
- [ ] Contact form: successful submit verified against the real function on a preview deploy (test Turnstile key), error path exercised. **Error path exercised; the success path needs the preview deploy** — `astro preview` serves static output and does not run Pages Functions, and this development environment's egress proxy blocks `challenges.cloudflare.com`, so Turnstile cannot issue a token here.
- [ ] Calendar pages show live events on preview; no-JS fallback link present in static HTML. **Fallback link verified in the static HTML of both routes, and the agenda verified end to end — the real parser and the real page script — against a synthetic Google feed covering recurrence, exclusions, overrides, all-day and multi-day events, and a DST transition. Not yet run against the live feed:** the egress proxy blocks `calendar.google.com`, so this needs the preview deploy too.
- [x] Each page: unique title + description, breadcrumbs JSON-LD on nested routes, Lighthouse A11y = 100 spot-checked. *(axe-core over WCAG 2.2 AA + best-practice reports zero violations on every route at 390px and 1440px — a superset of Lighthouse's accessibility audit. Lighthouse itself arrives with the Phase 09 budgets.)*
- [x] `react-hook-form`, `valibot`, `@marsidev/react-turnstile`, `react-scroll-parallax`, `react-player` have no successors in the new tree (knip stays green).
- [x] `pnpm check && pnpm build` green.

## Verification notes

Driven against the production preview in the pre-installed Chromium at 390px and 1440px. The
`chrome-devtools` MCP the overview's standing rule 9 names could not start in this environment
(`chrome-devtools-mcp` is not on PATH and `mise` could not be installed), so Playwright drove the
same checks: per-route console and page errors, horizontal overflow, heading outline, `alt`
coverage, explicit image dimensions, and axe-core.

Two things a preview deploy still has to confirm, both blocked by this environment rather than by
the code: a real Turnstile round trip on the contact form, and the calendar agenda against
Google's live feed.
