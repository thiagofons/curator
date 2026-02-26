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
#   DB_CRM_PASSWORD          — password for crm_user role
# =============================================================================

: "${DATABASE_HOST:?DATABASE_HOST is required}"
: "${DATABASE_DB:?DATABASE_DB is required}"
: "${DATABASE_USER:?DATABASE_USER is required}"
: "${DATABASE_MASTER_PASSWORD:?DATABASE_MASTER_PASSWORD is required}"
: "${DB_API_PASSWORD:?DB_API_PASSWORD is required}"
: "${DB_CMS_PASSWORD:?DB_CMS_PASSWORD is required}"
: "${DB_FLAGS_PASSWORD:?DB_FLAGS_PASSWORD is required}"
: "${DB_CRM_PASSWORD:?DB_CRM_PASSWORD is required}"

echo "Host is: $DATABASE_HOST"

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

-- =============================================================================
-- Roles
-- =============================================================================

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

DO \$\$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'crm_user') THEN
    CREATE ROLE crm_user LOGIN PASSWORD '${DB_CRM_PASSWORD}';
  ELSE
    ALTER ROLE crm_user WITH PASSWORD '${DB_CRM_PASSWORD}';
  END IF;
END \$\$;

-- Permite que curator_master faça SET ROLE para cada user,
-- necessário para ALTER DEFAULT PRIVILEGES funcionar corretamente
GRANT api_user   TO ${DATABASE_USER};
GRANT cms_user   TO ${DATABASE_USER};
GRANT flags_user TO ${DATABASE_USER};

-- =============================================================================
-- Schemas
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS api;
CREATE SCHEMA IF NOT EXISTS cms;
CREATE SCHEMA IF NOT EXISTS flags;
CREATE SCHEMA IF NOT EXISTS crm;

ALTER SCHEMA api   OWNER TO api_user;
ALTER SCHEMA cms   OWNER TO cms_user;
ALTER SCHEMA flags OWNER TO flags_user;
ALTER SCHEMA crm   OWNER TO crm_user;

-- =============================================================================
-- Search paths
-- =============================================================================

ALTER ROLE api_user   SET search_path TO api, public;
ALTER ROLE cms_user   SET search_path TO public;
ALTER ROLE flags_user SET search_path TO public;
ALTER ROLE crm_user   SET search_path TO crm, public;

-- =============================================================================
-- Schema permissions
-- =============================================================================

GRANT ALL ON SCHEMA api    TO api_user;
GRANT ALL ON SCHEMA cms    TO cms_user;
GRANT ALL ON SCHEMA public TO cms_user;
GRANT ALL ON SCHEMA flags  TO flags_user;
GRANT ALL ON SCHEMA public TO flags_user;
GRANT ALL ON SCHEMA crm    TO crm_user;

-- =============================================================================
-- Database connect
-- =============================================================================

GRANT CONNECT ON DATABASE ${DATABASE_DB} TO api_user;
GRANT CONNECT ON DATABASE ${DATABASE_DB} TO cms_user;
GRANT CONNECT ON DATABASE ${DATABASE_DB} TO flags_user;
GRANT CONNECT ON DATABASE ${DATABASE_DB} TO crm_user;

-- =============================================================================
-- CRM: read access to all schemas
-- =============================================================================

GRANT USAGE ON SCHEMA api    TO crm_user;
GRANT USAGE ON SCHEMA cms    TO crm_user;
GRANT USAGE ON SCHEMA flags  TO crm_user;
GRANT USAGE ON SCHEMA public TO crm_user;

-- Tabelas já existentes
GRANT SELECT ON ALL TABLES IN SCHEMA api    TO crm_user;
GRANT SELECT ON ALL TABLES IN SCHEMA cms    TO crm_user;
GRANT SELECT ON ALL TABLES IN SCHEMA flags  TO crm_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO crm_user;

-- Tabelas futuras — executado como o role dono de cada schema
SET ROLE api_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA api GRANT SELECT ON TABLES TO crm_user;
RESET ROLE;

SET ROLE cms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA cms    GRANT SELECT ON TABLES TO crm_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO crm_user;
RESET ROLE;

SET ROLE flags_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA flags GRANT SELECT ON TABLES TO crm_user;
RESET ROLE;

SQL

echo "=== DB init complete ==="
