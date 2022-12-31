import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Highlight({ children }: Props) {
  return (
    <span className="bg-gradient-to-r from-m_yellow-5 to-m_yellow-9 bg-clip-text text-transparent dark:from-m_yellow-4 dark:to-m_yellow-7">
      {children}
    </span>
  );
}
