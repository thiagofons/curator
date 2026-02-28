output "project_ref" {
  description = "ID de referência do projeto Supabase (ex: abcdefghijklmnop) — usado na URL do connection pooler"
  value       = supabase_project.this.id
}

output "db_host" {
  description = "Hostname direto do banco PostgreSQL (sem pooler)"
  value       = "db.${supabase_project.this.id}.supabase.co"
}

output "db_port" {
  description = "Porta do banco PostgreSQL (conexão direta)"
  value       = 5432
}

output "api_url" {
  description = "URL da API REST do Supabase — use como NEXT_PUBLIC_SUPABASE_URL"
  value       = "https://${supabase_project.this.id}.supabase.co"
}

output "db_url" {
  description = <<-EOT
    Connection string PostgreSQL via PgBouncer (transaction mode, porta 6543).
    Recomendada para NestJS/Prisma em produção.
    Formato: postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres
  EOT
  value = "postgresql://postgres.${supabase_project.this.id}:${var.db_password}@aws-0-${var.region}.pooler.supabase.com:6543/postgres"
  sensitive = true
}
