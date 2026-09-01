/**
 * The DOM contract between `Analytics.astro` and the scripts that report an event it cannot see
 * for itself (D21, taxonomy in `docs/analytics.md`).
 *
 * Most of the taxonomy is link clicks, which the analytics listener recognizes by destination —
 * nothing to annotate, nothing to keep in step with a moved route. A form submission has no
 * destination and no click, so it is dispatched instead: one custom event, one name, imported by
 * both ends rather than typed twice.
 */
export const TRACK_EVENT = "sc2:track";

/**
 * @public Dispatched by `ContactForm`, read by `Analytics`.
 *
 * `detail` is the GA4 event name.
 */
export type TrackEvent = CustomEvent<string>;
