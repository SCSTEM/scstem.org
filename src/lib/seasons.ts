import { type CollectionEntry, getCollection } from "astro:content";

import { programs } from "@/data/site";

type Season = CollectionEntry<"frcRobots">;

/** Every Biohazard season on record, newest first. */
export const getSeasons = async (): Promise<Season[]> =>
  (await getCollection("frcRobots")).toSorted((a, b) => b.data.year - a.data.year);

/**
 * Seasons competed, counted from the founding year rather than from the entries: one robot can
 * span two seasons, as the 2020–2021 one did.
 */
export const seasonCount = (seasons: readonly Season[]): number =>
  (seasons[0]?.data.year ?? programs.frc.since) - programs.frc.since + 1;

/**
 * Every award won, one per award per event. Regional winner and finalist titles count as awards
 * because FIRST presents them as such.
 */
export const awardCount = (seasons: readonly Season[]): number =>
  seasons.reduce((total, season) => total + (season.data.awards?.length ?? 0), 0);

/** Seasons that reached the FIRST Championship, oldest first. */
export const championshipSeasons = (seasons: readonly Season[]): Season[] =>
  seasons
    .filter((season) => season.data.events?.some((event) => event.startsWith("FIRST Championship")))
    .toReversed();
