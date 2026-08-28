import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

/**
 * The shared recipe for text controls (DESIGN.md §8): pocket floor, hairline border, accent focus
 * ring. `Input` and `Textarea` differ only in height versus vertical padding, so the invalid,
 * disabled and transition treatment has one definition — a `Select` composes the same recipe.
 */
export const fieldVariants = cva(
  cn(
    "w-full rounded-md border bg-card px-3 text-copy text-foreground",
    "placeholder:text-muted",
    "transition-colors duration-(--duration-micro) ease-(--ease-toggle)",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
  {
    defaultVariants: { control: "input", invalid: false },
    variants: {
      control: {
        /** A single-line control is a 44px touch target. */
        input: "h-11",
        textarea: "py-2",
      },
      invalid: {
        true: "border-destructive-bright",
        false: "border-border hover:border-primary/40",
      },
    },
  },
);
