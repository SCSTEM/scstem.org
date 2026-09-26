# 0004 — `heroImageAlt` on the `events` collection

- **Status:** accepted
- **Date:** 2026-08-31

## Context

Phase 08 renders `events` entries through `EventLayout`, whose first element is a hero photo. The
schema Phase 04 shipped carries `heroImage` and no alternative text for it, so the layout had no
honest text to put in `alt` — the three candidates on hand were the event title (which repeats the
`<h1>` a reader already has), the meta `description` (a sentence written for search results, not
for someone who cannot see the photo), or `alt=""`, which asserts the photo is decorative. It is
not: DESIGN.md §7 makes photographs of students and robots the brand, and §7 requires an honest
`alt` on every image.

`frcRobots` already establishes the pattern — `image` optional, `imageAlt` alongside it — so this
is the same field the sibling collection has, not a new idea.

## Decision

Add `heroImageAlt: z.string().optional()` to `events`, and make `EventLayout` throw at build when
`heroImage` is set without it.

The pairing is enforced in the layout rather than in the schema because zod would express it as a
cross-field refinement, which turns the object into a `ZodEffects` and costs the flat, single-pass
shape D2 keeps the collections in for a future git-backed CMS. The layout throw is the same
mechanism `Seo.astro` already uses for `ogImage`/`ogImageAlt`, and it fails the build with the
entry's id in the message.

`heroImageAlt` is optional rather than required because an event with no `heroImage` falls back to
a photo of its program, and that photo's alt belongs to the layout that chose it, not to the entry.

## Consequences

- Both migrated entries gained an `alt`; a new event without one still publishes, on its program's
  fallback hero.
- A schema change, so this record exists per `AGENTS.md`. The field is a flat optional string, so
  nothing about the CMS-readiness of the collection changes.
- `docs/content.md` documents the field next to `heroImage`.
