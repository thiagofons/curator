#!/bin/bash

# Adiciona "private": true em todos os package.json do monorepo
# Rode na raiz do projeto: bash set-private.sh

PACKAGE_PATHS=(
  "apps/backend"
  "apps/e2e"
  "apps/frontend"
  "packages/eslint-config"
  "packages/lib"
  "packages/model"
  "packages/rabbitmq"
  "packages/theme"
  "packages/trpc"
  "packages/typescript-config"
  "packages/ui-mobile"
  "packages/ui-web"
  "packages/vitest-config"
)

echo "🔒 Marcando pacotes como private..."
echo ""

for path in "${PACKAGE_PATHS[@]}"; do
  PACKAGE_JSON="$path/package.json"

  if [ ! -f "$PACKAGE_JSON" ]; then
    echo "⚠️  Não encontrado: $PACKAGE_JSON — pulando"
    continue
  fi

  # Verifica se já é private
  IS_PRIVATE=$(node -p "require('./$PACKAGE_JSON').private || false")

  if [ "$IS_PRIVATE" = "true" ]; then
    echo "⏭️  $PACKAGE_JSON já é private — pulando"
    continue
  fi

  # Adiciona "private": true
  node -e "
    const fs = require('fs');
    const pkg = require('./$PACKAGE_JSON');
    pkg.private = true;
    fs.writeFileSync('./$PACKAGE_JSON', JSON.stringify(pkg, null, 2) + '\n');
  "
  echo "✅  $PACKAGE_JSON marcado como private"
done

echo ""
echo "✅ Pronto! Agora rode: pnpm changeset publish"
