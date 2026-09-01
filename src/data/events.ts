/**
 * Where each `events` entry is published, keyed by entry id.
 *
 * An entry cannot know its own URL — `/openhouse` and `/programs/frc/kickoff` are hand-written
 * routes, not a `[slug]` — and `/llms.txt` has to link the live ones. Typed as an open record
 * rather than a literal shape so the check that matters happens against the collection: an event
 * with no route here throws at build, where a narrow key type would only have caught a typo.
 * CI catches the other direction, a path that stops matching its route, by link-checking
 * `dist/llms.txt` alongside the HTML.
 */
/** Entry id to the path of the route that renders it. */
type EventRoutes = Readonly<Record<string, string>>;

export const eventRoutes: EventRoutes = {
  openhouse: "/openhouse",
  "frc-kickoff": "/programs/frc/kickoff",
};
