import { type PagePath, programs } from "@/data/site";

/**
 * Entry id to the path of its hand-written route, kept in sync by hand. An event with no entry here
 * fails the build.
 */
export const eventRoutes: ReadonlyMap<string, PagePath> = new Map<string, PagePath>([
  ["openhouse", "/openhouse/"],
  ["frc-kickoff", `${programs.frc.href}kickoff/`],
]);
