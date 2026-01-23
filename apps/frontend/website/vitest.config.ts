import { sharedConfig } from "@repo/vitest-config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      coverage: {
        exclude: [
          // assets/config não-executáveis derrubam o threshold sem agregar valor
          "src/config/menu.json",
          "src/config/**",
        ],
      },
      alias: {
        "astro:env/server": new URL(
          "./src/lib/__mocks__/astro-env-server.ts",
          import.meta.url,
        ).pathname,
      },
    },
  }),
);
