#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Exit immediately if a command exits with a non-zero status
set -e

echo "Running pre-commit checks..."

# 1. Run Format Checker (from root package.json)
echo "Checking formatting..."
pnpm quality:format:check

# 2. Run Linter
echo "Running linter..."
pnpm quality:lint:check

# 3. Run Unit Tests (orchestrated by Turborepo)
echo "Running unit tests..."
pnpm test:unit

echo "All checks passed. Committing."