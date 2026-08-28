import { glob } from "astro/loaders";
import { defineCollection, reference, type SchemaContext, z } from "astro:content";

/**
 * Every maintainable fact about this site lives in `src/content/` as markdown with validated
 * frontmatter. Editing content means editing one small file — see `docs/content.md`.
 *
 * Schemas stay deliberately **flat** (D2): strings, enums, booleans, dates, numbers, and image
 * paths. No nested objects beyond one level, no discriminated unions. That is what keeps a
 * git-backed CMS (Keystatic and friends) a later addition rather than a restructuring, and it
 * is why `location` below is two flat fields instead of an object. Schema changes need an ADR.
 */

const PROGRAMS = ["sc2", "frc", "fll"] as const;

/** Legacy's `SponsorLevel`, preserved exactly (`legacy/data/sponsors.ts`). */
const SPONSOR_LEVELS = ["Platinum", "Gold", "Silver", "Bronze", "Friend"] as const;

const sponsors = defineCollection({
  loader: glob({ base: "src/content/sponsors", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      level: z.enum(SPONSOR_LEVELS),
      url: z.string().url().optional(),
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
    z.object({
      title: z.string(),
      program: z.enum(PROGRAMS),
      start: z.date(),
      end: z.date().optional(),
      /** Human-readable date, for copy that should not be machine-formatted. */
      displayDate: z.string().optional(),
      locationName: z.string(),
      locationAddress: z.string(),
      directionsUrl: z.string().url().optional(),
      /** Meta description for the event's page. */
      description: z.string(),
      heroImage: image().optional(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
      registrationUrl: z.string().url().optional(),
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
  schema: z.object({
    question: z.string(),
    program: z.enum(PROGRAMS).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

/**
 * Scaffolded now so Phase 12 needs no code (D18). `template.md` is a real entry carrying
 * `draft: true`, deliberately: an excluded-by-glob template drifts from the schema silently and
 * leaves the collection empty, which warns on every build. As an entry it is schema-validated
 * and still never renders.
 */
const news = defineCollection({
  loader: glob({ base: "src/content/news", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
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
    z.object({
      year: z.number().int(),
      name: z.string(),
      /** The season's game, as FIRST named it. */
      game: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string(),
      achievements: z.array(z.string()).optional(),
    }),
});

/** FRC and FLL team photos are the same shape; the split is by directory (D18). */
const teamPhotoSchema = ({ image }: SchemaContext) =>
  z.object({
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
 * Collection *names* avoid slashes even though the content nests under `frc/` and `fll/` on disk
 * (D18): Astro writes each collection's editor JSON schema to
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
