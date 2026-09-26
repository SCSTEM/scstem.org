import type { APIRoute } from "astro";

import { site } from "@/data/site";
import { color } from "@/lib/tokens";

/**
 * The web app manifest, emitted from the same constants and tokens everything else reads, so a
 * rename or a token change cannot leave it behind.
 */
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
          /**
           * A separate, padded render. The unpadded mark spans ~88% of its box, so a launcher's
           * circular mask — which keeps only the central 80%-diameter circle — clipped the outer
           * stroke and the gear teeth. Reusing the plain icon here was strictly worse than
           * declaring no maskable icon at all, since without one the browser letterboxes instead
           * of cropping.
           */
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
