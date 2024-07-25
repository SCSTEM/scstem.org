"use client";

import { Tooltip } from "@nextui-org/react";
import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  tooltip: ReactNode;
};

export default function IconTooltip({ icon, tooltip }: Props): JSX.Element {
  return (
    <>
      <div>
        <Tooltip content={tooltip}>{icon}</Tooltip>
      </div>
    </>
  );
}
