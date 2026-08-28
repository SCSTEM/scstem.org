#!/usr/bin/env node
/**
 * Fails if `.lycheeignore` still excludes a route that now exists in `dist`.
 *
 * The ignore file exists only because the app shell (Phase 05) links to routes Phase 07 builds.
 * Without this check, an entry left behind after its page lands would silently exclude that page
 * from the link check forever — turning a temporary workaround into a permanent blind spot.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const IGNORE_FILE = ".lycheeignore";
const DIST = "dist";

if (!existsSync(IGNORE_FILE)) {
  process.exit(0);
}

const routes = readFileSync(IGNORE_FILE, "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0 && !line.startsWith("#"))
  .map((pattern) => {
    const route = /^\/dist(?<route>\/.*?)\$$/u.exec(pattern)?.groups?.route;
    /**
     * An entry this script cannot parse used to be dropped silently — invisible to the staleness
     * check while lychee still applied it as a regex, which is exactly the permanent blind spot
     * the guard exists to prevent. A malformed entry is a hard failure instead.
     */
    if (route === undefined) {
      console.error(
        `${IGNORE_FILE}: cannot parse ${pattern}. Entries must read /dist/<route>$ so this check can tell when the route has been built.`,
      );
      process.exit(1);
    }
    return route;
  });

const stale = routes.filter((route) => existsSync(join(DIST, route, "index.html")));

if (stale.length > 0) {
  console.error(
    `${IGNORE_FILE} excludes ${String(stale.length)} route(s) that now exist. Remove them so the link check covers these pages again:\n${stale.map((route) => `  ${route}`).join("\n")}`,
  );
  process.exit(1);
}

console.log(
  `${IGNORE_FILE}: ${String(routes.length)} route(s) excluded, none built yet — nothing stale.`,
);
