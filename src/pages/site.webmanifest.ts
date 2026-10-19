import type { APIRoute } from "astro";

import { site } from "@/data/site";
import { color } from "@/lib/tokens";

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: site.name,
        short_name: site.shortName,
        description: site.description,
        start_url: "/",
        display: "standalone",
        background_color: color("background"),
        theme_color: color("primary"),
        icons: [
          { src: site.icons.svg, type: "image/svg+xml", sizes: "any" },
          { src: site.icons.png192, type: "image/png", sizes: "192x192" },
          { src: site.icons.png512, type: "image/png", sizes: "512x512" },
          // Padded render: a launcher's circular mask keeps only the central 80%-diameter circle,
          // and the unpadded mark spans ~88% of its box.
          {
            src: site.icons.maskable512,
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
      },
      undefined,
      2,
    ),
    { headers: { "content-type": "application/manifest+json" } },
  );
