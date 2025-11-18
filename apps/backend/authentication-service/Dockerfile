# >> STAGE 1: Base
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Adiciona openssl, necessário para o binário do Prisma no Alpine
RUN apk add --no-cache libc6-compat openssl && \
    corepack enable && \
    pnpm install turbo --global

# >> STAGE 2: Builder (Pruner)
FROM base AS builder
WORKDIR /usr/src/app
COPY . .
RUN turbo prune --scope=@backend/authentication-service --docker

# >> STAGE 3: Installer (Production Build)
FROM base AS installer
WORKDIR /usr/src/app

# Copy pruned package definitions
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies (cached layer)
RUN pnpm install --frozen-lockfile

# Copy pruned source code
COPY --from=builder /usr/src/app/out/full/ .

# ✅ AQUI ESTÁ A MUDANÇA
# Gera o Prisma Client ANTES do build.
# O typescript precisa dos tipos gerados em node_modules/.prisma para compilar.
RUN pnpm turbo run db:generate --filter=@backend/authentication-service

# Build the project
RUN turbo run build --filter=@backend/authentication-service...

# >> STAGE 4: Development (DX Optimized)
FROM base AS development
WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install

# Copy full source code
COPY . .

# ✅ AQUI ESTÁ A MUDANÇA PARA DEV
# Garante que o cliente prisma exista para o ambiente de desenvolvimento
RUN pnpm turbo run db:generate --filter=@backend/authentication-service

# Build internal libs
RUN turbo run build --filter=@backend/authentication-service^...

# Fix permissions
# Nota: Ajustei o caminho do chown para garantir que inclua a pasta gerada
RUN mkdir -p apps/backend/authentication-service/@generated && \
    chown -R nodejs:nodejs /usr/src/app/node_modules && \
    chown -R nodejs:nodejs /usr/src/app/apps/backend/authentication-service

ENV NODE_ENV=development
EXPOSE 3001

USER nodejs
WORKDIR /usr/src/app/apps/backend/authentication-service
CMD ["pnpm", "dev"]

# >> STAGE 5: Runner (Production Image)
FROM base AS runner
WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

USER nodejs

# ✅ CORREÇÃO IMPORTANTE NO RUNNER
# Você precisa copiar os artefatos do estágio 'installer' para cá.
# 1. Copia o node_modules (que contém o Prisma Client gerado e dependências de prod)
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/authentication-service/node_modules ./apps/backend/authentication-service/node_modules

# 2. Copia o código buildado (dist)
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/authentication-service/dist ./apps/backend/authentication-service/dist
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/authentication-service/package.json ./apps/backend/authentication-service/package.json

WORKDIR /usr/src/app/apps/backend/authentication-service

# Define NODE_ENV production para performance
ENV NODE_ENV=production

CMD ["node", "dist/main.js"]