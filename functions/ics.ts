import type { CalendarEvent } from "@/types";

/**
 * Just enough iCalendar to render an agenda from a public Google Calendar feed (D19). Not a
 * general RFC 5545 implementation: it reads `VEVENT`s, resolves their times, expands the
 * recurrence rules Google actually emits for a team calendar, and stops there.
 *
 * Recurrence is not optional here. A robotics team's calendar is mostly repeating build
 * sessions, whose single `DTSTART` sits months in the past — a parser that ignored `RRULE` would
 * render an empty agenda on a calendar that is anything but.
 */

/** Anything past this is a malformed or hostile feed, not a schedule. */
const MAX_OCCURRENCES = 5000;

/**
 * Content lines may be folded across several physical lines, continued by a leading space or
 * tab (RFC 5545 §3.1). Unfolding has to happen before anything else is read.
 */
const unfold = (feed: string): Array<string> => {
  const lines: Array<string> = [];
  for (const raw of feed.replaceAll("\r\n", "\n").split("\n")) {
    if ((raw.startsWith(" ") || raw.startsWith("\t")) && lines.length > 0) {
      lines[lines.length - 1] += raw.slice(1);
    } else {
      lines.push(raw);
    }
  }
  return lines;
};

interface Line {
  name: string;
  params: Record<string, string>;
  value: string;
}

/** `DTSTART;TZID=America/New_York:20260107T183000` → name, params, value. */
const parseLine = (line: string): Line | undefined => {
  const colon = line.indexOf(":");
  if (colon === -1) {
    return undefined;
  }

  const [name, ...rest] = line.slice(0, colon).split(";");
  if (name === undefined) {
    return undefined;
  }

  const params: Record<string, string> = {};
  for (const part of rest) {
    const equals = part.indexOf("=");
    if (equals !== -1) {
      params[part.slice(0, equals).toUpperCase()] = part.slice(equals + 1).replaceAll('"', "");
    }
  }

  return { name: name.toUpperCase(), params, value: line.slice(colon + 1) };
};

/** TEXT values escape commas, semicolons, backslashes, and newlines (RFC 5545 §3.3.11). */
const unescapeText = (value: string): string =>
  value
    .replaceAll(String.raw`\n`, "\n")
    .replaceAll(String.raw`\N`, "\n")
    .replaceAll(String.raw`\,`, ",")
    .replaceAll(String.raw`\;`, ";")
    .replaceAll(String.raw`\\`, "\\");

/**
 * A named zone's UTC offset in milliseconds at a given instant. Workers ship full ICU, so the
 * zone database is the runtime's rather than a table this would have to keep current.
 */
const zoneOffset = (instant: number, timeZone: string): number => {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    timeZone,
    year: "numeric",
  }).formatToParts(new Date(instant));

  const field = (type: string): number => Number(parts.find((part) => part.type === type)?.value);
  // `hour12: false` renders midnight as 24 in some ICU versions; both mean the same instant.
  const hour = field("hour") % 24;
  const wall = Date.UTC(
    field("year"),
    field("month") - 1,
    field("day"),
    hour,
    field("minute"),
    field("second"),
  );
  return wall - instant;
};

/**
 * A wall-clock time in a named zone, as an instant. Offsets are looked up from a first guess and
 * then re-checked, because the guess can land on the far side of a DST transition from the
 * answer — one correction is enough for every real transition.
 */
const fromZone = (wall: number, timeZone: string): number => {
  const once = wall - zoneOffset(wall, timeZone);
  return wall - zoneOffset(once, timeZone);
};

interface Moment {
  /** A `VALUE=DATE` property: an all-day event, with no meaningful time of day. */
  allDay: boolean;
  /** Epoch milliseconds. */
  at: number;
  /**
   * The wall-clock reading, encoded as if it were UTC, plus the zone it was read in. Recurrence
   * has to step on the wall clock and convert afterwards: stepping in absolute time instead
   * moves a 6:30pm meeting to 7:30pm the week the clocks change.
   */
  wall: number;
  zone: string | undefined;
}

/** `20260107T183000Z`, `20260107T183000`, or `20260107`. */
const parseMoment = (line: Line): Moment | undefined => {
  const match = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/.exec(line.value);
  if (match === null) {
    return undefined;
  }

  const [, year, month, day, hour, minute, second, utc] = match;
  const wall = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour ?? "0"),
    Number(minute ?? "0"),
    Number(second ?? "0"),
  );

  const allDay = hour === undefined;
  const zone = line.params["TZID"];
  if (allDay || utc === "Z" || zone === undefined) {
    // A date, an explicit UTC stamp, and a floating time all read as written.
    return { allDay, at: wall, wall, zone: undefined };
  }

  try {
    return { allDay, at: fromZone(wall, zone), wall, zone };
  } catch {
    // An unknown zone id would otherwise throw out of the whole feed for one bad event.
    return { allDay, at: wall, wall, zone: undefined };
  }
};

/** Reads a wall clock back as an instant, in the zone the property named — or as written. */
const resolver =
  (zone: string | undefined) =>
  (wall: number): number => {
    if (zone === undefined) {
      return wall;
    }
    try {
      return fromZone(wall, zone);
    } catch {
      return wall;
    }
  };

/** Weekday codes in `BYDAY`, indexed to match `Date#getUTCDay`. */
const DAYS: ReadonlyArray<string> = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

/** The weekday a `BYDAY` code names, or -1 — no assertion, so an unknown code stays a miss. */
const dayIndex = (code: string): number => DAYS.indexOf(code);

interface Rule {
  /** `MO`, `TU`, … for weekly; `2TU`, `-1FR`, … for monthly. */
  byDay: Array<string>;
  byMonthDay: Array<number>;
  count?: number | undefined;
  freq: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  interval: number;
  until?: number | undefined;
}

const parseRule = (value: string): Rule | undefined => {
  const parts = new Map(
    value.split(";").map((part) => {
      const equals = part.indexOf("=");
      return [part.slice(0, equals).toUpperCase(), part.slice(equals + 1)] as const;
    }),
  );

  const freq = parts.get("FREQ");
  if (freq !== "DAILY" && freq !== "WEEKLY" && freq !== "MONTHLY" && freq !== "YEARLY") {
    return undefined;
  }

  const until = parts.get("UNTIL");
  const count = parts.get("COUNT");
  const byDay = parts.get("BYDAY");
  const byMonthDay = parts.get("BYMONTHDAY");

  return {
    byDay: byDay === undefined ? [] : byDay.split(","),
    byMonthDay:
      byMonthDay === undefined ? [] : byMonthDay.split(",").map(Number).filter(Number.isInteger),
    count: count === undefined ? undefined : Number(count),
    freq,
    interval: Number(parts.get("INTERVAL") ?? "1") || 1,
    until:
      until === undefined
        ? undefined
        : parseMoment({ name: "UNTIL", params: {}, value: until })?.at,
  };
};

/**
 * The wall clocks a rule produces from its start, bounded by the window and a hard cap. Dates
 * step in wall time; `toInstant` is only consulted to test `UNTIL` and the window, which are
 * absolute.
 */
const expand = (
  rule: Rule,
  start: number,
  windowEnd: number,
  toInstant: (wall: number) => number,
): Array<number> => {
  const occurrences: Array<number> = [];
  const first = new Date(start);
  const time = {
    hour: first.getUTCHours(),
    minute: first.getUTCMinutes(),
    second: first.getUTCSeconds(),
  };

  const emit = (at: number): boolean => {
    if (rule.until !== undefined && toInstant(at) > rule.until) {
      return false;
    }
    occurrences.push(at);
    return rule.count === undefined || occurrences.length < rule.count;
  };

  const dayCodes = new Set(rule.byDay.map((day) => day.slice(-2)));

  /**
   * The rule's period, stepped `interval` at a time; each period then contributes either its own
   * anchor date or the `BYDAY`/`BYMONTHDAY` dates within it. Bounded by the window rather than by
   * the rule, so an unbounded weekly rule terminates.
   */
  for (let period = 0; period < MAX_OCCURRENCES; period += 1) {
    const cursor = new Date(start);
    let dates: Array<number>;

    if (rule.freq === "DAILY") {
      cursor.setUTCDate(cursor.getUTCDate() + period * rule.interval);
      dates = [cursor.getTime()];
    } else if (rule.freq === "WEEKLY") {
      // Step to the week's Sunday, then take the requested weekdays inside it.
      cursor.setUTCDate(cursor.getUTCDate() - cursor.getUTCDay() + period * 7 * rule.interval);
      const week = dayCodes.size > 0 ? [...dayCodes] : [DAYS[first.getUTCDay()] ?? "SU"];
      dates = week.flatMap((code) => {
        const index = dayIndex(code);
        if (index === -1) {
          return [];
        }
        const day = new Date(cursor);
        day.setUTCDate(day.getUTCDate() + index);
        return day.getTime() < start ? [] : [day.getTime()];
      });
    } else {
      const months = rule.freq === "MONTHLY" ? rule.interval : rule.interval * 12;
      cursor.setUTCDate(1);
      cursor.setUTCMonth(cursor.getUTCMonth() + period * months);
      dates = monthDates(cursor, rule, first);
    }

    let exhausted = false;
    for (const date of dates.toSorted((a, b) => a - b)) {
      const at = withTime(date, time);
      if (at < start) {
        continue;
      }
      if (!emit(at)) {
        exhausted = true;
        break;
      }
    }

    const furthest = occurrences.at(-1);
    if (exhausted || (furthest !== undefined && toInstant(furthest) > windowEnd)) {
      break;
    }
  }

  return occurrences;
};

interface TimeOfDay {
  hour: number;
  minute: number;
  second: number;
}

const withTime = (date: number, time: TimeOfDay): number => {
  const stamp = new Date(date);
  stamp.setUTCHours(time.hour, time.minute, time.second, 0);
  return stamp.getTime();
};

/** The dates a monthly or yearly rule selects inside the month `cursor` starts. */
const monthDates = (cursor: Date, rule: Rule, first: Date): Array<number> => {
  const year = cursor.getUTCFullYear();
  const month = cursor.getUTCMonth();
  const length = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  if (rule.byMonthDay.length > 0) {
    return rule.byMonthDay
      .map((day) => (day < 0 ? length + day + 1 : day))
      .filter((day) => day >= 1 && day <= length)
      .map((day) => Date.UTC(year, month, day));
  }

  if (rule.byDay.length > 0) {
    return rule.byDay.flatMap((entry) => {
      const code = entry.slice(-2);
      const ordinal = Number(entry.slice(0, -2) || "0");
      const weekday = dayIndex(code);
      if (weekday === -1) {
        return [];
      }

      const matches: Array<number> = [];
      for (let day = 1; day <= length; day += 1) {
        const at = Date.UTC(year, month, day);
        if (new Date(at).getUTCDay() === weekday) {
          matches.push(at);
        }
      }

      if (ordinal === 0) {
        return matches;
      }
      const picked = ordinal > 0 ? matches[ordinal - 1] : matches.at(ordinal);
      return picked === undefined ? [] : [picked];
    });
  }

  // No BYxxx: the rule repeats the start date's day of the month, skipping months too short
  // for it — a 31st never becomes the 1st of the next month.
  const day = first.getUTCDate();
  return day > length ? [] : [Date.UTC(year, month, day)];
};

interface RawEvent {
  description: string;
  end?: Moment | undefined;
  excluded: Array<number>;
  location: string;
  /** Set on an event that overrides one occurrence of its series. */
  recurrenceId?: number | undefined;
  rule?: Rule | undefined;
  start?: Moment | undefined;
  status: string;
  summary: string;
  uid: string;
}

const parseEvents = (feed: string): Array<RawEvent> => {
  const events: Array<RawEvent> = [];
  let current: RawEvent | undefined;

  for (const raw of unfold(feed)) {
    if (raw === "BEGIN:VEVENT") {
      current = { description: "", excluded: [], location: "", status: "", summary: "", uid: "" };
      continue;
    }
    if (raw === "END:VEVENT") {
      if (current !== undefined) {
        events.push(current);
      }
      current = undefined;
      continue;
    }
    if (current === undefined) {
      continue;
    }

    const line = parseLine(raw);
    if (line === undefined) {
      continue;
    }

    switch (line.name) {
      case "UID": {
        current.uid = line.value;
        break;
      }
      case "SUMMARY": {
        current.summary = unescapeText(line.value);
        break;
      }
      case "DESCRIPTION": {
        current.description = unescapeText(line.value);
        break;
      }
      case "LOCATION": {
        current.location = unescapeText(line.value);
        break;
      }
      case "STATUS": {
        current.status = line.value;
        break;
      }
      case "DTSTART": {
        current.start = parseMoment(line);
        break;
      }
      case "DTEND": {
        current.end = parseMoment(line);
        break;
      }
      case "RRULE": {
        current.rule = parseRule(line.value);
        break;
      }
      case "RECURRENCE-ID": {
        current.recurrenceId = parseMoment(line)?.at;
        break;
      }
      case "EXDATE": {
        for (const value of line.value.split(",")) {
          const moment = parseMoment({ ...line, value });
          if (moment !== undefined) {
            current.excluded.push(moment.at);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  return events;
};

/**
 * Upcoming events from an iCalendar feed, earliest first.
 *
 * @param feed The raw `.ics` body.
 * @param from Start of the window, epoch milliseconds.
 * @param days How far ahead to look.
 */
export const upcomingEvents = (feed: string, from: number, days: number): Array<CalendarEvent> => {
  const until = from + days * 24 * 60 * 60 * 1000;
  const parsed = parseEvents(feed).filter((event) => event.status !== "CANCELLED");

  /**
   * An event carrying `RECURRENCE-ID` replaces one occurrence of its series — a moved or edited
   * instance. Keying overrides by uid and instant lets the series skip the occurrences that have
   * one, so a rescheduled meeting appears once, at its new time.
   */
  const overridden = new Set(
    parsed.flatMap((event) =>
      event.recurrenceId === undefined ? [] : [`${event.uid}:${String(event.recurrenceId)}`],
    ),
  );

  const results: Array<CalendarEvent> = [];

  for (const event of parsed) {
    const { start } = event;
    if (start === undefined) {
      continue;
    }

    const toInstant = resolver(start.zone);
    // Length measured on the wall clock, so an event spanning a clock change keeps its duration.
    const length = event.end === undefined ? 0 : Math.max(0, event.end.wall - start.wall);
    const walls =
      event.rule === undefined ? [start.wall] : expand(event.rule, start.wall, until, toInstant);

    for (const wall of walls) {
      const at = toInstant(wall);
      const ends = toInstant(wall + length);

      // Compared as instants: an EXDATE or RECURRENCE-ID may be stamped in UTC even where the
      // series it modifies is written in a named zone.
      if (event.excluded.includes(at) || overridden.has(`${event.uid}:${String(at)}`)) {
        continue;
      }
      // An event that started earlier today but has not finished is still upcoming.
      if (ends < from || at > until) {
        continue;
      }

      results.push({
        allDay: start.allDay,
        description: event.description,
        end: new Date(ends).toISOString(),
        location: event.location,
        start: new Date(at).toISOString(),
        title: event.summary,
      });
    }
  }

  return results.toSorted((a, b) => a.start.localeCompare(b.start));
};
