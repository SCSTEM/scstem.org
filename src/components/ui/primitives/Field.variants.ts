import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

export const fieldVariants = cva(
  cn(
    "w-full rounded-md border bg-card px-3 text-copy text-foreground",
    "placeholder:text-muted",
    "transition-colors duration-(--sc2-duration-micro) ease-(--sc2-ease-toggle)",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
  {
    defaultVariants: { control: "input", invalid: false },
    variants: {
      control: {
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
