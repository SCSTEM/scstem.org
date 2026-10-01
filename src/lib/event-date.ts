import { site } from "@/data/site";

/**
 * Formats an event's date range from `start`/`end` (DESIGN.md §8's data voice is applied at the
 * call site; this returns plain text). The timestamps are the only source — an event never
 * carries display prose that can go stale against them.
 */
const ZONE = site.location.timeZone;

const dayFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  timeZone: ZONE,
});

const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: ZONE,
});

/** Drops `:00` so 1:00 PM reads as "1PM", matching how the site has always written times. */
const compactTime = (date: Date): string =>
  timeFormat.format(date).replace(":00", "").replace(" ", "");

/**
 * @public Consumed by `Countdown` and by `src/lib/events.ts`.
 *
 * `true` once the event is over. One definition, because two would let a page say "this event has
 * passed" while still being in the sitemap — or the reverse.
 *
 * An event with no `end` never passes: nothing in the entry says when it is over, and picking a
 * duration would invent one. `docs/content.md` tells editors to always set one, which is what
 * makes this rule sufficient rather than a loophole.
 */
export const hasPassed = (end?: Date): boolean => end !== undefined && Date.now() >= end.getTime();

/** `Saturday, August 1 (1PM to 4PM)`, or `Saturday, January 10 (12PM)` with no end. */
export const formatEventDate = (start: Date, end?: Date): string => {
  const day = dayFormat.format(start);
  const times =
    end === undefined ? compactTime(start) : `${compactTime(start)} to ${compactTime(end)}`;

  return `${day} (${times})`;
};
