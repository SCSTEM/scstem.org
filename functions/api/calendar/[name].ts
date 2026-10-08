import { mergeCalendarEvents, upcomingEvents } from "@/ics";
import { res } from "@/util";

/**
 * Fetches public ICS feeds server-side and hands the page JSON. The feeds send no CORS
 * headers, so a page cannot read it directly.
 */

/**
 * Mirrors `site.calendars` in `src/data/site.ts` — Pages Functions are bundled separately and
 * cannot import from `src/`, so the two ids are duplicated verbatim rather than transformed,
 * which keeps them diffable against their source. These are the base64 form Google's share links
 * use; the ICS endpoint wants the address inside.
 */
const CALENDARS = {
  frc: "Y19hYjljNWJlYTEwODgyYzAxYTAxOGNiZDUxYWIyMzcwYmY4NDk5NDZiZTRlMjUzNTAwZmZmMWQxMGZkY2M4NjFhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
  sc2: "Y19wcDlkOXRrbGRrbThmdXZtcjMyZTBwZTgxc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
};

/**
 * Mirrors `site.location.timeZone`, the zone the agenda page formats in. All-day dates resolve to
 * midnight here, so the page files them under their own day.
 */
const TIME_ZONE = "America/New_York";

type CalendarName = keyof typeof CALENDARS;

const isCalendarName = (value: string | undefined): value is CalendarName =>
  value !== undefined && Object.hasOwn(CALENDARS, value);

/** How far ahead the agenda looks. */
const WINDOW_DAYS = 90;

/** Fifteen minutes: a schedule change should surface the same day, not the same minute. */
const MAX_AGE = 900;

/** An error answer is never cached; only a parsed feed is. */
const NO_STORE = { "Cache-Control": "no-store" };

export const onRequestGet: PagesFunction<unknown, "name"> = async ({
  params,
  request,
  waitUntil,
}) => {
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  if (!isCalendarName(name)) {
    return res({ message: "Unknown calendar" }, 404, NO_STORE);
  }

  // Cloudflare's edge cache, keyed on the request, so one fetch of the feed serves every visitor
  // for the freshness window instead of each browser holding its own copy.
  const cache = caches.default;
  const cached = await cache.match(request);
  if (cached !== undefined) {
    return cached;
  }

  try {
    const sources: CalendarName[] = name === "sc2" ? ["sc2", "frc"] : ["frc"];
    const now = Date.now();
    const feeds = await Promise.allSettled(
      sources.map(async (source) => {
        const address = atob(CALENDARS[source]);
        const url = `https://calendar.google.com/calendar/ical/${encodeURIComponent(address)}/public/basic.ics`;
        const upstream = await fetch(url, {
          cf: { cacheTtl: MAX_AGE },
          signal: AbortSignal.timeout(8000),
        });
        if (!upstream.ok) {
          throw new Error(`${source} calendar feed returned ${String(upstream.status)}`);
        }
        const feed = (await upstream.text()).trim();
        if (!feed.startsWith("BEGIN:VCALENDAR") || !feed.endsWith("END:VCALENDAR")) {
          throw new Error(`${source} calendar feed is not an iCalendar document`);
        }
        return upcomingEvents(feed, now, WINDOW_DAYS, TIME_ZONE).map((event) => ({
          ...event,
          calendar: source,
        }));
      }),
    );
    const available = feeds.flatMap((feed) => (feed.status === "fulfilled" ? [feed.value] : []));
    const missing = feeds.flatMap((feed, index) => {
      if (feed.status === "fulfilled") {
        return [];
      }
      console.error(feed.reason);
      return sources[index] === "frc" ? ["Biohazard"] : ["SC2"];
    });
    if (available.length === 0) {
      return res({ message: "Could not reach the calendar feeds" }, 502, NO_STORE);
    }

    const response = res(
      {
        events: mergeCalendarEvents(available),
        ...(missing.length > 0 && {
          message: `The ${missing.join(" and ")} calendar could not load. This schedule is incomplete; check Google Calendar for the full schedule.`,
        }),
      },
      200,
      missing.length > 0 ? NO_STORE : { "Cache-Control": `public, max-age=${String(MAX_AGE)}` },
    );
    if (missing.length === 0) {
      waitUntil(cache.put(request, response.clone()));
    }
    return response;
  } catch (error) {
    console.error(error);
    return res({ message: "Could not reach the calendar feed" }, 502, NO_STORE);
  }
};
