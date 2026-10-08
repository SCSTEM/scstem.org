import assert from "node:assert/strict";

import { mergeCalendarEvents, upcomingEvents } from "../../functions/ics.ts";

/** Deterministic recurrence fixtures: the public feeds change independently of this branch. */
const agenda = (events: string, from: string, days = 90) =>
  upcomingEvents(
    `BEGIN:VCALENDAR\r\n${events.trim().replaceAll("\n", "\r\n")}\r\nEND:VCALENDAR`,
    Date.parse(from),
    days,
    "America/New_York",
  );

const weekdays = agenda(
  `BEGIN:VEVENT
UID:weekdays
DTSTART:20261009T180000Z
DTEND:20261009T190000Z
RRULE:FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR;COUNT=4
SUMMARY:Build session
END:VEVENT`,
  "2026-10-09T00:00:00Z",
);
assert.deepEqual(
  weekdays.map((event) => event.start),
  [
    "2026-10-09T18:00:00.000Z",
    "2026-10-12T18:00:00.000Z",
    "2026-10-13T18:00:00.000Z",
    "2026-10-14T18:00:00.000Z",
  ],
  "DAILY BYDAY skips weekends without consuming COUNT",
);

const weekly = agenda(
  `BEGIN:VEVENT
UID:weekly
DTSTART;TZID=America/New_York:20261028T183000
DTEND;TZID=America/New_York:20261028T203000
RRULE:FREQ=WEEKLY;COUNT=3
SUMMARY:Evening build
END:VEVENT`,
  "2026-10-28T00:00:00Z",
);
assert.deepEqual(
  weekly.map((event) => [event.start, event.end]),
  [
    ["2026-10-28T22:30:00.000Z", "2026-10-29T00:30:00.000Z"],
    ["2026-11-04T23:30:00.000Z", "2026-11-05T01:30:00.000Z"],
    ["2026-11-11T23:30:00.000Z", "2026-11-12T01:30:00.000Z"],
  ],
  "Weekly meetings keep their local time across daylight saving changes",
);

const exceptions = agenda(
  `BEGIN:VEVENT
UID:exceptions
DTSTART:20261001T180000Z
DTEND:20261001T190000Z
RRULE:FREQ=WEEKLY;COUNT=4
EXDATE:20261008T180000Z
SUMMARY:Build
END:VEVENT
BEGIN:VEVENT
UID:exceptions
RECURRENCE-ID:20261015T180000Z
DTSTART:20261016T190000Z
DTEND:20261016T200000Z
SUMMARY:Rescheduled build
END:VEVENT
BEGIN:VEVENT
UID:exceptions
RECURRENCE-ID:20261022T180000Z
DTSTART:20261022T180000Z
STATUS:CANCELLED
END:VEVENT`,
  "2026-10-01T00:00:00Z",
);
assert.deepEqual(
  exceptions.map((event) => [event.title, event.start]),
  [
    ["Build", "2026-10-01T18:00:00.000Z"],
    ["Rescheduled build", "2026-10-16T19:00:00.000Z"],
  ],
  "Excluded, moved, and cancelled instances replace their original occurrence",
);

const allDay = agenda(
  `BEGIN:VEVENT
UID:competition
DTSTART;VALUE=DATE:20261101
DTEND;VALUE=DATE:20261102
SUMMARY:Competition
DESCRIPTION:Bring lunch\\nAnd safety glasses
LOCATION:Chambersburg\\, PA
END:VEVENT`,
  "2026-11-01T18:00:00Z",
);
assert.equal(allDay.length, 1, "An all-day event remains visible while it is in progress");
assert.equal(allDay[0]?.start, "2026-11-01T04:00:00.000Z");
assert.equal(allDay[0].end, "2026-11-02T05:00:00.000Z");
assert.equal(allDay[0].allDay, true);
assert.equal(allDay[0].description, "Bring lunch\nAnd safety glasses");
assert.equal(allDay[0].location, "Chambersburg, PA");

const monthly = agenda(
  `BEGIN:VEVENT
UID:last-friday
DTSTART:20261030T180000Z
RRULE:FREQ=MONTHLY;BYDAY=-1FR;COUNT=3
SUMMARY:Community night
END:VEVENT`,
  "2026-10-01T00:00:00Z",
  100,
);
assert.deepEqual(
  monthly.map((event) => event.start),
  ["2026-10-30T18:00:00.000Z", "2026-11-27T18:00:00.000Z", "2026-12-25T18:00:00.000Z"],
);

const combined = mergeCalendarEvents([
  weekly.map((event) => ({ ...event, calendar: "sc2" })),
  weekly.map((event) => ({ ...event, calendar: "frc" })),
  weekdays.map((event) => ({ ...event, calendar: "frc" })),
]);
assert.equal(combined.length, weekly.length + weekdays.length, "Shared UIDs deduplicate per start");
assert.equal(combined[0]?.uid, "weekdays", "The combined feed sorts chronologically");
assert.equal(combined.at(-1)?.calendar, "sc2", "Shared events keep the organization label");
assert.deepEqual(
  mergeCalendarEvents([[], weekly]),
  weekly,
  "An empty SC2 feed preserves FRC events",
);

console.log("calendar recurrence and feed merging verified");
