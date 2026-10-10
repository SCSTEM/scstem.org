import type { APIRoute } from "astro";

import { eventRoutes } from "@/data/events";
import { nav, type PagePath, programs, site } from "@/data/site";
import { getVisibleEvents } from "@/lib/events";
import { absoluteUrl } from "@/lib/links";

interface Entry {
  readonly description: string;
  readonly href: PagePath;
  readonly title: string;
}

const section = (heading: string, entries: readonly Entry[]): string | undefined =>
  entries.length === 0
    ? undefined
    : [
        `## ${heading}`,
        "",
        ...entries.map(
          ({ title, href, description }) => `- [${title}](${absoluteUrl(href)}): ${description}`,
        ),
        "",
      ].join("\n");

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
        description: `Ages ${programs.frc.ages}. Team ${String(programs.frc.teamNumber)} ${programs.frc.teamName}, competing since ${String(programs.frc.since)}.`,
      },
      {
        title: "Season history",
        href: nav.robots.href,
        description: `Every Biohazard season since ${String(programs.frc.since)}: the game, the events, the robot where there was one, and the awards.`,
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
        title: nav.about.label,
        href: nav.about.href,
        description:
          "Who the organization is, how it started, and how its programs are structured.",
      },
      {
        title: nav.calendar.label,
        href: nav.calendar.href,
        description:
          "Meetings, competitions, and outreach, combining the SC2 and Biohazard public calendars.",
      },
      {
        title: nav.frcCalendar.label,
        href: nav.frcCalendar.href,
        description:
          "Build sessions and competitions for Biohazard, from the team's public calendar.",
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
        const href = eventRoutes.get(entry.id);
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
        title: nav.contact.label,
        href: nav.contact.href,
        description: `Message form, workspace address, and directions. Email: ${site.email}`,
      },
    ]),
    "## Also",
    "",
    `- [Sitemap](${absoluteUrl("/sitemap-index.xml")}): every indexable page on this site.`,
    `- [Wiki](${site.urls.wiki}): the organization's own documentation, on a separate domain.`,
    "",
  ]
    // An omitted section would otherwise join as a stray blank line.
    .filter((part): part is string => part !== undefined)
    .join("\n");

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
};
