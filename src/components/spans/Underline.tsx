import { cn } from "@/lib/utils";
import { parseColor, type ColorScale } from "@/styles/theme";

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
  return (
    <span
      className={cn("underline underline-offset-4", className)}
      style={{
        textDecorationColor: parseColor(color),
      }}
    >
      {children}
    </span>
  );
}
