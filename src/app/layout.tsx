import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";

import { Providers } from "@/components/Providers";
import { DefaultLayout } from "@/layouts/Default";
import { cn } from "@/lib/utils";
import { inter, orbitron, scp } from "@/styles/fonts";
import "@/styles/globals.css";
import { colorScales } from "@/styles/theme";

export const metadata: Metadata = {
  title: {
    template: "%s | South Central STEM Collective",
    default: "South Central STEM Collective",
  },
  description:
    "The South Central STEM Collective is a non-profit organization focused on building the future of STEM, right here in Franklin County, Pennsylvania.",
  keywords: [
    "robotics",
    "makerspace",
    "STEM",
    "community",
    "Chambersburg",
    "Pennsylvania",
    "FIRST Robotics",
    "engineering",
    "programming",
    "computers",
    "technology",
    "hands on",
    "education",
    "workspace",
    "tools",
    "Lego",
    "drive robots",
    "kids",
    "club",
    "homeschool",
    "after school",
    "Franklin County",
  ],
  metadataBase: new URL("https://scstem.org"),
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: colorScales.yellow.DEFAULT,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html
      lang="en"
      className={cn("dark", inter.variable, orbitron.variable, scp.variable)}
    >
      <body>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
        <GoogleTagManager gtmId="G-3TPD3DLYBR" />
      </body>
    </html>
  );
}
