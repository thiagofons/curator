# >> STAGE 1: Base
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat openssl && \
    corepack enable && \
    pnpm install turbo --global

# >> STAGE 2: Builder (Pruner)
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY . .
# Gera uma versão "fatiada" do monorepo apenas para este app
RUN turbo prune --scope=@backend/authentication-service --docker

# >> STAGE 3: Installer (Build & Dev Deps)
FROM base AS installer
# Install curl and bash for node-prune optimization
RUN apk add --no-cache curl bash
WORKDIR /usr/src/app

# Copia apenas os package.json e lockfiles (camada leve)
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Instala TODAS as dependências (necessário para o Build)
RUN pnpm install --frozen-lockfile

# Copia o código fonte "prunado" (apenas o que importa para este app)
COPY --from=builder /usr/src/app/out/full/ .

# Builda o projeto
RUN turbo run build --filter=@backend/authentication-service...

# Remove dev dependencies and clean up node_modules
RUN pnpm prune --prod

# Use node-prune to remove unnecessary files from node_modules (tests, docs, etc.)
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin && \
    node-prune

# >> STAGE 4: Development (DX Optimized)
FROM base AS development
WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# 🔥 FIX 1: Não use COPY . . aqui!
# Usamos o output do 'prune' para pegar apenas o código deste serviço e suas libs internas.
COPY --from=builder /usr/src/app/out/full/ .

# Instala dependências (incluindo devDeps para rodar nest start:debug)
RUN pnpm install

# Build internal libs only (skip gateway build to allow watch mode)
RUN turbo run build --filter=@backend/authentication-service^...

RUN mkdir -p apps/backend/authentication-service/@generated && \
    chown -R nodejs:nodejs /usr/src/app

ENV NODE_ENV=development
EXPOSE 3000
USER nodejs
WORKDIR /usr/src/app/apps/backend/authentication-service
CMD ["pnpm", "dev"]

# >> STAGE 5: Runner (Production Image - Optimized)
FROM node:22-alpine AS runner
WORKDIR /usr/src/app

# Only install runtime dependencies (no build tools)
RUN apk add --no-cache openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy only the pruned node_modules (already cleaned with node-prune)
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules

# Copy only the built application
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/authentication-service/dist ./dist

# Copy package.json for runtime metadata
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/authentication-service/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3301

USER nodejs
# O NestJS compilado geralmente roda direto do main.js na raiz ou dist
CMD ["node", "dist/main.js"]