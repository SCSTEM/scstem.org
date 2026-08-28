import { site, socials } from "@/data/site";

/**
 * Typed builders for the schema.org objects the site emits. Keeping them here rather than inline
 * in layouts means one place to audit against a validator, and one place a field can be added.
 *
 * The data is all ours, so `JsonLd.astro` can serialize it with `set:html` safely.
 */

/** What a schema.org property is allowed to hold — the concrete contract, not `unknown`. */
type JsonLdValue = string | number | boolean | JsonLdObject | ReadonlyArray<JsonLdValue>;

export interface JsonLdObject {
  readonly "@context"?: string;
  readonly "@type": string;
  readonly [key: string]: JsonLdValue | undefined;
}

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
  logo: `${site.url}/icon-512.png`,
  email: site.email,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.location.workspace,
    addressLocality: site.location.locality,
    addressRegion: site.location.region,
    addressCountry: site.location.country,
  },
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

/** @public Consumed by the nested pages that arrive in Phases 07-08. */
export interface Breadcrumb {
  readonly name: string;
  /** Site-root-relative, e.g. `/programs/frc`. */
  readonly path: string;
}

/**
 * @public Consumed by the nested pages that arrive in Phases 07-08.
 *
 * Breadcrumbs for a nested page. Pass the full trail including the current page; the home link
 * is added automatically, since every trail starts there.
 */
export const breadcrumbs = (trail: ReadonlyArray<Breadcrumb>): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: new URL(crumb.path, site.url).href,
  })),
});
