import Link from "@docusaurus/Link";
import { Button as MButton, ButtonProps } from "@mantine/core";
import { ReactNode } from "react";

interface Props extends ButtonProps {
  children: ReactNode;
  to: string;
  className?: string;
}

export default function Button(props: Props): JSX.Element {
  return (
    <Link to={props.to} className={props.className}>
      <MButton radius="lg" {...props}>
        {props.children}
      </MButton>
    </Link>
  );
}
