import { useHistory } from "@docusaurus/router";
import { NextUIProvider } from "@nextui-org/react";
import clsx from "clsx";
import { useEffect } from "react";
import useDarkMode from "use-dark-mode";

import "@site/src/styles/tailwind.css";

export default function UIProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const navigate = useHistory();
  const { value: dark } = useDarkMode(true, {
    classNameDark: "dark",
    classNameLight: "light",
    storageKey: "darkMode",
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [dark]);

  return (
    <NextUIProvider navigate={navigate.push}>
      <div
        className={clsx(dark ? "dark" : "", "text-foreground bg-background")}
      >
        {children}
      </div>
    </NextUIProvider>
  );
}
