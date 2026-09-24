import type { ImageMetadata } from "astro";

import type { ProgramTheme } from "@/data/site";

/**
 * The props of `Seo.astro`, which `BaseLayout` takes as its own and forwards unchanged. It lives
 * in a `.ts` module because typed linting cannot resolve a type imported from an `.astro` file.
 */
export interface SeoProps {
  title: string;
  /** 50–160 characters, written for a human deciding whether to click. */
  description: string;
  /**
   * Defaults to the site-wide card image. These are declared `| undefined` because layouts
   * forward them straight through, and `exactOptionalPropertyTypes` treats an explicitly
   * passed `undefined` as distinct from an absent prop.
   */
  ogImage?: ImageMetadata | string | undefined;
  /**
   * Required alongside a custom `ogImage` — `Seo.astro` enforces it, so the omission is a build failure
   * rather than a card with no `og:image:alt`. The default image carries its own alt.
   */
  ogImageAlt?: string | undefined;
  noindex?: boolean | undefined;
  /** The program theme of the page, so browser chrome follows the action accent. */
  theme?: ProgramTheme | undefined;
}
