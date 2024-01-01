import { useHistory } from "@docusaurus/router";
import { NextUIProvider } from "@nextui-org/react";
import clsx from "clsx";
import useLocalStorage from "use-local-storage";

import "@site/src/styles/tailwind.css";

export default function UIProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const navigate = useHistory();
  const [theme] = useLocalStorage("theme", "dark", {
    serializer: (obj) => obj,
    parser: (str) => str,
  });
  return (
    <NextUIProvider navigate={navigate.push}>
      <div
        className={clsx(
          theme === "dark" ? "dark" : "light",
          "text-foreground bg-background",
        )}
      >
        {children}
      </div>
    </NextUIProvider>
  );
}
