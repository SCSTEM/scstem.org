/**
 * The DOM contract between `Analytics.astro` and the scripts that report an event it cannot see
 * for itself (taxonomy in `docs/analytics.md`). Link clicks are recognized by destination; a form
 * submission has no destination, so `ContactForm` dispatches this event instead, a
 * `CustomEvent<string>` whose `detail` is the GA4 event name.
 */
export const TRACK_EVENT = "sc2:track";
