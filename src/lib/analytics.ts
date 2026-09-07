/**
 * The DOM contract between `Analytics.astro` and the scripts that report an event it cannot see
 * for itself (taxonomy in `docs/analytics.md`). Link clicks are recognized by destination; a form
 * submission has no destination, so it dispatches this event instead.
 */
export const TRACK_EVENT = "sc2:track";

/**
 * @public Dispatched by `ContactForm`, read by `Analytics`.
 *
 * `detail` is the GA4 event name.
 */
export type TrackEvent = CustomEvent<string>;
