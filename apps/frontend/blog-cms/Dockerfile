# STAGE 1: Base com PNPM e dependências de sistema
FROM node:22.17.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && \
    corepack enable && \
    pnpm install turbo --global

# STAGE 2: Pruner - Isola apenas o que o blog-cms precisa
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=@frontend/blog-cms --docker

# STAGE 3: Instalador de dependências (Full)
FROM base AS deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# --- TARGET 1: DESENVOLVIMENTO ---
# Usado no Docker Compose para hot-reload e db:push automático
FROM deps AS development
WORKDIR /app
COPY --from=pruner /app/out/full/ .
ENV NODE_ENV=development
# Script que roda migrações e sobe em modo dev
CMD ["pnpm", "--filter", "@frontend/blog-cms", "dev:migrate"]

# STAGE 4: Builder (Compila o Next.js em modo standalone)
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
ENV NEXT_TELEMETRY_DISABLED 1
RUN turbo run build --filter=@frontend/blog-cms...

# --- TARGET 2: PRODUÇÃO ---
# Usado no Kubernetes. Imagem leve, segura e rápida.
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia apenas o necessário do standalone build
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/blog-cms/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/blog-cms/.next/static ./apps/frontend/blog-cms/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/blog-cms/public ./apps/frontend/blog-cms/public

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Em produção, rodamos apenas o servidor otimizado
CMD ["node", "apps/frontend/blog-cms/server.js"]
