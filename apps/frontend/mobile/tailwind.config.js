const { preset } = require("@repo/ui/preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}", // Scan UI package for classes
  ],
  presets: [preset],
  plugins: [],
};
