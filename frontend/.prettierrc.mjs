export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.{astro,md,mdx,svelte,js,ts,jsx,tsx}",
      options: {
        parser: "astro",
      },
    },
  ],
  semi: true,
  trailingComma: "es5",
  singleQuote: false,
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  quoteProps: "as-needed",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",
};
