import sharedConfig from "@repo/ui-web/tailwind.config"
import type { Config } from "tailwindcss"

const config = {
  presets: [
    sharedConfig,
  ],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
} satisfies Config

export default config
