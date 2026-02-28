variable "project" {
  description = "Nome do projeto — usado em labels dos recursos"
  type        = string
  default     = "curator"
}

variable "environment" {
  description = "Ambiente de deploy (production, staging)"
  type        = string
  default     = "production"
}

# =============================================================================
# Hetzner Cloud — Autenticação
# =============================================================================

variable "hcloud_token" {
  description = "Token da API Hetzner Cloud (Read & Write). Passe via TF_VAR_hcloud_token — nunca commitar."
  type        = string
  sensitive   = true
}

variable "ssh_public_key" {
  description = "Chave pública SSH que será registrada no servidor. Passe via TF_VAR_ssh_public_key — nunca commitar."
  type        = string
  sensitive   = true
}

# =============================================================================
# Servidor
# =============================================================================

variable "server_name" {
  description = "Nome do servidor Hetzner Cloud"
  type        = string
  default     = "curator-prod"
}

variable "server_type" {
  description = "Plano do servidor Hetzner. cx23 ($4/mês), cx33 ($6.59/mês), cx43 ($10.59/mês)"
  type        = string
  default     = "cx33"
}

variable "server_location" {
  description = "Localização do datacenter Hetzner. nbg1 = Nuremberg, EU (cx33 disponível). ash = Ashburn, EUA (cpx series)"
  type        = string
  default     = "nbg1"
}

variable "open_ports" {
  description = "Portas TCP liberadas no firewall"
  type        = list(number)
  default     = [22, 80, 443]
}

# =============================================================================
# Supabase — Banco de Dados PostgreSQL gerenciado
# =============================================================================

variable "supabase_access_token" {
  description = "Personal Access Token da conta Supabase. Gere em: supabase.com/dashboard/account/tokens. Passe via TF_VAR_supabase_access_token — nunca commitar."
  type        = string
  sensitive   = true
}

variable "supabase_organization_id" {
  description = "ID da organização Supabase. Encontre em: Settings → General da sua organização."
  type        = string
}

variable "supabase_db_password" {
  description = "Senha master do banco PostgreSQL. Passe via TF_VAR_supabase_db_password — nunca commitar."
  type        = string
  sensitive   = true
}

variable "supabase_project_name" {
  description = "Nome do projeto Supabase"
  type        = string
  default     = "curator-production"
}

variable "supabase_region" {
  description = "Região AWS onde o Supabase cria o banco. us-east-1 = N. Virginia. Servidor em nbg1 (EU) — latência ~100ms para o banco é aceitável."
  type        = string
  default     = "us-east-1"
}

variable "supabase_instance_size" {
  description = "Plano do banco Supabase. null = free tier (padrão). Upgrade: small ($10/mês), medium ($25/mês)"
  type        = string
  default     = null
}
