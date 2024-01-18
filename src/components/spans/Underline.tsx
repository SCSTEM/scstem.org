import { clsx } from "clsx";

import useParseColor from "@site/src/hooks/useParseColor";
import { ColorScale } from "@site/src/styles/theme";

type Props = {
  children: React.ReactNode;
  className?: string;
  color?: ColorScale;
};

export default function Underline({
  className,
  children,
  color,
}: Props): JSX.Element {
  const parsedColor = useParseColor(color);

  return (
    <span
      className={clsx("underline underline-offset-4", className)}
      style={{
        textDecorationColor: parsedColor,
      }}
    >
      {children}
    </span>
  );
}
