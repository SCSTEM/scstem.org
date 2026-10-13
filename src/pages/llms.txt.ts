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
    `> ${site.description} We meet at ${site.location.workspace}, ${site.location.region}. ` +
      `Our community: ${site.location.areaServed}. ${site.legal}`,
    "",
    section("Programs", [
      {
        title: "Robotics programs",
        href: programs.sc2.href,
        description: "Explore both robotics programs and choose a fit for your age and interests.",
      },
      {
        title: programs.fll.name,
        href: programs.fll.href,
        description: `Ages ${programs.fll.ages}. Build a LEGO robot, investigate a real-world problem, and share your ideas with a small team.`,
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
          "Join a team, share your skills, or explore sponsorship. A volunteer helps you take the next step.",
      },
      {
        title: nav.about.label,
        href: nav.about.href,
        description:
          "Our mission, history, mentorship, and community involvement in south-central Pennsylvania.",
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
        description:
          "Support students with tools, workspace, and opportunities to compete. Ways to give and our equipment wishlist.",
      },
      {
        title: nav.sponsors.label,
        href: nav.sponsors.href,
        description:
          "Meet the sponsors supporting hands-on learning and explore the sponsorship packet.",
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
          description: `${isoDay(entry.data.start)} - ${entry.data.description}`,
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
