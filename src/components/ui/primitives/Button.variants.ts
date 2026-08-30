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
export const buttonVariantNames = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "pocket",
] as const;

type ButtonVariant = (typeof buttonVariantNames)[number];

export const buttonVariants = cva(
  cn(
    // `no-underline` because the base layer underlines every `<a>`, and this recipe renders as
    // an anchor whenever a Button gets an `href`. The `link` variant re-adds its underline.
    "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap no-underline",
    "transition-colors duration-(--duration-micro) ease-(--ease-toggle)",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ),
  {
    defaultVariants: { variant: "default", size: "md" },
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-card text-foreground border border-border hover:bg-card-hover",
        /** Over photography this gains a translucent card background (DESIGN.md §8). */
        outline: "border border-border text-foreground hover:border-primary/40 hover:bg-card/60",
        ghost: "text-foreground hover:bg-card",
        link: "text-primary-bright underline underline-offset-4 hover:no-underline",
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
