import type { APIRoute } from "astro";

import { eventRoutes } from "@/data/events";
import { nav, programs, site } from "@/data/site";
import { getVisibleEvents } from "@/lib/events";

/**
 * The llms.txt convention (https://llmstxt.org): one plain-text map of the site, so an agent
 * answering "where can my kid do robotics near Chambersburg" reads a curated index instead of
 * crawling and guessing. Objective 4 — and the reason `robots.txt` blocks no AI crawler
 * (`docs/adr/0009-open-crawling-posture.md`).
 *
 * Every URL and program fact comes from `src/data/site.ts`; events come from the collection, so
 * a retired season disappears here the same build it disappears from the sitemap. The one-line
 * descriptions are written here, because a page's own `description` is a meta tag aimed at a
 * search result and reads wrong as a directory entry.
 *
 * No `llms-full.txt`: it would be a second copy of every page's prose to keep in sync, and this
 * file plus the sitemap already lead an agent to the real thing.
 */

interface Entry {
  readonly description: string;
  readonly href: string;
  readonly title: string;
}

const absolute = (href: string): string => new URL(href, site.url).href;

/**
 * A section with no entries is omitted rather than rendered as a bare heading — events retire
 * themselves, so "Events" is empty out of season.
 */
const section = (heading: string, entries: ReadonlyArray<Entry>): string | undefined =>
  entries.length === 0
    ? undefined
    : [
        `## ${heading}`,
        "",
        ...entries.map(
          ({ title, href, description }) => `- [${title}](${absolute(href)}): ${description}`,
        ),
        "",
      ].join("\n");

/** `2026-09-06`, in the timezone everything the organization runs happens in. */
const isoDay = (date: Date): string =>
  new Intl.DateTimeFormat("en-CA", { dateStyle: "short", timeZone: site.location.timeZone }).format(
    date,
  );

export const GET: APIRoute = async () => {
  const events = (await getVisibleEvents()).toSorted(
    (a, b) => a.data.start.getTime() - b.data.start.getTime(),
  );

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description} Based at ${site.location.workspace}, ${site.location.region}, and ` +
      `serving ${site.location.areaServed}. ${site.legal}`,
    "",
    section("Programs", [
      {
        title: programs.sc2.shortName,
        href: programs.sc2.href,
        description: "Both robotics programs and how they fit together, in one place.",
      },
      {
        title: programs.fll.name,
        href: programs.fll.href,
        description: `Ages ${programs.fll.ages}. Team-built LEGO robots, a research project, and a season that ends at a tournament.`,
      },
      {
        title: programs.frc.name,
        href: programs.frc.href,
        description: `Ages ${programs.frc.ages}. Team 4050 ${programs.frc.teamName}, competing since 2012.`,
      },
      {
        title: "Competition robots",
        href: "/programs/frc/robots",
        description:
          "Every robot Biohazard has built, with the game it played and the awards it won.",
      },
    ]),
    section("Get involved", [
      {
        title: nav.cta.label,
        href: nav.cta.href,
        description:
          "How a student, parent, mentor, or volunteer joins — and the form that starts it.",
      },
      {
        title: "About",
        href: "/about",
        description:
          "Who the organization is, how it started, and how its programs are structured.",
      },
      {
        title: nav.calendar.label,
        href: nav.calendar.href,
        description: "Meetings, competitions, and outreach, from the public Google Calendar.",
      },
    ]),
    section("Support", [
      {
        title: nav.donate.label,
        href: nav.donate.href,
        description: "Ways to give: direct donation, the wishlist, and what the money pays for.",
      },
      {
        title: nav.sponsors.label,
        href: nav.sponsors.href,
        description: "Current and past sponsors by level, and the sponsorship packet.",
      },
    ]),
    section(
      "Events",
      events.map((entry) => {
        const href = eventRoutes[entry.id];
        if (href === undefined) {
          throw new Error(`events/${entry.id} has no route in src/data/events.ts.`);
        }
        return {
          title: entry.data.title,
          href,
          description: `${isoDay(entry.data.start)} — ${entry.data.description}`,
        };
      }),
    ),
    section("Contact", [
      {
        title: "Contact",
        href: "/contact",
        description: `Message form, workspace address, and directions. Email: ${site.email}`,
      },
    ]),
    "## Also",
    "",
    `- [Sitemap](${absolute("/sitemap-index.xml")}): every indexable page on this site.`,
    `- [Wiki](${site.urls.wiki}): the organization's own documentation, on a separate domain.`,
    "",
  ]
    // An omitted section would otherwise join as a stray blank line.
    .filter((part): part is string => part !== undefined)
    .join("\n");

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
};
