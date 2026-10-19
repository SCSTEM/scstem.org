import type { CollectionEntry } from "astro:content";

import { type PagePath, type ProgramTheme, nav, programs, site, socials } from "@/data/site";
import { absoluteUrl } from "@/lib/links";

// All data here is first-party, which is what makes serializing it with `set:html` safe.
type JsonLdValue = string | number | boolean | JsonLdObject | readonly JsonLdValue[];

export interface JsonLdObject {
  readonly "@context"?: string;
  readonly "@type": string;
  readonly [key: string]: JsonLdValue | undefined;
}

const workspaceAddress = {
  "@type": "PostalAddress",
  streetAddress: site.location.street,
  addressLocality: site.location.locality,
  addressRegion: site.location.region,
  postalCode: site.location.postalCode,
  addressCountry: site.location.country,
} as const;

/** `NGO` rather than `Organization`: the specific type for a nonprofit. */
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
  sameAs: socials.map((social) => social.profile),
};

export const webSite: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

/** @public */
export interface Breadcrumb {
  readonly name: string;
  readonly path: PagePath;
}

/**
 * @public
 *
 * Pass the full trail including the current page; the home link is added automatically.
 */
export const breadcrumbs = (trail: readonly Breadcrumb[]): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export const programTrail = (
  program: ProgramTheme,
  ...rest: readonly Breadcrumb[]
): readonly [hub: Breadcrumb, program: Breadcrumb, ...rest: Breadcrumb[]] => [
  { name: nav.programs.label, path: nav.programs.href },
  { name: programs[program].name, path: programs[program].href },
  ...rest,
];

/** @public */
export interface EventDetails {
  readonly description: string;
  readonly end?: Date | undefined;
  /** Absolute: structured data has no base to resolve a relative path against. */
  readonly image?: string | undefined;
  readonly locationAddress?: string | undefined;
  readonly locationName?: string | undefined;
  readonly name: string;
  readonly registrationUrl?: string | undefined;
  readonly start: Date;
  readonly url: string;
}

/** @public */
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
    // An off-site event carries one free-text line; schema.org accepts a string or a PostalAddress.

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
 * @public
 *
 * Each answer is the entry's rendered HTML, which Google's FAQ documentation permits.
 */
export const faqPage = (entries: readonly CollectionEntry<"faq">[]): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: entries.map((entry) => ({
    "@type": "Question",
    name: entry.data.question,
    acceptedAnswer: { "@type": "Answer", text: entry.rendered?.html ?? entry.body ?? "" },
  })),
});
