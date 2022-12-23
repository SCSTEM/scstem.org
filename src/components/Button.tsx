import Link from "@docusaurus/Link";
import React from "react";
import { Button as MButton, ButtonProps } from "@mantine/core";

interface Props extends ButtonProps {
  children: React.ReactNode;
  to: string;
}

export default function Button(props: Props): JSX.Element {
  return (
    <Link to={props.to}>
      <MButton {...props}>{props.children}</MButton>
    </Link>
  );
}
