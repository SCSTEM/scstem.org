import { defineCollection, reference, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { PROGRAM_KEYS } from "@/data/site";

// Schemas stay flat (no nested objects or unions) so a git-backed CMS can be added later.

/** Declaration order is the ranking; sort by index here. */
export const SPONSOR_LEVELS = ["Platinum", "Gold", "Silver", "Bronze", "Friend"] as const;

const sponsors = defineCollection({
  loader: glob({ base: "src/content/sponsors", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.strictObject({
      name: z.string(),
      level: z.enum(SPONSOR_LEVELS),
      url: z.url().optional(),
      logo: image().optional(),
      /** `false` retires a sponsor without deleting the record. */
      active: z.boolean().default(true),
      since: z.number().int().optional(),
      /** Qualifier shown under the name, e.g. a chapter or post. */
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
      subtitle: z.string().optional(),
      program: z.enum(PROGRAM_KEYS),
      start: z.date(),
      end: z.date().optional(),
      // Default to the workspace; set only for an off-site event.
      locationName: z.string().optional(),
      locationAddress: z.string().optional(),
      directionsUrl: z.url().optional(),
      description: z.string(),
      /** Falls back to the program's photo; an image without `heroImageAlt` fails the build. */
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
      registrationUrl: z.url().optional(),
      /** `hintLabels[i]` names `hintUrls[i]`; a length mismatch fails the build. */
      teaserUrls: z.array(z.url()).optional(),
      hintUrls: z.array(z.url()).optional(),
      hintLabels: z.array(z.string()).optional(),
      faq: z.array(reference("faq")).optional(),
      /** `true` redirects the page to its parent and drops it from the sitemap. */
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
 * One entry per season, robot or not. A season with no known robot omits `name` and `image`; an
 * `image` without `imageAlt` fails the build.
 */
const frcRobots = defineCollection({
  loader: glob({ base: "src/content/frc/robots", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.strictObject({
      year: z.number().int(),
      /**
       * Display override where a robot spans two seasons ("2020-2021"); `year` stays the sort key.
       */
      yearLabel: z.string().optional(),
      name: z.string().optional(),
      game: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      logo: image().optional(),
      /**
       * In the order played; an event starting with "FIRST Championship" marks a championship
       * season.
       */
      events: z.array(z.string()).optional(),
      result: z.string().optional(),
      /**
       * One per win: the same award at two events is two entries. Team awards only, not individual
       * honors.
       */
      awards: z.array(z.string()).optional(),
    }),
});

/** A field is all the site publishes about an alumnus: no name, role, or employer. */
export const ALUMNI_FIELDS = ["Software and IT", "Engineering", "Management", "Design"] as const;

const alumni = defineCollection({
  loader: glob({ base: "src/content/alumni", pattern: "**/*.md" }),
  schema: z.strictObject({
    field: z.enum(ALUMNI_FIELDS),
    program: z.enum(PROGRAM_KEYS),
  }),
});

export const OUTREACH_KINDS = ["school", "sponsor", "festival"] as const;

const outreach = defineCollection({
  loader: glob({ base: "src/content/outreach", pattern: "**/*.md" }),
  schema: z.strictObject({
    name: z.string(),
    kind: z.enum(OUTREACH_KINDS),
    description: z.string(),
    year: z.number().int(),
    /** Orders a year's appearances; the site does not print it. */
    month: z.number().int().min(1).max(12),
    place: z.string().optional(),
    url: z.url().optional(),
  }),
});

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
 * Collection names avoid slashes: Astro writes each editor JSON schema to
 * `.astro/collections/<name>.schema.json` without creating directories, so a name like
 * `frc/robots` warns on every build and loses frontmatter autocomplete.
 */
export const collections = {
  sponsors,
  events,
  faq,
  frcRobots,
  frcTeamPhotos,
  fllTeamPhotos,
  alumni,
  outreach,
};
