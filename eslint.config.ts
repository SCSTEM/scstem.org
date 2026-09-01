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
      // Restated from .oxlintrc.json, which ignores `**/*.astro`. ESLint is the only linter
      // that reads this extension, so without this the ban is off in the file type the site
      // is built from.
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

      /**
       * astro-eslint-parser does not type the JSX-like expressions in an Astro *template*, so
       * every `items.map(() => <El />)` resolves as `error` and trips this rule. It is a gap in
       * the parser, not unsafety in the code: frontmatter — the part that holds real logic — is
       * fully typed, and `astro check` type-checks templates properly.
       *
       * Sibling rules in this family (no-unsafe-assignment/-call/-member-access) may need the
       * same treatment as templates grow; add them here with the same reasoning, never blanket
       * off the whole family. See docs/adr/0001-toolchain-split.md.
       */
      "@typescript-eslint/no-unsafe-return": "off",
      /**
       * A `return` in Astro frontmatter — how a page short-circuits into a redirect or a 404 —
       * has no enclosing function node in the parser's AST, and this rule asserts one exists:
       * `Non-null Assertion Failed: Expected node to have a parent`, a crash rather than a
       * finding. It cannot inspect the construct it exists to check, so it is off for `.astro`.
       */
      "@typescript-eslint/no-misused-promises": "off",
      /**
       * A keyboard-reachable scroll container is a real pattern: an `overflow` region is not
       * focusable by default, so without `tabindex="0"` its content is unreachable by keyboard
       * (WCAG 2.2 SC 2.1.1). `role="region"` with an accessible name is how that container is
       * named; the rule only allows `tabpanel` out of the box. Scoped to that one role — every
       * other non-interactive element keeps the error.
       */
      "astro/jsx-a11y/no-noninteractive-tabindex": [
        "error",
        { roles: ["tabpanel", "region"], tags: [] },
      ],
    },
  },
);
