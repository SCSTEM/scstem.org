import { clsx } from "@mantine/core";
import React from "react";

interface Props {
  theme?: "light" | "dark";
  children: React.ReactNode;
}

export default function Highlight({ children, theme }: Props) {
  return (
    <span
      className={clsx(
        theme // If a theme was provided, update styles accordingly
          ? theme === "light"
            ? "from-m_blue-4 to-m_blue-8" // Light theme
            : "from-m_yellow-5 to-m_yellow-8" // Dark theme
          : "from-m_blue-4 to-m_blue-8  dark:from-m_yellow-5 dark:to-m_yellow-8", // No theme specified
        "bg-gradient-to-r bg-clip-text text-transparent" // Common styles
      )}
    >
      {children}
    </span>
  );
}
