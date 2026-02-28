# STAGE 1: Base with PNPM + Turbo
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && \
    npm install -g pnpm@9.5.0 turbo

# STAGE 2: Pruner — extract only what @backend/api needs
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=@backend/api --docker

# STAGE 3: Deps — install dependencies (reused by development target)
FROM base AS deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# STAGE 4: Builder — generate Prisma client + compile NestJS
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm --filter=@backend/api db:generate
RUN turbo run build --filter=@backend/api...

# --- TARGET: DEVELOPMENT ---
FROM deps AS development
WORKDIR /app
COPY --from=pruner /app/out/full/ .
RUN pnpm --filter=@backend/api db:generate && \
    chown -R node:node /home/node
ENV NODE_ENV=development
ENV HOME=/home/node
EXPOSE 3300

# --- TARGET: RUNNER (production) ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app ./

USER nestjs
EXPOSE 3300
CMD ["node", "apps/backend/api/dist/main.js"]
