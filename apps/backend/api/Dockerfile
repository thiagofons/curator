FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

###################
# 1. PRUNE
###################
FROM base AS pruner
WORKDIR /app
# We still need global turbo here to run the prune command itself
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@backend/api --docker

###################
# 2. BUILD
###################
FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Installs dependencies (including turbo) into node_modules
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

# FIX: Use 'pnpm turbo' instead of just 'turbo'
# This uses the local version installed in the previous step
RUN pnpm turbo run build --filter=@backend/api

RUN pnpm prune --prod

###################
# 3. PRODUCTION
###################
FROM base AS production
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app .

USER nestjs

EXPOSE 3300

# Ensure this path matches your actual output path.
# If using NestJS standard build, it is usually dist/main.js inside the app folder.
CMD [ "node", "apps/backend/api/dist/src/main.js" ]
