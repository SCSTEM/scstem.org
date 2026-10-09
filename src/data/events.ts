import { type PagePath, programs } from "@/data/site";

/**
 * Where each `events` entry is published: entry id to the path of the route that renders it.
 *
 * An entry cannot know its own URL — `/openhouse` and `/programs/frc/kickoff` are hand-written
 * routes, not a `[slug]` — and `/llms.txt` has to link the live ones. The key is a plain string
 * so the check happens against the collection: an event with no route here throws at build. CI
 * catches the other direction, a path that stops matching its route, by link-checking
 * `dist/llms.txt` alongside the HTML.
 */
export const eventRoutes: ReadonlyMap<string, PagePath> = new Map<string, PagePath>([
  ["openhouse", "/openhouse/"],
  ["frc-kickoff", `${programs.frc.href}kickoff/`],
]);
