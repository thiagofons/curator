"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_config_1 = require("@repo/vitest-config");
var config_1 = require("vitest/config");
exports.default = (0, config_1.mergeConfig)(
  vitest_config_1.sharedConfig,
  (0, config_1.defineConfig)({
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
