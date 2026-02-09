import { sharedConfig } from "@repo/vitest-config";
import { mergeConfig } from "vitest/config";

export default mergeConfig(sharedConfig, {
  test: {
    environment: "jsdom",
  },
});
