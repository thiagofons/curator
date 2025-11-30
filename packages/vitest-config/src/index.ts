export const sharedConfig = {
  test: {
    globals: true,
    reporters: ["default", "junit"],
    outputFile: {
      junit: "./test-report.xml",
    },
    passWithNoTests: true,
    decoratorMetadata: true,
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
    include: ["**/*.spec.ts", "**/*.it.spec.ts"],
    exclude: ["**/node_modules/**", "**/.git/**"],
  },
};
