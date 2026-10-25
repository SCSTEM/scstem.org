import { spawnSync } from "node:child_process";

import { runLighthouse } from "./lighthouse-runner.ts";

process.exitCode = runLighthouse((args) => {
  const result = spawnSync("lhci", args, { stdio: "inherit" });
  if (result.error) console.error(result.error.message);
  return result.status ?? 1;
});
