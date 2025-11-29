import { sharedConfig } from "@repo/vitest-config";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      root: "./",
      environment: "node",
      reporters: ["default", "junit"],
      outputFile: {
        junit: "./test-report.xml",
      },
    },
  }),
);
