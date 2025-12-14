export const sharedConfig = {
  test: {
    globals: true,
    reporters: ["default", "junit"],
    outputFile: {
      junit: "./test-report.xml",
    },
    passWithNoTests: true,
    decoratorMetadata: true,
    maxConcurrency: 0, // 0 = sem limite explícito (usa o padrão do sistema)
    poolOptions: {
      threads: {
        maxThreads: 0, // 0 = usa todos os núcleos disponíveis
        minThreads: 0,
      },
      forks: {
        maxForks: 0,
        minForks: 0,
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/*.module.ts",
        "**/*.dto.ts",
        "**/*.entity.ts",
        "**/main.ts",
        "**/*.config.ts",
        "**/index.ts",
        "**/*.spec.ts",
        "**/*.test.ts",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    all: true,
    include: [
      "**/*.spec.ts",
      "**/*.it.spec.ts",
      "**/*.spec.tsx",
      "**/*.it.spec.tsx",
    ],
    exclude: [
      "**/node_modules/**",
      "**/.git/**",
      "node_modules/",
      "dist/",
      "**/*.d.ts",
      "**/*.config.{ts,js}",
      "**/main.ts",
    ],
  },
};
