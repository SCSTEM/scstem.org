import { readdir } from "node:fs/promises";
import { join } from "node:path";

/** Every file under `dir`, recursively, whose name passes `keep`. */
export const walk = async (dir: string, keep: (name: string) => boolean): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(path, keep);
      }
      return keep(entry.name) ? [path] : [];
    }),
  );
  return nested.flat();
};
