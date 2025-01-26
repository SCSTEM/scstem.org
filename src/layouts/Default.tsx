import type { ReactNode, JSX } from "react";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props): ReactNode {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />

      <div className="flex-auto flex flex-col *:flex-auto">{children}</div>

      <Footer />
    </div>
  );
}
