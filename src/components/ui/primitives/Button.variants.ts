import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

/**
 * Astro forbids exporting values from a component (`astro/no-exports-from-components`), so CVA
 * definitions live in a sibling `*.variants.ts`. Other components can then compose these
 * classes — a link styled as a button, say — without duplicating the recipe.
 */
export const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap",
    "transition-colors duration-(--duration-micro) ease-(--ease-toggle)",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-card text-foreground border border-border hover:bg-card-hover",
        /** Over photography this gains a translucent card background (DESIGN.md §8). */
        outline: "border border-border text-foreground hover:border-primary/40 hover:bg-card/60",
        ghost: "text-foreground hover:bg-card",
        link: "text-primary-bright underline underline-offset-4 hover:no-underline",
      },
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
    defaultVariants: { variant: "default", size: "md" },
  },
);
