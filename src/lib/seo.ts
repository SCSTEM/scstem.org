import type { ImageMetadata } from "astro";

import type { ProgramTheme } from "@/data/site";
import type { Breadcrumb } from "@/lib/jsonld";

export interface OgCard {
  readonly alt: string;
  readonly image: ImageMetadata;
}

/**
 * Declared in a `.ts` module because typed linting cannot resolve types imported from `.astro`
 * files.
 */
export interface SeoProps {
  title: string;
  /** 50–160 characters, written for a human deciding whether to click. */
  description: string;
  /**
   * The optional props are `| undefined` because layouts forward them straight through, and
   * `exactOptionalPropertyTypes` treats an explicit `undefined` as distinct from an absent prop.
   */
  og?: OgCard | undefined;
  noindex?: boolean | undefined;
  theme?: ProgramTheme | undefined;
}

export type Placement =
  { noindex: true; trail?: never } | { noindex?: false | undefined; trail: readonly Breadcrumb[] };
