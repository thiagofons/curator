FROM node:22.17.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && \
    npm install -g pnpm@9.5.0 turbo

###################
# 1. PRUNE
###################
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=@backend/api --docker

###################
# 2. DEPS
###################
FROM base AS deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

###################
# 3. DEVELOPMENT
###################
FROM deps AS development
WORKDIR /app
COPY --from=pruner /app/out/full/ .
ENV NODE_ENV development
EXPOSE 3300
CMD ["pnpm", "dev", "--filter=@backend/api"]

###################
# 4. BUILD
###################
FROM deps AS builder
WORKDIR /app
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo run build --filter=@backend/api
RUN pnpm prune --prod

###################
# 5. PRODUCTION
###################
FROM node:22.17.0-alpine AS production
WORKDIR /app
RUN apk add --no-cache libc6-compat && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs
COPY --from=builder --chown=nestjs:nodejs /app .
USER nestjs
EXPOSE 3300
CMD ["node", "apps/backend/api/dist/src/main.js"]
