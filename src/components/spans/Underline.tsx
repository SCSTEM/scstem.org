import { clsx } from "@mantine/core";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Underline(props: Props): JSX.Element {
  return (
    <span
      className={clsx(
        "underline decoration-yellow underline-offset-4",
        props.className
      )}
    >
      {props.children}
    </span>
  );
}
