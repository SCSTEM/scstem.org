import { type CollectionEntry, getCollection, getEntry } from "astro:content";

import { hasPassed } from "@/lib/event-date";

/**
 * The single definition of "in service", so a page and its sitemap entry cannot disagree. An event
 * leaves service once it has ended; `hidden` retires one early, or one with no `end`.
 */
const inService = (entry: CollectionEntry<"events">): boolean =>
  !entry.data.hidden && !hasPassed(entry.data.end);

/** @public */
export const getVisibleEvents = async (): Promise<CollectionEntry<"events">[]> =>
  (await getCollection("events")).filter(inService);

/**
 * `undefined` when the event is retired, so the route can redirect. An id with no file throws: a
 * broken route should fail the build, not redirect.
 */
export const getVisibleEvent = async (
  id: string,
): Promise<CollectionEntry<"events"> | undefined> => {
  const entry = await getEntry("events", id);
  if (entry === undefined) {
    throw new Error(`No event named "${id}" in src/content/events/.`);
  }

  return inService(entry) ? entry : undefined;
};
