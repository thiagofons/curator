# >> STAGE 1: Base
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat openssl && \
    corepack enable && \
    pnpm install turbo --global

# >> STAGE 2: Builder (Pruner)
FROM base AS builder
WORKDIR /usr/src/app
COPY . .
# Prune monorepo to keep only api-gateway and its dependencies
RUN turbo prune --scope=@backend/api-gateway --docker

# >> STAGE 3: Installer (Production Build)
FROM base AS installer
WORKDIR /usr/src/app

# Copy pruned package definitions
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies (cached layer)
RUN pnpm install --frozen-lockfile

# Copy pruned source code and build
COPY --from=builder /usr/src/app/out/full/ .
RUN turbo run build --filter=@backend/api-gateway...

# >> STAGE 4: Development (DX Optimized)
FROM base AS development
WORKDIR /usr/src/app

# Setup non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Leverage builder cache for dependencies
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install all dependencies (including dev)
RUN pnpm install

# Copy full source code
COPY . .

# Build internal libs only (skip gateway build to allow watch mode)
RUN turbo run build --filter=@backend/api-gateway^...

# Fix permissions for runtime generation (tRPC/Prisma)
RUN mkdir -p apps/backend/api-gateway/@generated && \
    chown -R nodejs:nodejs /usr/src/app/node_modules && \
    chown -R nodejs:nodejs /usr/src/app/apps/backend/api-gateway

ENV NODE_ENV=development
EXPOSE 3000

USER nodejs
WORKDIR /usr/src/app/apps/backend/api-gateway
CMD ["pnpm", "dev"]

# >> STAGE 5: Runner (Production Image)
FROM base AS runner
WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy built artifacts from installer
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/ .

USER nodejs
WORKDIR /usr/src/app/apps/backend/api-gateway
CMD ["node", "dist/main.js"]