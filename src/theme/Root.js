import { ParallaxProvider } from "react-scroll-parallax";

import RootStyleRegistry from "@site/src/styles/mantine";

export default function Root({ children }) {
  return (
    <RootStyleRegistry>
      <ParallaxProvider>{children}</ParallaxProvider>
    </RootStyleRegistry>
  );
}
