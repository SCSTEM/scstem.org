import Link from "@docusaurus/Link";
import { Button as MButton, ButtonProps } from "@mantine/core";

export type Props = {
  to: string;
} & ButtonProps;

export default function Button(props: Props): JSX.Element {
  return (
    <Link to={props.to}>
      <MButton {...props}>{props.children}</MButton>
    </Link>
  );
}
