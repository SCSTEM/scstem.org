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
  .map((pattern) => /^\/dist(?<route>\/.*?)\$$/u.exec(pattern)?.groups?.route)
  .filter((route) => route !== undefined);

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
