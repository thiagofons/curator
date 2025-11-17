---
to: apps/backend/<%=name%>-service/tsconfig.json
---
{
  "extends": "@repo/typescript-config/nestjs",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
