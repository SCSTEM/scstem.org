import Link from "@docusaurus/Link";
import { Button as MButton, ButtonProps } from "@mantine/core";

import classes from "./Button.module.css";

type Props = {
  to: string;
} & ButtonProps;

export function Button(props: Props): JSX.Element {
  return (
    <Link to={props.to}>
      <MButton {...props}>{props.children}</MButton>
    </Link>
  );
}

export function BrandButton(props: Props): JSX.Element {
  return (
    <Button classNames={{ root: classes.root }} size="compact-md" {...props} />
  );
}
