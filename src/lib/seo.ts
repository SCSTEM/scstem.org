import type { ImageMetadata } from "astro";

import type { ProgramTheme } from "@/data/site";
import type { Breadcrumb } from "@/lib/jsonld";

/** A social card: the image a share preview shows, and the `og:image:alt` that describes it. */
export interface OgCard {
  readonly alt: string;
  readonly image: ImageMetadata;
}

/**
 * The props of `Seo.astro`, which `BaseLayout` takes as its own and forwards unchanged. It lives
 * in a `.ts` module because typed linting cannot resolve a type imported from an `.astro` file.
 */
export interface SeoProps {
  title: string;
  /** 50–160 characters, written for a human deciding whether to click. */
  description: string;
  /**
   * One of `ogCards`; defaults to the site-wide card. These are declared `| undefined` because
   * layouts forward them straight through, and `exactOptionalPropertyTypes` treats an explicitly
   * passed `undefined` as distinct from an absent prop.
   */
  og?: OgCard | undefined;
  noindex?: boolean | undefined;
  /** The program theme of the page, so browser chrome follows the action accent. */
  theme?: ProgramTheme | undefined;
}

/**
 * Where a page sits, for the `BreadcrumbList` that `BaseLayout` emits: the trail below Home down
 * to and including the page. Every indexable page states one — the homepage's is empty, since it
 * is Home — and a `noindex` page, which no search result shows, takes none.
 */
export type Placement =
  | { noindex: true; trail?: never }
  | { noindex?: false | undefined; trail: readonly Breadcrumb[] };
