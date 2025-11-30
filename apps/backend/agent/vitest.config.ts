import { sharedConfig } from "@repo/vitest-config";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      // Sobrescreva apenas o necessário, mas garanta que o outputFile esteja aqui
      environment: "node",
      reporters: ["default", "junit"],
      outputFile: {
        junit: "./test-report.xml",
      },
    },
  }),
);
