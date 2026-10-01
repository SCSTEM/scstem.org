# Phase 08 — Event landing pattern: /openhouse and /programs/frc/kickoff

**Prerequisites:** Phases 06, 07 (uses Hero/Section/FeatureGrid/FaqList vocabulary).
**Stack layer:** `overhaul/08-events`, stacked on the last Phase 07 layer (D23).

## Objective

Kill the seasonal-fork problem (D17): `/openhouse` (fork of homepage) and `/programs/frc/kickoff` (fork of FRC page) become thin routes rendering entries from the `events` collection through one `EventLayout`. Next season's event = edit one markdown file; hiding it = flip `hidden: true`.

## Reference

- `legacy/src/app/openhouse/page.tsx` (335 LOC; hero, program cards, FAQ array, date handling).
- `legacy/src/app/programs/frc/kickoff/page.tsx` (442 LOC; `KICKOFF_CONFIG`, countdown, schedule copy).
- Collection entries already migrated in Phase 04 (`events/openhouse.md`, `events/frc-kickoff.md`).
- **The shipped `events` schema deviates from early sketches** (Phase 04 notes are authoritative;
  read `src/content.config.ts` before building): flat `locationName`/`locationAddress` — both
  optional, defaulting to the workspace address in `src/data/site.ts` — plus `subtitle`,
  `teaserUrls`/`hintUrls`/`hintLabels` (kickoff media), and **no `displayDate`**: render dates
  from `start`/`end` with `formatEventDate` in `src/lib/event-date.ts`, never as hand-written
  prose.

## Tasks

### 1. `src/layouts/EventLayout.astro` + composed pieces

- Renders an `events` entry: Hero (heroImage or program-themed fallback), date/time/location block (semantic `<time datetime>`), body markdown (typographic styles per DESIGN.md), CTA (registration/cta from frontmatter), FAQ section from referenced `faq` entries (Accordion primitive), program theming via `program` field → `data-theme`.
- `Countdown.astro` (`ui/`): renders server-side absolute date always (agents/no-JS see the real date); a ~20-line inline script upgrades it to a live countdown; past-start state ("Happening now" / "This event has passed") handled in markup logic.
- **Structured data**: `event()` builder in `src/lib/jsonld.ts` (`@type: Event` — name, startDate/endDate ISO, location as `Place` built from `locationName`/`locationAddress` with the `site.ts` workspace defaults, organizer = the NGO org, image, eventStatus, offers if registrationUrl) and `faqPage()` (`@type: FAQPage` from the FAQ entries). Both emitted by EventLayout.

### 2. Routes

- `src/pages/openhouse.astro` and `src/pages/programs/frc/kickoff.astro`: fetch their entry by id, render EventLayout. ~15 lines each.
- **Hidden behavior**: when `hidden: true`, the route must not render content — emit a redirect to the most sensible parent (`/` for openhouse, `/programs/frc` for kickoff) via `Astro.redirect` at build (static: generates meta-refresh) **or** add a `_redirects` line; pick one, document it. Hidden events are excluded from the sitemap (wire in Phase 10's filter via a shared `getVisibleEvents()` helper in `src/lib/`).

### 3. Documentation

Extend `docs/content.md`: "Update the open house for a new season" (edit dates/copy), "Hide an event after it passes", "Create a new event page" (new .md + a thin route file — note the route file step until a dynamic `[event].astro` is justified; don't build the dynamic route now, two events don't earn it).

## Acceptance criteria

- [x] Both URLs render from collection data; zero copy hardcoded in the route files; visible-copy parity with legacy pages. _(Deviations listed under Implementation notes.)_
- [x] Flipping `hidden: true` on an entry removes the page content (redirect) with no code change; flipping back restores it. _(Verified by building both ways; the built page is Astro's meta-refresh stub, which also carries `noindex` and a canonical to the parent. The sitemap still lists a hidden event's URL — that filter is plan/10's, and `getVisibleEvents()` is here for it.)_
- [x] Event + FAQPage JSON-LD validate (Google Rich Results test, manual, once per template). **Validated against the schema.org shapes offline; the Rich Results test itself needs a public URL, so it runs on the preview deploy.** Both objects are emitted and well-formed in the built HTML.
- [x] Countdown shows correct absolute date without JS; upgrades with JS; handles passed events.
- [x] Program theming correct (kickoff = frc green).
- [x] The `src/lib/event-date.ts` entry is deleted from `knip.jsonc` — the event pages added here
      are its real consumers, so the seam has to close with them.
- [x] `pnpm check && pnpm build` green.

## Implementation notes

- **`heroImageAlt` was added to the `events` schema** (`docs/adr/0004`). The layout had no honest
  `alt` for a hero photo: the title repeats the `h1`, the `description` is written for search
  results, and `alt=""` would call a photo of students decorative. Optional, but supplying
  `heroImage` without it fails the build — the mechanism `Seo.astro` already uses for `ogImage`.
- **An event with no `end` never reads as passed.** Nothing in such an entry says when the event
  is over, and picking a duration would invent one. Kickoff gained the `end` its own meeting
  schedule states (`~4PM - Meeting Ends`), so both events have a real window; `docs/content.md`
  tells editors to always set one.
- **`site.location.name`** — the workspace needed a venue name for the `Place` in the event's
  structured data and for the info card's `LOCATION` row. It was previously only in legacy's
  `KICKOFF_CONFIG`.
- **Two dates written in prose are gone**, per the rule `docs/content.md` already states: the open
  house's hero sentence lost "Saturday, August 1 (1PM to 4PM)" (the countdown renders it from
  `start`/`end`), and kickoff's timeline entry is now "**Kickoff.**" rather than
  "**Kickoff - January 10.**".
- **Copy that did not come across from legacy `/openhouse`:** the two program cards (that is the
  homepage fork D17 exists to kill — `/programs` and the homepage carry them), and the embedded
  Google My Maps iframe plus its parking prose, which the `DIRECTIONS` row links to instead. From
  legacy kickoff: the modal holding the meeting schedule (the schedule is body copy now) and the
  two map-backed panels, whose content is the info card and the closing banner. Everything else is
  present, including the teaser and hint links.
- **`@typescript-eslint/no-misused-promises` is off for `.astro`** (`eslint.config.ts`). A `return`
  in frontmatter — how a page short-circuits into a redirect — has no enclosing function node in
  astro-eslint-parser's AST, and the rule asserts one exists, so it crashes rather than reporting.
  Same class of parser gap as the `no-unsafe-return` entry beside it.
- **`Accordion`/`AccordionItem` props gained `| undefined`** so `ui/FaqList` can forward its own
  optional `class`/`name` under `exactOptionalPropertyTypes`, exactly as `BaseLayout` documents.

## Verification notes

Both routes driven in the pre-installed Chromium at 390px and 1440px against the production
preview (`chrome-devtools-mcp` is still not on PATH in this environment, as in Phase 07, so
Playwright drove the same checks). Per route and width: zero axe-core violations over WCAG 2.2 AA
plus best-practice, no console or page errors, no horizontal overflow, every image carrying `alt`
and explicit dimensions, and a clean heading outline. The countdown's three states were each
rendered from a build (upcoming by dating the entry forward, passed from today's date, and the
script's own transitions read from the same markup).
