import { ParallaxProvider } from "react-scroll-parallax";

import RootStyleRegistry from "@site/src/components/util/mantine";

export default function Root({ children }) {
  return (
    <RootStyleRegistry>
      <ParallaxProvider>{children}</ParallaxProvider>
    </RootStyleRegistry>
  );
}
