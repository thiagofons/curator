---
to: apps/backend/<%= name %>/tsconfig.build.json
---
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "tests", "dist", "**/*spec.ts"]
}
