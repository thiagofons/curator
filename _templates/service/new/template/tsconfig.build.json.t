---
to: apps/backend/<%=name%>-service/tsconfig.build.json
---
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}
