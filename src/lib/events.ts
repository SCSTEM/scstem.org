import { type CollectionEntry, getCollection, getEntry } from "astro:content";

/**
 * One definition of "this event is in service", read by the routes that render events and by the
 * sitemap filter. Flipping `hidden` therefore cannot retire the page and leave the URL in the
 * sitemap, or the reverse.
 */
const inService = (entry: CollectionEntry<"events">): boolean => !entry.data.hidden;

/**
 * @public Consumed by the sitemap filter (plan/10).
 *
 * Every event whose page renders, in no particular order.
 */
export const getVisibleEvents = async (): Promise<Array<CollectionEntry<"events">>> =>
  (await getCollection("events")).filter(inService);

/**
 * The entry a route renders, or `undefined` when the event is retired and the route should
 * redirect to its parent instead. An id with no file throws: that is a broken route, not a
 * hidden event, and it should fail the build rather than silently redirect.
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
