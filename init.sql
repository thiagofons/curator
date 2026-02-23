-- 1. Prepara o terreno como Superuser
CREATE EXTENSION IF NOT EXISTS "hstore";

-- 2. Criação dos Usuários (Sem aspas = case-insensitive)
CREATE ROLE api_user LOGIN PASSWORD 'api_password';
CREATE ROLE cms_user LOGIN PASSWORD 'cms_password';

-- 3. Criação dos Schemas (Sem aspas = o Postgres salvará como api, cms, flags)
CREATE SCHEMA api;
CREATE SCHEMA cms;

-- 4. Atribuição de Donos (Crucial para automação de migrations)
ALTER SCHEMA api OWNER TO api_user;
ALTER SCHEMA cms OWNER TO cms_user;

-- 5. Configuração de Busca Automática (Search Path)
ALTER ROLE api_user SET search_path TO api, public;
ALTER ROLE cms_user SET search_path TO cms, public;

-- 6. Permissões de Banco e Schema
GRANT ALL ON SCHEMA api TO api_user;
GRANT ALL ON SCHEMA cms TO cms_user;
GRANT ALL ON SCHEMA public TO cms_user;
