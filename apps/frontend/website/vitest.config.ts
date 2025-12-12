import { sharedConfig } from "@repo/vitest-config";
import { mergeConfig } from "vitest/config";

export default mergeConfig(sharedConfig, {
  test: {
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
