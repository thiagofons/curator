variable "server_name" {
  description = "Nome do servidor (também usado como prefixo dos demais recursos)"
  type        = string
}

variable "server_type" {
  description = "Plano do servidor Hetzner. cx23 ($4/mês), cx33 ($6.59/mês), cx43 ($10.59/mês)"
  type        = string
  default     = "cx33"
}

variable "server_location" {
  description = "Localização do datacenter Hetzner (ex: ash, nbg1, fsn1)"
  type        = string
  default     = "ash"
}

variable "ssh_public_key" {
  description = "Chave pública SSH registrada no servidor para acesso root"
  type        = string
  sensitive   = true
}

variable "open_ports" {
  description = "Portas TCP a liberar no firewall"
  type        = list(number)
  default     = [22, 80, 443]
}

variable "labels" {
  description = "Labels Hetzner aplicadas em todos os recursos (project, environment, managed_by)"
  type        = map(string)
  default     = {}
}
