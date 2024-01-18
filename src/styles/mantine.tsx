import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

type RootStyleRegistryProps = {
  children: React.ReactNode;
};

export default function RootStyleRegistry({
  children,
}: RootStyleRegistryProps) {
  return <MantineProvider>{children}</MantineProvider>;
}
