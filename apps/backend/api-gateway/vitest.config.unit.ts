import { sharedConfig } from "@repo/vitest-config";
import { defineConfig } from "vitest/config";

export default defineConfig({
  ...sharedConfig,
  test: {
    ...sharedConfig.test,
    include: ["src/**/*.spec.ts"],
    exclude: ["src/**/*.it.spec.ts"], // Exclui testes de integração

    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],

      include: ["src/**/*.ts"],

      // Exclui arquivos que não precisam de cobertura
      exclude: ["src/main.ts", "src/app.module.ts", "src/test/", "**/*.d.ts"],

      // Define o "mínimo aceitável" de cobertura (opcional, mas bom para CI)
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
