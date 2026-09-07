import { site, socials } from "@/data/site";

/**
 * Typed builders for the schema.org objects the site emits. Keeping them here rather than inline
 * in layouts means one place to audit against a validator, and one place a field can be added.
 *
 * The data is all ours, so `JsonLd.astro` can serialize it with `set:html` safely.
 */

/** What a schema.org property is allowed to hold — the concrete contract, not `unknown`. */
type JsonLdValue = string | number | boolean | JsonLdObject | readonly JsonLdValue[];

export interface JsonLdObject {
  readonly "@context"?: string;
  readonly "@type": string;
  readonly [key: string]: JsonLdValue | undefined;
}

/** The workshop's address, the only one known part by part. */
const workspaceAddress = {
  "@type": "PostalAddress",
  streetAddress: site.location.workspace,
  addressLocality: site.location.locality,
  addressRegion: site.location.region,
  addressCountry: site.location.country,
} as const;

/**
 * The organization, emitted on every page by BaseLayout. `NGO` rather than `Organization`: it is
 * the specific type for a nonprofit, and specificity is what makes structured data useful.
 */
export const organization: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}${site.icons.png512}`,
  email: site.email,
  description: site.description,
  address: workspaceAddress,
  areaServed: site.location.areaServed,
  sameAs: socials.map((social) => social.href),
};

/** The site itself. Homepage only — repeating it on every page adds nothing. */
export const webSite: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

/** @public */
export interface Breadcrumb {
  readonly name: string;
  /** Site-root-relative, e.g. `/programs/frc`. */
  readonly path: string;
}

/**
 * @public
 *
 * Breadcrumbs for a nested page. Pass the full trail including the current page; the home link
 * is added automatically, since every trail starts there.
 */
export const breadcrumbs = (trail: readonly Breadcrumb[]): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: new URL(crumb.path, site.url).href,
  })),
});

/** @public Consumed by `EventLayout`, which passes an `events` entry's frontmatter through. */
export interface EventDetails {
  readonly description: string;
  readonly end?: Date | undefined;
  /** Absolute, like `url` — a relative path in structured data resolves against nothing. */
  readonly image?: string | undefined;
  /** Both default to the workspace, exactly as the visible page does. */
  readonly locationAddress?: string | undefined;
  readonly locationName?: string | undefined;
  readonly name: string;
  readonly registrationUrl?: string | undefined;
  readonly start: Date;
  /** The page's own absolute URL. */
  readonly url: string;
}

/**
 * @public Consumed by `EventLayout`.
 *
 * One event's `Event` object. Dates come from the entry's timestamps rather than any displayed
 * string, so the structured data cannot disagree with the page.
 */
export const event = ({
  name,
  description,
  start,
  end,
  locationName,
  locationAddress,
  url,
  image,
  registrationUrl,
}: EventDetails): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name,
  description,
  startDate: start.toISOString(),
  ...(end !== undefined && { endDate: end.toISOString() }),
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: locationName ?? site.location.name,
    /**
     * Only the workspace's address is known part by part; an off-site event carries one free-text
     * line, and schema.org takes either for `address`.
     */
    address: locationAddress ?? workspaceAddress,
  },
  organizer: {
    "@type": "NGO",
    name: site.name,
    url: site.url,
  },
  url,
  ...(image !== undefined && { image }),
  ...(registrationUrl !== undefined && {
    offers: {
      "@type": "Offer",
      url: registrationUrl,
      availability: "https://schema.org/InStock",
    },
  }),
});

/**
 * @public Consumed by `EventLayout`.
 *
 * The `FAQPage` for a page's answered questions. `answer` is the entry's rendered HTML, which
 * Google's FAQ documentation permits.
 */
export const faqPage = (
  entries: readonly { readonly answer: string; readonly question: string }[],
): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: entries.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});
