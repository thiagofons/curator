-- 1. Prepara o terreno como Superuser
CREATE EXTENSION IF NOT EXISTS "hstore";

-- 2. Criação dos Usuários (Sem aspas = case-insensitive)
CREATE ROLE api_user LOGIN PASSWORD 'api_password';
CREATE ROLE cms_user LOGIN PASSWORD 'cms_password';
CREATE ROLE flags_user LOGIN PASSWORD 'flags_password' SUPERUSER;

-- 3. Criação dos Schemas (Sem aspas = o Postgres salvará como api, cms, flags)
CREATE SCHEMA api;
CREATE SCHEMA cms;
CREATE SCHEMA flags;

-- 4. Atribuição de Donos (Crucial para automação de migrations)
ALTER SCHEMA api OWNER TO api_user;
ALTER SCHEMA cms OWNER TO cms_user;
ALTER SCHEMA flags OWNER TO flags_user;

-- 5. Configuração de Busca Automática (Search Path)
ALTER ROLE api_user SET search_path TO api, public;
ALTER ROLE cms_user SET search_path TO cms, public;
ALTER ROLE flags_user SET search_path TO flags, public;

-- 6. Permissões de Banco e Schema
GRANT ALL PRIVILEGES ON DATABASE curator TO flags_user;
GRANT ALL ON SCHEMA flags TO flags_user;
GRANT ALL ON SCHEMA api TO api_user;
GRANT ALL ON SCHEMA cms TO cms_user;
GRANT ALL ON SCHEMA public TO cms_user;
