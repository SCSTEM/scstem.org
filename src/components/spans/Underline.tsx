import { clsx } from "clsx";

import { ExtendedCustomColors } from "@site/src";

type Props = {
  children: React.ReactNode;
  className?: string;
  color?: ExtendedCustomColors;
};

// TODO: Fix
// const useStyles = createStyles((theme, { color }: Props) => ({
//   underline: {
//     textDecorationColor: theme.colors[color || "brand-yellow"][5],
//   },
// }));

export default function Underline(props: Props): JSX.Element {
  // const { classes } = useStyles(props);

  return (
    <span
      className={clsx(
        "underline underline-offset-4",
        // classes.underline,
        props.className,
      )}
    >
      {props.children}
    </span>
  );
}
