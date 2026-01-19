/** @type {import("prettier").Config} */
export default {
  // ...existing code...
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss", // DEVE ser o último
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  // ...existing code...
};
