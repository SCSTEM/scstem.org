import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

/**
 * Spec labels stamped onto the sheet (DESIGN.md §8): uppercase, tracked, transparent fill, a
 * 40%-alpha border in the badge's own color. Filled dark-on-dark tier pills are banned, as are
 * pill radii — these are `radius-sm` plates.
 */
export const badgeVariants = cva(cn("spec-chip", "border-current/40"), {
  defaultVariants: { tone: "default" },
  variants: {
    tone: {
      default: "text-primary-bright",
      muted: "text-muted",
      info: "text-info-bright",
      platinum: "text-tier-platinum",
      gold: "text-tier-gold",
      silver: "text-tier-silver",
      bronze: "text-tier-bronze",
    },
  },
});
