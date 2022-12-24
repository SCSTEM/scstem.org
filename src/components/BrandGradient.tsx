import React from "react";

import { RadialGradient } from "@visx/gradient";

interface Props {
  className?: string;
}

export default function BrandGradient({ className }: Props): JSX.Element {
  return (
    <svg className={className}>
      <RadialGradient id="brand-gradient" from="#FACC15" to="#171717" />
    </svg>
  );
}
