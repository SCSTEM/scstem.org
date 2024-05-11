/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@trivago/prettier-plugin-sort-imports"),
  ],
  importOrder: [
    "^@([^/]*)$",
    "^@/functions/(.*)$",
    "^@/[^image](.*)$",
    "^@/image(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
};
