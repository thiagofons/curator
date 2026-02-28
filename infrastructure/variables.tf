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
  description = "Plano do servidor Hetzner. cx32 = 4 vCPUs, 8GB RAM, 80GB SSD (~€18.49/mês)"
  type        = string
  default     = "cx32"
}

variable "server_location" {
  description = "Localização do datacenter Hetzner. ash = Ashburn, EUA (mais próximo do Brasil)"
  type        = string
  default     = "ash"
}

variable "open_ports" {
  description = "Portas TCP liberadas no firewall"
  type        = list(number)
  default     = [22, 80, 443]
}
