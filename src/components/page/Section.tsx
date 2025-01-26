import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
} & (
  | {
      alt?: false;
      title: string;
    }
  | {
      alt?: true;
      title?: never;
    }
);

export default function Section({
  children,
  alt,
  title,
  className,
}: Props): ReactNode {
  if (alt)
    return (
      <section className={cn("shadow-inner p-8", className)}>
        <div className="md:max-w-screen-xl xl:max-w-screen-2xl mx-auto md:px-12">
          {children}
        </div>
      </section>
    );

  return (
    <section
      className={cn(
        "px-6 py-10 md:max-w-screen-xl xl:max-w-screen-2xl mx-auto",
        className,
      )}
    >
      <h3 className="font-semibold text-2xl font-heading text-center">
        {title}
      </h3>
      <div className="mt-6">{children}</div>
    </section>
  );
}
