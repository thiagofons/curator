FROM node:22.17.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && \
    corepack enable && \
    pnpm install turbo --global

FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=@frontend/blog-cms --docker

FROM base AS builder
WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

# Build the project
ENV NEXT_TELEMETRY_DISABLED 1
RUN turbo run build --filter=@frontend/blog-cms...

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/blog-cms/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/blog-cms/.next/static ./apps/frontend/blog-cms/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/blog-cms/public ./apps/frontend/blog-cms/public

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/frontend/blog-cms/server.js"]
