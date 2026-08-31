import { cva } from "class-variance-authority";

/**
 * Spec labels stamped onto the sheet (DESIGN.md §8): uppercase, tracked, transparent fill, a
 * 40%-alpha border in the badge's own color — all carried by the `spec-chip` utility. Filled
 * dark-on-dark tier pills are banned, as are pill radii — these are `radius-sm` plates.
 */

/** Exported so `/styleguide` renders every tone; `satisfies` keeps the two in lockstep. */
export const badgeToneNames = [
  "default",
  "muted",
  "info",
  "platinum",
  "gold",
  "silver",
  "bronze",
] as const;

type BadgeTone = (typeof badgeToneNames)[number];

export const badgeVariants = cva("spec-chip", {
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
    } satisfies Record<BadgeTone, string>,
  },
});
