import type { OgCard } from "@/lib/seo";

import ogDonate from "@/assets/og/donate.jpg";
import ogEvents from "@/assets/og/events.jpg";
import ogFll from "@/assets/og/fll.jpg";
import ogFrc from "@/assets/og/frc.jpg";
import ogPrograms from "@/assets/og/programs.jpg";
import ogSponsors from "@/assets/og/sponsors.jpg";

/**
 * The social cards a page can carry in place of the site-wide default (`site.ogImage`), each
 * with the alt text that describes it. `tools/assets/og-cards.ts` renders the images; a card's
 * alt changes in the same commit as its photo or title there.
 */
export const ogCards = {
  donate: {
    image: ogDonate,
    alt: "The South Central STEM Collective logo over a rack of drill bits, captioned “Donate”",
  },
  events: {
    image: ogEvents,
    alt: "The South Central STEM Collective logo over a collage of students at work, captioned “Events”",
  },
  fll: {
    image: ogFll,
    alt: "The South Central STEM Collective logo over a student-built LEGO robot, captioned “FIRST LEGO League”",
  },
  frc: {
    image: ogFrc,
    alt: "The South Central STEM Collective logo over the Biohazard drive team at competition, captioned “FIRST Robotics Competition”",
  },
  programs: {
    image: ogPrograms,
    alt: "The South Central STEM Collective logo over students working in the workshop, captioned “Our programs”",
  },
  sponsors: {
    image: ogSponsors,
    alt: "The South Central STEM Collective logo over a workbench of parts and notes, captioned “Sponsors”",
  },
} as const satisfies Record<string, OgCard>;
