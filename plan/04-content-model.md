# Phase 04 — Content model: collections, schemas, data migration

**Prerequisites:** Phase 01 (Phase 02/03 not strictly required; can run in parallel with 03).
**Stack layer:** `overhaul/04-content-model`, stacked on `overhaul/03-primitives` (D23). (Content work has no code dependency on 02/03, but the stack is linear — landing order is fixed even when work is done in parallel.)

## Objective

All maintainable content moves out of code into zod-validated Astro Content Collections (markdown + frontmatter) and one typed config module. Editing content = editing a small file. Schemas stay flat and CMS-friendly (D2): strings, enums, booleans, dates, image paths — no nested cleverness.

## Structure

```
src/content/
├── sponsors/           # one .md per sponsor (all programs)
├── events/             # one .md per seasonal event (openhouse, kickoff, …)
├── faq/                # one .md per Q&A entry
├── news/               # scaffold only; empty + _TEMPLATE.md
├── frc/
│   ├── robots/         # one .md per season robot
│   └── team-photos/    # one .md per year photo entry
└── fll/
    └── team-photos/    # same schema as frc/team-photos
src/content.config.ts    # all collections, glob loaders, zod schemas
src/data/site.ts          # typed site config (not a collection)
```

FRC/FLL-specific content is always nested under `frc/`/`fll/` (D18). Cross-program collections (`sponsors`, `events`, `faq`, `news`) carry an optional `program: "frc" | "fll" | "sc2"` field instead.

## Tasks

### 1. Define collections in `src/content.config.ts`

Use the content-layer `glob()` loader and the `image()` schema helper so logos/photos are validated + processed by astro:assets.

- **`sponsors`** — migrate from `legacy/data/sponsors.ts`:
  ```
  name: string
  level: enum (keep legacy SponsorLevel tiers exactly)
  url: string.url().optional()
  logo: image()
  active: boolean (default true)
  since: number().int().optional()   # first year sponsoring
  notes: string.optional()
  ```
  Migrate **every** entry including the commented-out former sponsors (Wellspan, VFW, Fives, …) as `active: false` (D18). Logos move to `src/assets/sponsors/`. Any commented entry whose logo no longer exists: create the file with `active: false` and a `notes` field naming the missing asset; list these in the PR description for the owner.
- **`events`** (D17) — drives Phase 08's landing pattern:
  ```
  title, slug-independent route (route comes from page wiring, not collection)
  program: enum sc2|frc|fll
  start: date, end: date.optional()
  location: { name, address }  # flat strings
  description: string (meta description)
  heroImage: image().optional()
  cta: { label, href }
  registrationUrl: string.url().optional()
  faq: array of faq entry ids (reference("faq")).optional()
  hidden: boolean (default false)   # hidden => page 404s/redirects + excluded from sitemap
  ```
  Body markdown = the event's long-form copy. Seed: `openhouse.md` (from `legacy/src/app/openhouse/page.tsx` incl. its faq array and date logic) and `frc-kickoff.md` (from `legacy/src/app/programs/frc/kickoff/page.tsx` `KICKOFF_CONFIG` + copy).
- **`faq`** — `question` (frontmatter), body = answer markdown, `program` optional, `tags` optional. Seed from the openhouse FAQ array.
- **`news`** — schema now (`title`, `date`, `description`, `heroImage?`, `draft`), directory empty except `_TEMPLATE.md` showing the frontmatter. Exists so Phase 12 needs no code.
- **`frc/robots`** — from the inline JSX slides in `legacy/src/app/programs/frc/robots/page.tsx`:
  ```
  year: int, name: string, game: string
  image: image(), imageAlt: string
  achievements: string[] .optional()
  ```
  Body = the season/robot description prose extracted from the JSX.
- **`frc/team-photos`** + **`fll/team-photos`** — from the 14 static imports in `legacy/src/app/about/components.tsx`: `year: int`, `photo: image()`, `alt: string`, `caption?`.

### 2. `src/data/site.ts`

Typed constants module (single import site for site facts):
- Org: name ("South Central STEM Collective"), short name (SC2), legal/EIN if present in legacy footer, address, contact email, social URLs (from `legacy/src/components/Footer.tsx`).
- External URLs from `legacy/data/config.ts`: donate, wishlist, sponsor packet, get-involved form.
- Google Calendar IDs (from `legacy/src/app/calendar/[name]/page.tsx`) keyed by `frc` / `sc2`.
- Analytics IDs (GA4 `G-3TPD3DLYBR`, CF beacon token added Phase 10).
- Default SEO strings (site title, template, default description).

### 3. Editing documentation

`docs/content.md` — the "2-minute sponsor" guide: add/remove/deactivate a sponsor, add an event / hide last year's, add an FAQ, add a robot. Include exact file templates. Link from `AGENTS.md` and README. Note the CMS-future constraint: keep schemas flat; schema changes need an ADR.

### 4. Guardrail

Add a lint restriction (oxlint `no-restricted-imports` or a small check script in `check`) preventing `src/pages/**` from declaring inline content arrays of the legacy sort where a collection exists — enforcement is soft (review guidance in AGENTS.md) if a clean lint rule isn't feasible; don't over-engineer.

## Acceptance criteria

- [ ] `astro check`/build validates all collections; a deliberately broken frontmatter field fails the build with a readable zod error.
- [ ] Sponsor migration is lossless: every active + commented legacy sponsor is represented; count and names listed in PR description.
- [ ] Robots, team photos, FAQ, and both events fully migrated; no content invented — copy comes verbatim from legacy (D8: revision is Phase 12).
- [ ] `src/data/site.ts` replaces every hardcoded constant found in legacy pages (config URLs, calendar IDs, kickoff config).
- [ ] `docs/content.md` written; a non-author following it can add a sponsor without touching TS.
- [ ] `pnpm check && pnpm build` green.
