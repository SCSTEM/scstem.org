import astro from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["legacy/", "dist/", ".astro/", "public/"]),
  {
    files: ["**/*.{ts,mts,js,mjs,astro}"],
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { perfectionist },
    rules: {
      "no-console": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "classnames", message: "Use `cn` from `@/lib/cn` (AGENTS.md)." },
            { name: "clsx", message: "Use `cn` from `@/lib/cn` (AGENTS.md)." },
            { name: "tailwind-merge", message: "Use `cn` from `@/lib/cn` (AGENTS.md)." },
          ],
          // `**`, not `*`: a single star matches one path segment and lets deep imports through.
          patterns: [
            { group: ["legacy/**", "**/legacy/**"], message: "legacy/ is reference only." },
          ],
        },
      ],
      "perfectionist/sort-imports": "error",
    },
  },
  {
    // A Worker's console is its log stream; a CLI script's console is how it reports.
    files: ["functions/**", "tools/**"],
    rules: { "no-console": "off" },
  },
  {
    files: ["**/*.astro"],
    extends: [astro.configs.recommended, astro.configs["jsx-a11y-strict"]],
    languageOptions: {
      parserOptions: {
        extraFileExtensions: [".astro"],
        parser: tseslint.parser,
        // astro-eslint-parser does not implement projectService.
        project: true,
        projectService: false,
      },
    },
    rules: {
      // The parser does not type expressions in the template, so every `items.map(() => <El />)`
      // resolves as `error`. Frontmatter is fully typed and `astro check` covers the template.
      "@typescript-eslint/no-unsafe-return": "off",
      // A `return` in frontmatter (redirect, 404) has no enclosing function in the parser's AST,
      // which crashes this rule.
      "@typescript-eslint/no-misused-promises": "off",
      // A keyboard-reachable scroll container needs `tabindex="0"` (WCAG 2.2 SC 2.1.1) and is
      // named with `role="region"`; the rule only allows `tabpanel` by default.
      "astro/jsx-a11y/no-noninteractive-tabindex": [
        "error",
        { roles: ["tabpanel", "region"], tags: [] },
      ],
    },
  },
);
