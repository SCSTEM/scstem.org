import { ParallaxProvider } from "react-scroll-parallax";

import "@site/src/styles/docusaurus.css";
import "@site/src/styles/fonts.css";
import RootStyleRegistry from "@site/src/styles/mantine";
import UIProvider from "@site/src/styles/nextui";

export default function Root({ children }) {
  return (
    <UIProvider>
      <RootStyleRegistry>
        <ParallaxProvider>{children}</ParallaxProvider>
      </RootStyleRegistry>
    </UIProvider>
  );
}
