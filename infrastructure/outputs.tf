output "server_name" {
  description = "Nome do servidor Hetzner Cloud"
  value       = module.hetzner.server_name
}

output "floating_ip" {
  description = "IP estático (Floating IP) — aponte os registros DNS A para este endereço"
  value       = module.hetzner.floating_ip
}

output "server_ipv4" {
  description = "IP primário do servidor (pode mudar se o servidor for recriado — prefira o floating_ip para DNS)"
  value       = module.hetzner.server_ipv4
}

# =============================================================================
# Supabase — Database outputs
# =============================================================================

output "db_host" {
  description = "Hostname do banco de dados Supabase — use em DATABASE_HOST"
  value       = module.supabase.db_host
}

output "project_ref" {
  description = "ID de referência do projeto Supabase — usado para montar a URL do connection pooler"
  value       = module.supabase.project_ref
}

output "api_url" {
  description = "URL da API Supabase — use como NEXT_PUBLIC_SUPABASE_URL no frontend"
  value       = module.supabase.api_url
}

output "db_url" {
  description = "Connection string completa via pooler PgBouncer (transaction mode) — use como DATABASE_URL"
  value       = module.supabase.db_url
  sensitive   = true
}
