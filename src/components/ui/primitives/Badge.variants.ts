import { cva } from "class-variance-authority";

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
