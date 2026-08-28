# Editing content

Everything on this site that changes over time is a markdown file in `src/content/`. You do not
need to touch TypeScript to add a sponsor, publish an event, or answer a new question.

Frontmatter is validated on build: a typo in a field name or a value that is not allowed fails
`pnpm build` with a message naming the file and the field. That is the safety net — if it builds,
the content is well-formed.

```sh
mise install && pnpm install   # once
pnpm dev                       # then edit files and watch the browser
```

## Add a sponsor

Two steps, about two minutes.

1. Put the logo in `src/assets/sponsors/`. SVG if you have it, otherwise PNG at roughly 400px
   wide. Prefer a version that reads on a dark background.
2. Create `src/content/sponsors/<name>.md`:

```md
---
name: Acme Manufacturing
level: Gold
url: https://www.acme.example/
logo: ../../assets/sponsors/acme.png
since: 2026
---
```

That is the whole file — no body text. Levels are `Platinum`, `Gold`, `Silver`, `Bronze`, and
`Friend`, and the sponsors page groups by them automatically.

Optional fields: `sub` for a qualifier shown under the name ("Chambersburg VFW Post 1599"),
`notes` for a reminder to yourself (never displayed).

### Retire a sponsor

**Do not delete the file.** Add one line:

```md
active: false
```

They drop off the sponsors page and the homepage strip, and the record stays in git — which is how
we can still say who supported us in 2022.

## Add or update an FAQ answer

Create `src/content/faq/<slug>.md`. The question is frontmatter; the answer is the body, so it can
use markdown — links, bold, lists:

```md
---
question: Do I need my own tools?
tags: [joining]
---

No. The workspace has everything you need, and we will show you how to use it safely.
```

Optional `program: frc | fll | sc2` if the answer only applies to one program.

The `slug` — the filename without `.md` — is how events refer to an answer, so keep it
descriptive and stable. Renaming a file means updating any event that lists it.

## Update the open house for a new season

Edit `src/content/events/openhouse.md`. The dates and location live in frontmatter; the page copy
is the body below it.

```md
---
title: Open house
program: sc2
start: 2026-08-01T13:00:00-04:00
end: 2026-08-01T16:00:00-04:00
displayDate: Saturday, August 1 (1PM to 4PM)
locationName: South Central STEM Collective Workspace
locationAddress: 20 South Main Street, Downtown Chambersburg
description: Shown in search results and when the page is shared. One or two sentences.
ctaLabel: Get involved
ctaHref: /get-involved
faq:
  - when-is-the-open-house
  - what-age-to-join
---
```

`start` and `end` are full timestamps **with the timezone offset** — `-04:00` in summer,
`-05:00` in winter. That offset is what makes the date correct for someone reading in another
timezone, and it feeds the event's structured data.

`faq` lists FAQ slugs to show on the page, in the order given.

### Hide an event after it passes

```md
hidden: true
```

The page redirects to its parent and disappears from the sitemap. Flip it back next season.

### Create a new event

Copy an existing file in `src/content/events/`, then add a route file for it — a
[thin page](../src/pages/openhouse.astro) that renders the entry. Two events do not yet justify a
dynamic route; when there are several, that is worth revisiting.

## Add a robot

`src/content/frc/robots/<year>-<name>.md`, with the photo in `src/assets/frc/robots/`:

```md
---
year: 2026
name: Example
image: ../../../assets/frc/robots/2026-robot-field.webp
imageAlt: Example on the competition field
achievements:
  - Industrial Design Award, Pittsburgh Regional
---

A paragraph or two about the robot: what it does, what makes it unusual, how the season went.
```

The robots page orders by `year`, newest first. `image` and `achievements` are optional — a robot
with no photo yet still gets a page entry.

## Add a team photo

`src/content/frc/team-photos/<year>.md` (or `fll/`), photo in `src/assets/team/frc/`:

```md
---
year: 2026
photo: ../../../assets/team/frc/2026.webp
alt: The Biohazard team in 2026
caption: '"Biohazard" - 2026'
---
```

`alt` describes the photo for someone who cannot see it; `caption` is the visible label. They are
different jobs, so they are different fields.

## News posts

The `news` collection is scaffolded but has no routes yet (that is phase-2 work). Copy
`src/content/news/template.md`, and leave the template itself as `draft: true`.

## Where things live

| What                                                 | Where                           |
| ---------------------------------------------------- | ------------------------------- |
| Sponsors, events, FAQ, robots, team photos, news     | `src/content/`                  |
| Images those files point at                          | `src/assets/`                   |
| Org facts, external URLs, calendar and analytics IDs | `src/data/site.ts`              |
| Page structure and copy that is not content          | `src/pages/`, `src/components/` |

## Sharp edges

- **Image paths are relative to the markdown file**, which is why they start with `../../`. If the
  path is wrong the build fails and names the file — it will not ship a broken image.
- **A mistyped FAQ slug in an event logs an error but does not currently fail the build**, so
  check the page renders the answers you expect after editing an event's `faq` list.
- **Do not add fields the schema does not define** — the build rejects them. If you need a new
  field, that is a schema change in `src/content.config.ts` and needs an ADR (`docs/adr/`), since
  the schemas are kept flat on purpose so a git-backed CMS can be added later.
