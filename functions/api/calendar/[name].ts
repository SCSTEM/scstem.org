import { upcomingEvents } from "@/ics";
import type { CalendarEvent } from "@/types";

/**
 * A branded agenda needs the calendar's events as data, not as a Google iframe (D19) — so this
 * fetches the public ICS feed server-side and hands the page JSON.
 *
 * Doing it here rather than in the browser is what makes the feature possible at all: the feed
 * sends no CORS headers, so a page cannot read it directly.
 */

/**
 * Mirrors `site.calendars` in `src/data/site.ts` — Pages Functions are bundled separately and
 * cannot import from `src/`, so the two ids are duplicated verbatim rather than transformed,
 * which keeps them diffable against their source. These are the base64 form Google's embed URL
 * uses; the ICS endpoint wants the address inside.
 */
const CALENDARS = {
  frc: "Y19hYjljNWJlYTEwODgyYzAxYTAxOGNiZDUxYWIyMzcwYmY4NDk5NDZiZTRlMjUzNTAwZmZmMWQxMGZkY2M4NjFhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
  sc2: "Y19wcDlkOXRrbGRrbThmdXZtcjMyZTBwZTgxc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
};

type CalendarName = keyof typeof CALENDARS;

const isCalendarName = (value: string | undefined): value is CalendarName =>
  value !== undefined && Object.hasOwn(CALENDARS, value);

/** How far ahead the agenda looks. */
const WINDOW_DAYS = 90;

/** Fifteen minutes: a schedule change should surface the same day, not the same minute. */
const MAX_AGE = 900;

/** What `/api/calendar/<name>` answers with, either way. */
interface CalendarResponse {
  events?: Array<CalendarEvent>;
  message?: string;
}

const json = (body: CalendarResponse, status: number, cacheable: boolean): Response =>
  new Response(JSON.stringify(body), {
    headers: {
      "Cache-Control": cacheable ? `public, max-age=${String(MAX_AGE)}` : "no-store",
      "Content-Type": "application/json",
    },
    status,
  });

export const onRequestGet: PagesFunction<unknown, "name"> = async ({
  params,
  request,
  waitUntil,
}) => {
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  if (!isCalendarName(name)) {
    return json({ message: "Unknown calendar" }, 404, false);
  }

  // Cloudflare's edge cache, keyed on the request, so one fetch of the feed serves every visitor
  // for the freshness window instead of each browser holding its own copy.
  const cache = caches.default;
  const cached = await cache.match(request);
  if (cached !== undefined) {
    return cached;
  }

  const address = atob(CALENDARS[name]);
  const feed = `https://calendar.google.com/calendar/ical/${encodeURIComponent(address)}/public/basic.ics`;

  try {
    const upstream = await fetch(feed, { cf: { cacheTtl: MAX_AGE } });
    if (!upstream.ok) {
      return json({ message: `Calendar feed returned ${String(upstream.status)}` }, 502, false);
    }

    const events = upcomingEvents(await upstream.text(), Date.now(), WINDOW_DAYS);
    const response = json({ events }, 200, true);
    waitUntil(cache.put(request, response.clone()));
    return response;
  } catch (error) {
    console.error(error);
    return json({ message: "Could not reach the calendar feed" }, 502, false);
  }
};
