import { type CollectionEntry, getCollection } from "astro:content";

import { programs } from "@/data/site";

type Season = CollectionEntry<"frcRobots">;

export const getSeasons = async (): Promise<Season[]> =>
  (await getCollection("frcRobots")).toSorted((a, b) => b.data.year - a.data.year);

/** Counted from the founding year, not from the entries: one robot can span two seasons. */
export const seasonCount = (seasons: readonly Season[]): number =>
  (seasons[0]?.data.year ?? programs.frc.since) - programs.frc.since + 1;

/** Regional winner and finalist titles count as awards because FIRST presents them as such. */
export const awardCount = (seasons: readonly Season[]): number =>
  seasons.reduce((total, season) => total + (season.data.awards?.length ?? 0), 0);

export const championshipSeasons = (seasons: readonly Season[]): Season[] =>
  seasons
    .filter((season) => season.data.events?.some((event) => event.startsWith("FIRST Championship")))
    .toReversed();
