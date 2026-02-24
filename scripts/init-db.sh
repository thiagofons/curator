#!/bin/bash
set -euo pipefail

# =============================================================================
# Curator — Managed Database Initialization
# Connects via psql to the Lightsail Managed PostgreSQL instance and ensures
# all required roles, schemas, and permissions exist.
#
# Idempotent — safe to run on every deploy.
#
# Required env vars (forwarded via appleboy/ssh-action envs):
#   DATABASE_HOST            — managed DB private endpoint
#   DATABASE_DB              — master database name (e.g., "curator")
#   DATABASE_USER            — master username (e.g., "curator_master")
#   DATABASE_MASTER_PASSWORD — master user password
#   DB_API_PASSWORD          — password for api_user role
#   DB_CMS_PASSWORD          — password for cms_user role
#   DB_FLAGS_PASSWORD        — password for flags_user role
# =============================================================================

: "${DATABASE_HOST:?DATABASE_HOST is required}"
: "${DATABASE_DB:?DATABASE_DB is required}"
: "${DATABASE_USER:?DATABASE_USER is required}"
: "${DATABASE_MASTER_PASSWORD:?DATABASE_MASTER_PASSWORD is required}"
: "${DB_API_PASSWORD:?DB_API_PASSWORD is required}"
: "${DB_CMS_PASSWORD:?DB_CMS_PASSWORD is required}"
: "${DB_FLAGS_PASSWORD:?DB_FLAGS_PASSWORD is required}"

export PGPASSWORD="${DATABASE_MASTER_PASSWORD}"
export PGSSLMODE="require"

PSQL="psql \
  --host=${DATABASE_HOST} \
  --port=5432 \
  --username=${DATABASE_USER} \
  --dbname=${DATABASE_DB} \
  --no-password \
  --set=ON_ERROR_STOP=1"

echo "=== Curator DB Init: ${DATABASE_HOST}/${DATABASE_DB} ==="

$PSQL <<SQL
CREATE EXTENSION IF NOT EXISTS "hstore";

DO \$\$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_user') THEN
    CREATE ROLE api_user LOGIN PASSWORD '${DB_API_PASSWORD}';
  ELSE
    ALTER ROLE api_user WITH PASSWORD '${DB_API_PASSWORD}';
  END IF;
END \$\$;

DO \$\$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cms_user') THEN
    CREATE ROLE cms_user LOGIN PASSWORD '${DB_CMS_PASSWORD}';
  ELSE
    ALTER ROLE cms_user WITH PASSWORD '${DB_CMS_PASSWORD}';
  END IF;
END \$\$;

DO \$\$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'flags_user') THEN
    CREATE ROLE flags_user LOGIN PASSWORD '${DB_FLAGS_PASSWORD}';
  ELSE
    ALTER ROLE flags_user WITH PASSWORD '${DB_FLAGS_PASSWORD}';
  END IF;
END \$\$;

CREATE SCHEMA IF NOT EXISTS api;
CREATE SCHEMA IF NOT EXISTS cms;
CREATE SCHEMA IF NOT EXISTS flags;

ALTER SCHEMA api   OWNER TO api_user;
ALTER SCHEMA cms   OWNER TO cms_user;
ALTER SCHEMA flags OWNER TO flags_user;

ALTER ROLE api_user   SET search_path TO api, public;
ALTER ROLE cms_user   SET search_path TO cms, public;
ALTER ROLE flags_user SET search_path TO flags, public;

GRANT ALL ON SCHEMA api    TO api_user;
GRANT ALL ON SCHEMA cms    TO cms_user;
GRANT ALL ON SCHEMA public TO cms_user;
GRANT ALL ON SCHEMA flags  TO flags_user;

GRANT CONNECT ON DATABASE ${DATABASE_DB} TO api_user;
GRANT CONNECT ON DATABASE ${DATABASE_DB} TO cms_user;
GRANT CONNECT ON DATABASE ${DATABASE_DB} TO flags_user;
SQL

echo "=== DB init complete ==="
