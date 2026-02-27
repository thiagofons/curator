# STAGE 1: Base with PNPM
FROM node:22.17.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && \
    npm install -g pnpm@9.5.0 turbo

# STAGE 2: Pruner
FROM base AS pruner
WORKDIR /app
COPY . .
# Removemos o "RUN cp" daqui, pois o turbo ignoraria o arquivo por causa do .gitignore
RUN turbo prune --scope=@frontend/website --docker

# STAGE 3: Deps
FROM base AS deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# --- TARGET: DEVELOPMENT ---
FROM deps AS development
WORKDIR /app
COPY --from=pruner /app/out/full/ .
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 4003
CMD ["pnpm", "--filter=@frontend/website", "dev:docker"]

# STAGE 4: Builder (for staging/production)
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .

# direto para dentro da pasta do website, contornando o turbo prune!
COPY .env.development ./apps/frontend/website/.env

ENV ASTRO_ADAPTER=node
ENV NEXT_TELEMETRY_DISABLED=1

RUN turbo run build --filter=@frontend/website...
RUN pnpm prune --prod

# --- TARGET: STAGING ---
FROM node:22.17.0-alpine AS staging
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=builder /app .
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4003
EXPOSE 4003
CMD ["node", "apps/frontend/website/dist/server/entry.mjs"]
