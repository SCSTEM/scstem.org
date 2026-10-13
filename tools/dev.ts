/**
 * `astro dev` cannot run Pages Functions, so wrangler serves them beside it and the dev server
 * proxies `/api` to the origin passed in `FUNCTIONS_ORIGIN`. Wrangler is given an empty asset
 * directory: Astro serves the pages, wrangler only the Functions. Either process exiting stops the
 * other.
 */
import { type ChildProcess, spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const FUNCTIONS_PORT = 8788;
const ASSETS = join(".wrangler", "dev-assets");

mkdirSync(ASSETS, { recursive: true });

const children: ChildProcess[] = [
  spawn(
    "wrangler",
    [
      "pages",
      "dev",
      ASSETS,
      "--port",
      String(FUNCTIONS_PORT),
      "--show-interactive-dev-session=false",
    ],
    { stdio: "inherit" },
  ),
  spawn("astro", ["dev", ...process.argv.slice(2)], {
    env: { ...process.env, FUNCTIONS_ORIGIN: `http://localhost:${String(FUNCTIONS_PORT)}` },
    stdio: "inherit",
  }),
];

const stop = (code: number): void => {
  for (const child of children) {
    child.kill("SIGTERM");
  }
  process.exitCode = code;
};

for (const child of children) {
  child.on("exit", (code) => {
    stop(code ?? 0);
  });
}

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    stop(0);
  });
}
