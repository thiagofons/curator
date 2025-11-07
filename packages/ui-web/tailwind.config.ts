import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config = {
  presets: [sharedConfig],
  content: ["./src/**/*.{ts,tsx}"],
} satisfies Config;

export default config;
