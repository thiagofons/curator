export const sharedConfig = {
  test: {
    globals: true,
    environment: "jsdom",
    passWithNoTests: true,
    decoratorMetadata: true,
    include: ["**/*.spec.ts", "**/*.it.spec.ts"],
    exclude: ["**/node_modules/**", "**/.git/**"],
  },
};
