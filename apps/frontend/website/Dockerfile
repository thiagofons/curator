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

# STAGE 4: Builder (for staging — uses @astrojs/node adapter)
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
ENV ASTRO_ADAPTER=node
ENV NEXT_TELEMETRY_DISABLED=1

ARG FLAGS_ENVIRONMENT_KEY
ARG FLAGS_API_URL
ARG DISCORD_WEBHOOK_URL
ARG FIREBASE_API_KEY
ARG FIREBASE_AUTH_DOMAIN
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_STORAGE_BUCKET
ARG FIREBASE_MESSAGING_SENDER_ID
ARG FIREBASE_APP_ID
ARG FIREBASE_MEASUREMENT_ID

ENV FLAGS_ENVIRONMENT_KEY=$FLAGS_ENVIRONMENT_KEY
ENV FLAGS_API_URL=$FLAGS_API_URL
ENV DISCORD_WEBHOOK_URL=$DISCORD_WEBHOOK_URL
ENV FIREBASE_API_KEY=$FIREBASE_API_KEY
ENV FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN
ENV FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID
ENV FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET
ENV FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID
ENV FIREBASE_APP_ID=$FIREBASE_APP_ID
ENV FIREBASE_MEASUREMENT_ID=$FIREBASE_MEASUREMENT_ID

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
