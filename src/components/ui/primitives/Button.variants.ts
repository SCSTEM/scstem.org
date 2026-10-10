import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

export const buttonVariantNames = ["default", "secondary", "ghost"] as const;

type ButtonVariant = (typeof buttonVariantNames)[number];

export const buttonVariants = cva(
  cn(
    // `pb-0`: the base layer draws link underlines as a background image over bottom padding,
    // and this recipe renders as an anchor given an `href`. Each variant replaces the image.
    "inline-flex items-center justify-center gap-2 rounded-md pb-0 font-semibold whitespace-nowrap",
    // Timing only; each variant names the properties it animates.
    "duration-(--sc2-duration-micro) ease-(--sc2-ease-toggle)",
    "disabled:pointer-events-none disabled:translate-none disabled:border-border disabled:bg-sheet disabled:bg-none disabled:text-muted disabled:shadow-none",
    "aria-disabled:pointer-events-none aria-disabled:translate-none aria-disabled:border-border aria-disabled:bg-sheet aria-disabled:bg-none aria-disabled:text-muted aria-disabled:shadow-none",
  ),
  {
    defaultVariants: { variant: "default", size: "md" },
    variants: {
      variant: {
        default: "keycap keycap-primary text-primary-foreground",
        secondary: "keycap keycap-secondary text-foreground",
        ghost:
          "bg-none text-foreground transition-colors hover:bg-card disabled:bg-transparent aria-disabled:bg-transparent",
      } satisfies Record<ButtonVariant, string>,
      size: {
        /** Every size clears the 44px touch-target minimum. */
        sm: "h-11 px-4 text-small",
        md: "h-11.5 px-5.5 text-copy",
        lg: "h-13 px-7 text-lead",
        icon: "size-11",
      },
    },
  },
);
