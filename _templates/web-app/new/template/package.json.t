---
to: apps/frontend/<%=name%>/package.json
---
{
  "name": "<%=name%>",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port=<%=port%>",
    "build": "next build",
    "start": "next start --port=<%=port%>",
    "lint": "eslint",
    "test:unit": "vitest run",
    "test:watch": "vitest --watch"
  },
  "dependencies": {
    "@repo/trpc": "workspace:*",
    "@repo/ui-web": "workspace:*",
    "@repo/vitest-config": "workspace:*",
    "next": "catalog:next16",
    "react": "catalog:react19",
    "react-dom": "catalog:react19",
    "vitest": "catalog:testing"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@tailwindcss/postcss": "catalog:ui-libs",
    "@types/node": "catalog:tooling",
    "@types/react": "catalog:react19",
    "@types/react-dom": "catalog:react19",
    "eslint": "catalog:code-quality",
    "eslint-config-next": "catalog:code-quality",
    "tailwindcss": "catalog:ui-libs",
    "typescript": "catalog:tooling"
  }
}
