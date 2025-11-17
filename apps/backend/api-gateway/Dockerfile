# >> STAGE 1: base <<
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat openssl && \
    corepack enable && \
    pnpm install turbo --global

# >> STAGE 2: builder (O "Cortador") <<
FROM base AS builder
WORKDIR /usr/src/app
COPY . .
# O prune cria uma versão "fatiada" do seu monorepo apenas com o necessário para o api-gateway
RUN turbo prune --scope=@backend/api-gateway --docker

# >> STAGE 3: installer (Compilação para Prod) <<
FROM base AS installer
WORKDIR /usr/src/app

# Copia apenas os arquivos de definição (package.json's) filtrados pelo prune
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Instala dependências (Isso cria uma camada grande, mas cacheada)
RUN pnpm install --frozen-lockfile

# Copia o código fonte filtrado pelo prune
COPY --from=builder /usr/src/app/out/full/ .

# Builda o projeto
RUN turbo run build --filter=@backend/api-gateway...

# >> STAGE 4: development (Otimizado para DX) <<
FROM base AS development
WORKDIR /usr/src/app

# Setup de permissões (Agrupado para criar menos camadas)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# [OTIMIZAÇÃO MÁXIMA]
# Em vez de copiar package.json um por um manualmente, usamos o output do builder.
# O turbo prune já selecionou APENAS os packages/libs que o gateway usa.
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Instala dependências
RUN pnpm install

# Copia o código fonte local
COPY . .

# Build das dependências internas (libs)
RUN turbo run build --filter=@backend/api-gateway^...

# 1. Cria a pasta onde o arquivo será gerado para garantir que ela exista
RUN mkdir -p apps/backend/api-gateway/@generated

# 2. Dá permissão para o usuário 'nodejs' escrever no node_modules e na pasta gerada
RUN chown -R nodejs:nodejs /usr/src/app/node_modules
RUN chown -R nodejs:nodejs /usr/src/app/apps/backend/api-gateway/@generated

# 3. Se o api-gateway precisar escrever em outras pastas (ex: dist, logs), garanta também:
RUN chown -R nodejs:nodejs /usr/src/app/apps/backend/api-gateway

ENV NODE_ENV=development
EXPOSE 3000

USER nodejs
WORKDIR /usr/src/app/apps/backend/api-gateway
CMD ["pnpm", "dev"]

# >> STAGE 5: runner (Produção Leve) <<
FROM base AS runner
WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copia apenas o necessário do estágio installer para rodar
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/ .

USER nodejs
WORKDIR /usr/src/app/apps/backend/api-gateway
CMD ["node", "dist/main.js"]