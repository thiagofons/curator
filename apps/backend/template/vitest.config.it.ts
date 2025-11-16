import { sharedConfig } from "@repo/vitest-config";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  ...sharedConfig,
  plugins: [tsconfigPaths()],
  esbuild: {},
  test: {
    globals: true,
    include: ["src/**/*.it.spec.ts"],
    testTimeout: 30000,
    globalSetup: ["./src/test/global-setup.ts"],
    setupFiles: ["./src/test/setup-integration.ts"],
  },
});
