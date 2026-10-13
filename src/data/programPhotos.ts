import type { ImageMetadata } from "astro";

import fllRobots from "@/assets/fll/lego-robots.webp";
import driveTeam from "@/assets/frc/frc-driveteam.webp";
import students from "@/assets/sc2/students.webp";
import { type ProgramKey, programs } from "@/data/site";

export const programPhotos = {
  sc2: {
    image: students,
    alt: "South Central STEM Collective students at work in the Chambersburg workspace",
    caption: "Students in the workspace",
  },
  frc: {
    image: driveTeam,
    alt: `Team ${String(programs.frc.teamNumber)} ${programs.frc.teamName}'s drive team standing with their robot at competition`,
    caption: "Drive team and robot",
  },
  fll: {
    image: fllRobots,
    alt: "LEGO® robots built by South Central STEM Collective students",
    caption: "Student-built LEGO® robots",
  },
} as const satisfies Record<ProgramKey, { image: ImageMetadata; alt: string; caption: string }>;
