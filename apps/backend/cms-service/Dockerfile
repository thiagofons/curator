# STAGE 1: Base com PNPM
FROM node:22.17.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && \
    npm install -g pnpm@9.5.0 turbo

# STAGE 2: Pruner
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=@backend/cms-service --docker

# STAGE 3: Deps
FROM base AS deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# STAGE 4: Builder
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Copia os arquivos do turbo prune
COPY --from=pruner /app/out/full/ .

# --- ADICIONE ESTA LINHA AQUI ---
RUN mkdir -p apps/backend/cms-service/public
# -------------------------------

ENV NEXT_TELEMETRY_DISABLED 1
RUN turbo run build --filter=@backend/cms-service...

# --- TARGET: DEVELOPMENT ---
FROM deps AS development
WORKDIR /app
COPY --from=pruner /app/out/full/ .
RUN mkdir -p apps/backend/cms-service/public
ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["sh", "-c", "pnpm --filter=@backend/cms-service db:push && pnpm dev --filter=@backend/cms-service"]

# --- TARGET: RUNNER ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app ./

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "pnpm --filter=@backend/cms-service db:push && pnpm --filter=@backend/cms-service start"]
