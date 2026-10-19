import type { WIKI_SECTIONS } from "@/content.config";

import { type PagePath, site } from "@/data/site";

type WikiSection = (typeof WIKI_SECTIONS)[number];

export const wikiPath = (id: string): PagePath => `${site.urls.wiki}/${id}`;

export const wikiSectionId = (section: WikiSection): string => section.toLowerCase();

export const wikiSectionPath = (section: WikiSection): PagePath =>
  `${site.urls.wiki}#${wikiSectionId(section)}`;
