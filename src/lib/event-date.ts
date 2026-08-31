/**
 * Formats an event's date range from `start`/`end` (DESIGN.md §8's data voice is applied at the
 * call site; this returns plain text). The timestamps are the only source — an event never
 * carries display prose that can go stale against them.
 */
const ZONE = "America/New_York";

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

/** `Saturday, August 1 (1PM to 4PM)`, or `Saturday, January 10 (12PM)` with no end. */
export const formatEventDate = (start: Date, end?: Date): string => {
  const day = dayFormat.format(start);
  const times =
    end === undefined ? compactTime(start) : `${compactTime(start)} to ${compactTime(end)}`;

  return `${day} (${times})`;
};
