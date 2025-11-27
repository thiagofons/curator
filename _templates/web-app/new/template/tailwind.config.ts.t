---
to: apps/frontend/<%=name%>/tailwind.config.ts
---
import sharedConfig from "@repo/ui-web/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [sharedConfig],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui-web/src/**/*.{ts,tsx}",
  ],
};

export default config;
