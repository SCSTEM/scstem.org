import { parseForESLint } from "astro-eslint-parser";
import { configs as astroConfigs } from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  // Every block below is scoped to `**/*.astro`, so ESLint never reaches the
  // extensions oxlint owns. A blanket `ignores: ["**/*"]` cannot be used here:
  // it prunes directories, and unignoring files inside them does not bring them back.
  globalIgnores(["legacy/**", "dist/**", ".astro/**", "node_modules/**", "public/**"]),
  astroConfigs.recommended,
  astroConfigs["jsx-a11y-strict"],
  {
    extends: [tseslint.configs.strictTypeChecked],
    files: ["**/*.astro"],
    languageOptions: {
      // strictTypeChecked would install the TS parser directly, which cannot read
      // `.astro`. The Astro parser stays outermost and delegates frontmatter to it.
      parser: { parseForESLint },
      parserOptions: {
        extraFileExtensions: [".astro"],
        parser: tseslint.parser,
        // astro-eslint-parser does not implement projectService; it maps to `project`.
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { perfectionist },
    rules: {
      // Mirrors oxfmt's sortImports so the whole repo is sorted the same way.
      "perfectionist/sort-imports": "error",
      // Restated from .oxlintrc.json, which ignores `**/*.astro`. ESLint is the
      // only linter that reads this extension, so without this the two bans
      // AGENTS.md leads with are off in the file type the site is built from.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              // `**`, not `*`: a single star matches one path segment, so `legacy/*` let
              // `legacy/data/config` and every deep relative path through.
              group: ["legacy/**", "**/legacy/**"],
              message: "legacy/ is reference only — never import from it (plan/00-overview.md)",
            },
          ],
        },
      ],
    },
  },
);
