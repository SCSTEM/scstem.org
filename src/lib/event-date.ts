import { site } from "@/data/site";

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

/** `1:00 PM` becomes `1PM`; `1:30 PM` becomes `1:30PM`. */
const compactTime = (date: Date): string =>
  timeFormat.format(date).replace(":00", "").replace(" ", "");

/**
 * @public
 *
 * An event with no `end` never passes: nothing says when it is over, and a duration would be
 * invented.
 */
export const hasPassed = (end?: Date): boolean => end !== undefined && Date.now() >= end.getTime();

export const formatEventDate = (start: Date, end?: Date): string => {
  const day = dayFormat.format(start);
  const times =
    end === undefined ? compactTime(start) : `${compactTime(start)} to ${compactTime(end)}`;

  return `${day} (${times})`;
};
