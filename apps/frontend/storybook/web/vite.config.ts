import { sharedConfig } from "@repo/vitest-config";
import react from "@vitejs/plugin-react";
import { mergeConfig } from "vitest/config";

export default mergeConfig(sharedConfig, {
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
});
