variable "project_name" {
  description = "Nome do projeto Supabase"
  type        = string
  default     = "curator-production"
}

variable "organization_id" {
  description = "ID da organização Supabase (Settings → General da organização)"
  type        = string
}

variable "db_password" {
  description = "Senha master do banco PostgreSQL"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "Região AWS onde o Supabase provisiona o banco. us-east-1 = N. Virginia (mais próximo do servidor Hetzner ash)"
  type        = string
  default     = "us-east-1"
}

variable "instance_size" {
  description = "Plano do banco Supabase. null = free tier (padrão). Upgrade: small ($10/mês), medium ($25/mês), large ($50/mês)"
  type        = string
  default     = null
}
