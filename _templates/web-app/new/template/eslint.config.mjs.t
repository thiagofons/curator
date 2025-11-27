---
to: apps/frontend/<%=name%>/eslint.config.mjs
---
import { defineConfig } from "eslint/config";
import config from "@repo/eslint-config"

const eslintConfig = defineConfig([
  ...config,
]);

export default eslintConfig;
