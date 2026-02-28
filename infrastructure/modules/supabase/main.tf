# =============================================================================
# Supabase Project — PostgreSQL gerenciado
#
# Cria um projeto Supabase com banco PostgreSQL na região configurada.
# O banco é acessado via connection pooler (PgBouncer) para melhor
# performance com aplicações que usam connection pools (NestJS/Prisma).
#
# Após criação, use os outputs para configurar as variáveis de ambiente
# da aplicação (DATABASE_URL, NEXT_PUBLIC_SUPABASE_URL, etc.).
# =============================================================================
resource "supabase_project" "this" {
  name              = var.project_name
  organization_id   = var.organization_id
  database_password = var.db_password
  region            = var.region
  instance_size     = var.instance_size
}
