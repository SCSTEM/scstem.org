# Phase 08 — Event landing pattern: /openhouse and /programs/frc/kickoff

**Prerequisites:** Phases 06, 07 (uses Hero/Section/FeatureGrid/FaqList vocabulary).
**Stack layer:** `overhaul/08-events`, stacked on the last Phase 07 layer (D23).

## Objective

Kill the seasonal-fork problem (D17): `/openhouse` (fork of homepage) and `/programs/frc/kickoff` (fork of FRC page) become thin routes rendering entries from the `events` collection through one `EventLayout`. Next season's event = edit one markdown file; hiding it = flip `hidden: true`.

## Reference

- `legacy/src/app/openhouse/page.tsx` (335 LOC; hero, program cards, FAQ array, date handling).
- `legacy/src/app/programs/frc/kickoff/page.tsx` (442 LOC; `KICKOFF_CONFIG`, countdown, schedule copy).
- Collection entries already migrated in Phase 04 (`events/openhouse.md`, `events/frc-kickoff.md`).

## Tasks

### 1. `src/layouts/EventLayout.astro` + composed pieces

- Renders an `events` entry: Hero (heroImage or program-themed fallback), date/time/location block (semantic `<time datetime>`), body markdown (typographic styles per DESIGN.md), CTA (registration/cta from frontmatter), FAQ section from referenced `faq` entries (Accordion primitive), program theming via `program` field → `data-theme`.
- `Countdown.astro` (`ui/`): renders server-side absolute date always (agents/no-JS see the real date); a ~20-line inline script upgrades it to a live countdown; past-start state ("Happening now" / "This event has passed") handled in markup logic.
- **Structured data**: `event()` builder in `src/lib/jsonld.ts` (`@type: Event` — name, startDate/endDate ISO, location as `Place` with address, organizer = the NGO org, image, eventStatus, offers if registrationUrl) and `faqPage()` (`@type: FAQPage` from the FAQ entries). Both emitted by EventLayout.

### 2. Routes

- `src/pages/openhouse.astro` and `src/pages/programs/frc/kickoff.astro`: fetch their entry by id, render EventLayout. ~15 lines each.
- **Hidden behavior**: when `hidden: true`, the route must not render content — emit a redirect to the most sensible parent (`/` for openhouse, `/programs/frc` for kickoff) via `Astro.redirect` at build (static: generates meta-refresh) **or** add a `_redirects` line; pick one, document it. Hidden events are excluded from the sitemap (wire in Phase 10's filter via a shared `getVisibleEvents()` helper in `src/lib/`).

### 3. Documentation

Extend `docs/content.md`: "Update the open house for a new season" (edit dates/copy), "Hide an event after it passes", "Create a new event page" (new .md + a thin route file — note the route file step until a dynamic `[event].astro` is justified; don't build the dynamic route now, two events don't earn it).

## Acceptance criteria

- [ ] Both URLs render from collection data; zero copy hardcoded in the route files; visible-copy parity with legacy pages.
- [ ] Flipping `hidden: true` on an entry removes the page content (redirect) with no code change; flipping back restores it.
- [ ] Event + FAQPage JSON-LD validate (Google Rich Results test, manual, once per template).
- [ ] Countdown shows correct absolute date without JS; upgrades with JS; handles passed events.
- [ ] Program theming correct (kickoff = frc green).
- [ ] `pnpm check && pnpm build` green.
