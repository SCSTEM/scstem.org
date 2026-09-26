import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

/**
 * Astro forbids exporting values from a component (`astro/no-exports-from-components`), so CVA
 * definitions live in a sibling `*.variants.ts`. Other components can then compose these
 * classes — a link styled as a button, say — without duplicating the recipe.
 */

/**
 * The variant inventory, exported so `/styleguide` renders every one — a variant missing there
 * does not exist as far as review is concerned (primitives/README.md). `satisfies` below keeps
 * this list and the recipe map in lockstep.
 */
export const buttonVariantNames = ["default", "secondary", "outline", "ghost", "pocket"] as const;

type ButtonVariant = (typeof buttonVariantNames)[number];

export const buttonVariants = cva(
  cn(
    // `bg-none pb-0` because the base layer draws the link underline on every `<a>` as a
    // background image over a little bottom padding, and this recipe renders as an anchor
    // whenever a Button gets an `href`.
    "inline-flex items-center justify-center gap-2 rounded-md bg-none pb-0 font-medium whitespace-nowrap",
    // Duration and easing only: each variant names the properties it animates, because the
    // keycaps also move their face and offset.
    "duration-(--duration-micro) ease-(--ease-toggle)",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ),
  {
    defaultVariants: { variant: "default", size: "md" },
    variants: {
      variant: {
        /**
         * The accent keycap (DESIGN.md §8): the fill never dims on hover — the control lifts off
         * its drafted edge instead, and presses flat when clicked.
         */
        default: "keycap bg-primary text-primary-foreground keycap-accent",
        secondary:
          "border border-border bg-card text-foreground transition-colors hover:bg-card-hover",
        /**
         * A neutral keycap: an opaque sheet face, so it reads the same over photography, with an
         * edge at ≥ 3:1 against every surface it sits on. Hover warms the edge to the accent.
         */
        outline: "keycap border border-control-edge bg-sheet text-foreground hover:border-primary",
        ghost: "text-foreground transition-colors hover:bg-card",
        /**
         * A machined pocket rather than a filled control — for chrome that sits over content
         * (carousel arrows, a dialog's close). Shares the base recipe so the touch target and
         * focus behavior cannot drift from every other button.
         */
        pocket: "pocket pocket-interactive text-foreground",
      } satisfies Record<ButtonVariant, string>,
      size: {
        /**
         * Every size clears the 44px minimum touch target except `sm`, which is for dense,
         * non-primary controls that sit inside an already-large target.
         */
        sm: "h-9 px-3 text-small",
        md: "h-11 px-5 text-copy",
        lg: "h-12 px-7 text-body-lg",
        icon: "size-11",
      },
    },
  },
);
