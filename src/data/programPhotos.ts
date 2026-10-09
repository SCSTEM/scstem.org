import type { ImageMetadata } from "astro";

import fllRobots from "@/assets/fll/lego-robots.webp";
import driveTeam from "@/assets/frc/frc-driveteam.webp";
import students from "@/assets/sc2/students.webp";
import { type ProgramKey, programs } from "@/data/site";

/**
 * Each program's representative photograph and its alt text: the program cards, the program
 * heroes, and the fallback hero of an event that carries no photo of its own. Kept apart from
 * `site.ts`, which stays import-free so Node tools can load it directly.
 */
export const programPhotos = {
  sc2: {
    image: students,
    alt: "South Central STEM Collective students at work in the Chambersburg workspace",
  },
  frc: {
    image: driveTeam,
    alt: `Team ${String(programs.frc.teamNumber)} ${programs.frc.teamName}'s drive team standing with their robot at competition`,
  },
  fll: {
    image: fllRobots,
    alt: "LEGO® robots built by South Central STEM Collective students",
  },
} as const satisfies Record<ProgramKey, { image: ImageMetadata; alt: string }>;
