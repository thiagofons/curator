---
to: apps/backend/<%= name %>/eslint.config.js
---
import { baseConfig } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config[]} */
export default baseConfig;
