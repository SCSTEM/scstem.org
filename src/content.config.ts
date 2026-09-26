import { defineCollection, reference, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { PROGRAM_KEYS } from "@/data/site";

/**
 * Every maintainable fact about this site lives in `src/content/` as markdown with validated
 * frontmatter. Editing content means editing one small file — see `docs/content.md`.
 *
 * Schemas stay deliberately **flat**: strings, enums, booleans, dates, numbers, and image
 * paths. No nested objects beyond one level, no discriminated unions. That is what keeps a
 * git-backed CMS (Keystatic and friends) a later addition rather than a restructuring, and it
 * is why `location` below is two flat fields instead of an object. Schema changes need an ADR.
 */

/**
 * Declaration order is display order, so anything listing sponsors sorts by index here rather
 * than restating the ranking.
 */
export const SPONSOR_LEVELS = ["Platinum", "Gold", "Silver", "Bronze", "Friend"] as const;

const sponsors = defineCollection({
  loader: glob({ base: "src/content/sponsors", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.strictObject({
      name: z.string(),
      level: z.enum(SPONSOR_LEVELS),
      url: z.url().optional(),
      logo: image().optional(),
      /**
       * `false` retires a sponsor without deleting the record — former sponsors stay in git as
       * data rather than as commented-out code.
       */
      active: z.boolean().default(true),
      /** First year of support, as shown on the sponsors page. */
      since: z.number().int().optional(),
      /** A qualifier shown under the name, e.g. a specific chapter or post. */
      sub: z.string().optional(),
      /** Maintainer notes. Never rendered. */
      notes: z.string().optional(),
    }),
});

const events = defineCollection({
  loader: glob({ base: "src/content/events", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.strictObject({
      title: z.string(),
      /** Hero subtitle, sitting directly under the title. Not a heading — it has no section. */
      subtitle: z.string().optional(),
      program: z.enum(PROGRAM_KEYS),
      start: z.date(),
      end: z.date().optional(),
      /**
       * Location is optional and defaults to the workspace from `src/data/site.ts` — only an
       * off-site event carries these, which also makes "off-site" a visible signal.
       */
      locationName: z.string().optional(),
      locationAddress: z.string().optional(),
      directionsUrl: z.url().optional(),
      /** Meta description for the event's page. */
      description: z.string(),
      /**
       * Omitting the image is fine — the page falls back to a photo of the event's program — but
       * supplying one without `heroImageAlt` fails the build (`docs/adr/0004`).
       */
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
      registrationUrl: z.url().optional(),
      /**
       * Season teaser videos, and this year's game hints, as flat parallel arrays (no
       * nested objects). `hintLabels[i]` names `hintUrls[i]`; a length mismatch fails the build.
       */
      teaserUrls: z.array(z.url()).optional(),
      hintUrls: z.array(z.url()).optional(),
      hintLabels: z.array(z.string()).optional(),
      /** FAQ entries to render on the page, by their file id. */
      faq: z.array(reference("faq")).optional(),
      /**
       * `true` takes the page out of service: it redirects to its parent and drops out of the
       * sitemap. This is how a past season is retired — one field, no code change.
       */
      hidden: z.boolean().default(false),
    }),
});

const faq = defineCollection({
  loader: glob({ base: "src/content/faq", pattern: "**/*.md" }),
  schema: z.strictObject({
    question: z.string(),
    program: z.enum(PROGRAM_KEYS).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

/**
 * No routes yet. `template.md` is a real entry carrying
 * `draft: true`, deliberately: an excluded-by-glob template drifts from the schema silently and
 * leaves the collection empty, which warns on every build. As an entry it is schema-validated
 * and still never renders.
 */
const news = defineCollection({
  loader: glob({ base: "src/content/news", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.strictObject({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const frcRobots = defineCollection({
  loader: glob({ base: "src/content/frc/robots", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.strictObject({
      year: z.number().int(),
      /**
       * Overrides `year` in display copy where a robot spans two seasons ("2020-2021"). `year`
       * stays the sort key.
       */
      yearLabel: z.string().optional(),
      name: z.string(),
      /** The season's game, as FIRST named it. */
      game: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string(),
      /** Per-robot wordmark overlaid on the photo, where a season had one. */
      logo: image().optional(),
      achievements: z.array(z.string()).optional(),
    }),
});

/** FRC and FLL team photos are the same shape; the split is by directory. */
const teamPhotoSchema = ({ image }: SchemaContext) =>
  z.strictObject({
    year: z.number().int(),
    photo: image(),
    alt: z.string(),
    caption: z.string().optional(),
  });

const frcTeamPhotos = defineCollection({
  loader: glob({ base: "src/content/frc/team-photos", pattern: "**/*.md" }),
  schema: teamPhotoSchema,
});

const fllTeamPhotos = defineCollection({
  loader: glob({ base: "src/content/fll/team-photos", pattern: "**/*.md" }),
  schema: teamPhotoSchema,
});

/**
 * Collection *names* avoid slashes even though the content nests under `frc/` and `fll/` on
 * disk: Astro writes each collection's editor JSON schema to
 * `.astro/collections/<name>.schema.json` without creating intermediate directories, so a name
 * like `frc/robots` warns on every build and silently loses frontmatter autocomplete.
 */
export const collections = {
  sponsors,
  events,
  faq,
  news,
  frcRobots,
  frcTeamPhotos,
  fllTeamPhotos,
};
