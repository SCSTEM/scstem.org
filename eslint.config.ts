import * as astroParser from "astro-eslint-parser";
import { configs as astroConfigs } from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

/**
 * ESLint owns `.astro` only; oxlint owns every other extension (docs/tooling.md).
 * The seam for collapsing onto oxc is in docs/adr/0001-toolchain-split.md.
 */
export default defineConfig(
  // Every block below is scoped to `**/*.astro`, so ESLint never reaches the
  // extensions oxlint owns. A blanket `ignores: ["**/*"]` cannot be used here:
  // it prunes directories, and unignoring files inside them does not bring them back.
  globalIgnores(["legacy/**", "dist/**", ".astro/**", "node_modules/**", "public/**"]),
  astroConfigs.recommended,
  astroConfigs["jsx-a11y-strict"],
  {
    files: ["**/*.astro"],
    extends: [tseslint.configs.strictTypeChecked],
    languageOptions: {
      // strictTypeChecked would install the TS parser directly, which cannot read
      // `.astro`. The Astro parser stays outermost and delegates frontmatter to it.
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
        // astro-eslint-parser does not implement projectService; it maps to `project`.
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { perfectionist },
    rules: {
      // Mirrors oxfmt's sortImports so the whole repo is sorted the same way.
      "perfectionist/sort-imports": "error",
    },
  },
);
