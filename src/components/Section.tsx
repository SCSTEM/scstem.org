import { Title } from "@mantine/core";
import clsx from "clsx";

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
}: Props): JSX.Element {
  if (alt)
    return (
      <section className={clsx("space-y-4 shadow-inner p-8", className)}>
        <div className="md:max-w-screen-lg mx-auto md:px-12">{children}</div>
      </section>
    );

  return (
    <section
      className={clsx("px-6 py-10 md:max-w-screen-xl mx-auto", className)}
    >
      <Title order={3}>{title}</Title>
      <div className="mt-6">{children}</div>
    </section>
  );
}
