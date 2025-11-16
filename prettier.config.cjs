/** Prettier config (CJS) shared across the monorepo */
module.exports = {
  // Keep it minimal; extend as needed
  // printWidth: 100,
  // singleQuote: true,
  // trailingComma: 'all',
  // semi: true,
  // tabWidth: 2,
  trailingComma: "all",
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
