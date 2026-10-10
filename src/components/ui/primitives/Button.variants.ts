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
export const buttonVariantNames = ["default", "secondary", "outline", "ghost"] as const;

type ButtonVariant = (typeof buttonVariantNames)[number];

export const buttonVariants = cva(
  cn(
    // `pb-0` because the base layer draws the link underline on every `<a>` as a background
    // image over a little bottom padding, and this recipe renders as an anchor whenever a Button
    // gets an `href`. Each variant replaces the image: the keycap and the pocket with their own
    // faces, the flat variants with `bg-none`.
    "inline-flex items-center justify-center gap-2 rounded-md pb-0 font-semibold whitespace-nowrap",
    // Duration and easing only: each variant names the properties it animates, because the
    // keycaps also move their face and offset.
    "duration-(--sc2-duration-micro) ease-(--sc2-ease-toggle)",
    // A disabled control is a grey cap seated flush: no edge, no travel, a muted label. Fading
    // the accent face instead would muddy it to olive.
    "disabled:pointer-events-none disabled:translate-none disabled:border-border disabled:bg-sheet disabled:bg-none disabled:text-muted disabled:shadow-none",
    "aria-disabled:pointer-events-none aria-disabled:translate-none aria-disabled:border-border aria-disabled:bg-sheet aria-disabled:bg-none aria-disabled:text-muted aria-disabled:shadow-none",
  ),
  {
    defaultVariants: { variant: "default", size: "md" },
    variants: {
      variant: {
        /**
         * The accent keycap (DESIGN.md §8): the fill never dims on hover — the control lifts off
         * its drafted edge instead, and presses onto it when clicked.
         */
        default: "keycap text-primary-foreground",
        /**
         * A machined pocket at control scale — the quiet control, and the chrome that sits over
         * content (carousel arrows). Inside a band it lies on the table as a plate.
         */
        secondary: "pocket pocket-interactive text-foreground",
        /**
         * Flat, beside the raised accent keycap: an opaque sheet face with a plate's top catch,
         * so it reads the same over photography, and an edge at ≥ 3:1 against every surface it
         * sits on. Hover warms the edge to the accent; a press drops the face into a pocket.
         */
        outline: cn(
          "border border-control-edge bg-sheet bg-none text-foreground shadow-table-edge transition-colors",
          "hover:border-primary active:bg-card active:shadow-pocket",
        ),
        ghost:
          "bg-none text-foreground transition-colors hover:bg-card disabled:bg-transparent aria-disabled:bg-transparent",
      } satisfies Record<ButtonVariant, string>,
      size: {
        /** Every size clears the 44px minimum touch target. */
        sm: "h-11 px-3 text-small",
        md: "h-11 px-5 text-copy",
        lg: "h-12 px-7 text-lead",
        icon: "size-11",
      },
    },
  },
);
