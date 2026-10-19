import type { CalendarEvent } from "./types.ts";

const MAX_OCCURRENCES = 5000;

/**
 * Content lines may be folded: a leading space or tab continues the previous line (RFC 5545 §3.1).
 */
const unfold = (feed: string): string[] => {
  const lines: string[] = [];
  for (const raw of feed.replaceAll("\r\n", "\n").split("\n")) {
    const previous = raw.startsWith(" ") || raw.startsWith("\t") ? lines.pop() : undefined;
    lines.push(previous === undefined ? raw : previous + raw.slice(1));
  }
  return lines;
};

interface Line {
  name: string;
  params: Record<string, string>;
  value: string;
}

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

/**
 * One pass, so an escaped backslash is never re-read as the start of the next escape (RFC 5545
 * §3.3.11).
 */
const unescapeText = (value: string): string =>
  value.replaceAll(/\\([\\;,nN])/g, (_, escaped: string) =>
    escaped === "n" || escaped === "N" ? "\n" : escaped,
  );

const formatters = new Map<string, Intl.DateTimeFormat>();

const zoneFormatter = (timeZone: string): Intl.DateTimeFormat => {
  let formatter = formatters.get(timeZone);
  if (formatter === undefined) {
    formatter = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      month: "2-digit",
      second: "2-digit",
      timeZone,
      year: "numeric",
    });
    formatters.set(timeZone, formatter);
  }
  return formatter;
};

const zoneOffset = (instant: number, timeZone: string): number => {
  const parts = zoneFormatter(timeZone).formatToParts(new Date(instant));

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

/** The first offset guess can land on the far side of a DST transition, so it is re-read once. */
const fromZone = (wall: number, timeZone: string): number => {
  const once = wall - zoneOffset(wall, timeZone);
  return wall - zoneOffset(once, timeZone);
};

interface Moment {
  allDay: boolean;
  at: number;
  /**
   * The wall-clock reading encoded as if it were UTC. Recurrence steps on the wall clock and
   * converts afterwards: stepping in absolute time moves a 6:30pm meeting to 7:30pm when the
   * clocks change.
   */
  wall: number;
  zone: string | undefined;
}

/**
 * A bare date resolves as midnight in `dateZone`: read as UTC midnight, an all-day event would
 * format as the evening before anywhere west of Greenwich.
 */
const parseMoment = (line: Line, dateZone: string): Moment | undefined => {
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
  const zone = allDay ? dateZone : line.params.TZID;
  if (utc === "Z" || zone === undefined) {
    return { allDay, at: wall, wall, zone: undefined };
  }

  try {
    return { allDay, at: fromZone(wall, zone), wall, zone };
  } catch {
    // An unknown zone id would otherwise throw out of the whole feed for one bad event.
    return { allDay, at: wall, wall, zone: undefined };
  }
};

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

const DAYS: readonly string[] = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

const dayIndex = (code: string): number => DAYS.indexOf(code);

interface Rule {
  byDay: string[];
  byMonthDay: number[];
  count?: number | undefined;
  freq: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  interval: number;
  until?: number | undefined;
  weekStart: number;
}

const parseRule = (value: string, dateZone: string): Rule | undefined => {
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
  const weekStart = dayIndex(parts.get("WKST") ?? "MO");

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
        : parseMoment({ name: "UNTIL", params: {}, value: until }, dateZone)?.at,
    weekStart: weekStart === -1 ? 1 : weekStart,
  };
};

/**
 * Dates step in wall time; `toInstant` is only consulted for `UNTIL` and the window, which are
 * absolute.
 */
const expand = (
  rule: Rule,
  start: number,
  windowEnd: number,
  toInstant: (wall: number) => number,
): number[] => {
  const occurrences: number[] = [];
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

  for (let period = 0; period < MAX_OCCURRENCES; period += 1) {
    const cursor = new Date(start);
    let dates: number[];

    if (rule.freq === "DAILY") {
      cursor.setUTCDate(cursor.getUTCDate() + period * rule.interval);
      const day = DAYS[cursor.getUTCDay()] ?? "";
      dates = dayCodes.size === 0 || dayCodes.has(day) ? [cursor.getTime()] : [];
    } else if (rule.freq === "WEEKLY") {
      // The week boundary (`WKST`) decides which weeks an INTERVAL > 1 rule skips.
      const intoWeek = (cursor.getUTCDay() - rule.weekStart + 7) % 7;
      cursor.setUTCDate(cursor.getUTCDate() - intoWeek + period * 7 * rule.interval);
      const week = dayCodes.size > 0 ? [...dayCodes] : [DAYS[first.getUTCDay()] ?? "SU"];
      dates = week.flatMap((code) => {
        const index = dayIndex(code);
        if (index === -1) {
          return [];
        }
        const day = new Date(cursor);
        day.setUTCDate(day.getUTCDate() + ((index - rule.weekStart + 7) % 7));
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

    if (exhausted || toInstant(cursor.getTime()) > windowEnd) {
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

const monthDates = (cursor: Date, rule: Rule, first: Date): number[] => {
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

      const matches: number[] = [];
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

  // A 31st skips short months rather than rolling into the next.
  const day = first.getUTCDate();
  return day > length ? [] : [Date.UTC(year, month, day)];
};

interface RawEvent {
  description: string;
  end?: Moment | undefined;
  excluded: Set<number>;
  location: string;
  recurrenceId?: number | undefined;
  rule?: Rule | undefined;
  start?: Moment | undefined;
  status: string;
  summary: string;
  uid: string;
}

const parseEvents = (feed: string, dateZone: string): RawEvent[] => {
  const events: RawEvent[] = [];
  let current: RawEvent | undefined;
  /** Depth inside components nested in the event (a `VALARM`), whose properties are not its own. */
  let nested = 0;

  for (const raw of unfold(feed)) {
    if (raw === "BEGIN:VEVENT") {
      nested = 0;
      current = {
        description: "",
        excluded: new Set(),
        location: "",
        status: "",
        summary: "",
        uid: "",
      };
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
    if (raw.startsWith("BEGIN:")) {
      nested += 1;
      continue;
    }
    if (raw.startsWith("END:")) {
      nested = Math.max(0, nested - 1);
      continue;
    }
    if (nested > 0) {
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
        current.start = parseMoment(line, dateZone);
        break;
      }
      case "DTEND": {
        current.end = parseMoment(line, dateZone);
        break;
      }
      case "RRULE": {
        current.rule = parseRule(line.value, dateZone);
        break;
      }
      case "RECURRENCE-ID": {
        current.recurrenceId = parseMoment(line, dateZone)?.at;
        break;
      }
      case "EXDATE": {
        for (const value of line.value.split(",")) {
          const moment = parseMoment({ ...line, value }, dateZone);
          if (moment !== undefined) {
            current.excluded.add(moment.at);
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

/** `timeZone` is the zone the agenda is shown in, which all-day dates are days of. */
export const upcomingEvents = (
  feed: string,
  from: number,
  days: number,
  timeZone: string,
): CalendarEvent[] => {
  const until = from + days * 24 * 60 * 60 * 1000;
  const parsed = parseEvents(feed, timeZone);

  // A `RECURRENCE-ID` event replaces one occurrence of its series, so the series skips that
  // instant; a cancelled override is dropped below, leaving the occurrence out entirely.
  const overridden = new Set(
    parsed.flatMap((event) =>
      event.recurrenceId === undefined ? [] : [`${event.uid}:${String(event.recurrenceId)}`],
    ),
  );

  const results: CalendarEvent[] = [];

  for (const event of parsed) {
    const { start } = event;
    if (start === undefined || event.status === "CANCELLED") {
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
      if (
        event.excluded.has(at) ||
        (event.recurrenceId === undefined && overridden.has(`${event.uid}:${String(at)}`))
      ) {
        continue;
      }
      if (ends < from || at > until) {
        continue;
      }

      results.push({
        uid: event.uid,
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

export const mergeCalendarEvents = (feeds: readonly CalendarEvent[][]): CalendarEvent[] => {
  const merged = new Map<string, CalendarEvent>();
  for (const occurrence of feeds.flat()) {
    const identity = occurrence.uid || `${occurrence.title}:${occurrence.location}`;
    const key = `${identity}:${occurrence.start}`;
    if (!merged.has(key)) {
      merged.set(key, occurrence);
    }
  }
  return [...merged.values()].toSorted((a, b) => a.start.localeCompare(b.start));
};
