# --- Estágio 1: 'base' ---
# Uma base comum para evitar repetição. Usa a imagem slim oficial do Bun.
FROM oven/bun:1-slim AS base
SHELL ["/bin/bash", "-c"]
WORKDIR /usr/src/app


# --- Estágio 2: 'deps' ---
# Este estágio foca em instalar TODAS as dependências. Ele só será re-executado
# se os arquivos de manifesto (package.json, bun.lock) mudarem, otimizando o cache.
FROM base AS deps
COPY package.json bun.lock* ./
# O * em bun.lock* garante que funcione mesmo que o arquivo não exista na primeira vez.
# Instala todas as dependências (dev e prod) de forma otimizada a partir do lockfile.
RUN bun install --frozen-lockfile


# --- Estágio 3: 'development' ---
# O alvo para o ambiente de desenvolvimento local (usado pelo Docker Compose).
# Ele contém o código-fonte e todas as dependências para permitir hot-reloading.
FROM deps AS development
# Copia o código-fonte por cima da instalação das dependências.
COPY . .
# O comando de início virá do seu docker-compose.yml para permitir hot-reloading,
# mas podemos definir um padrão, como por exemplo:
# CMD ["bun", "run", "dev"]


# --- Estágio 4: 'builder' ---
# Este estágio é responsável por gerar os artefatos de produção.
# Ele inclui o código-fonte completo e as dependências de desenvolvimento.
FROM deps AS builder
COPY . .
# Gera o cliente Prisma. Este é um passo de build.
RUN bun run db:generate
# Executa o build da aplicação (ex: compilar TypeScript para JavaScript).
# Assumindo que você tem um script "build" no seu package.json.
RUN bun run build


# --- Estágio 5: 'production' ---
# Este é o estágio final e o alvo padrão. Gera a imagem mais enxuta possível.
FROM base AS production
ENV NODE_ENV=production
# Instala pacotes de sistema operacional essenciais para produção.
# 'procps' pode não ser necessário, avalie seu caso de uso. 'openssl' é geralmente seguro ter.
RUN apt-get update -y && apt-get install -y openssl --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Instala SOMENTE as dependências de produção.
COPY package.json bun.lock* ./
RUN bun install --production --frozen-lockfile

# Copia os artefatos de produção do estágio 'builder'.
# Isso garante que nenhum código-fonte ou dependência de dev seja incluída.
COPY --from=builder /usr/src/app/dist ./dist
# O Prisma Client gerado também é um artefato de build.
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Expõe a porta que sua aplicação usa em produção.
EXPOSE 3300

# O comando para iniciar a aplicação em produção.
# Assumindo que o ponto de entrada é 'dist/main.js'. Ajuste conforme necessário.
CMD ["bun", "dist/main.js"]