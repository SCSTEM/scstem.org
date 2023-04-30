import { Title } from "@mantine/core";

type Props = {
  children: React.ReactNode;
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

export default function Section({ children, alt, title }: Props): JSX.Element {
  if (alt)
    return (
      <div className="space-y-4 bg-zinc-200 dark:bg-black shadow-inner p-8">
        <div className="md:max-w-screen-xl mx-auto md:px-12">{children}</div>
      </div>
    );

  return (
    <div className="p-8 md:max-w-screen-xl mx-auto">
      <Title
        order={2}
        className="text-2xl font-black mb-6 text-center md:text-left"
      >
        {title}
      </Title>
      {children}
    </div>
  );
}
