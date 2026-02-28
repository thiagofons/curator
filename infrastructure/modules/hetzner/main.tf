terraform {
  required_providers {
    hcloud = {
      source = "hetznercloud/hcloud"
    }
  }
}

# =============================================================================
# SSH Key — registra a chave pública fornecida via variável
# A chave privada correspondente fica FORA do Terraform (GitHub Secret: HETZNER_SSH_KEY)
# =============================================================================
resource "hcloud_ssh_key" "this" {
  name       = "${var.server_name}-key"
  public_key = var.ssh_public_key
  labels     = var.labels
}

# =============================================================================
# Floating IP — IP estático que persiste mesmo se o servidor for recriado
# Aponte os registros DNS A para este endereço (output: floating_ip)
# =============================================================================
resource "hcloud_floating_ip" "this" {
  name          = "${var.server_name}-floating-ip"
  type          = "ipv4"
  home_location = var.server_location
  description   = "Floating IP estático para ${var.server_name}"
  labels        = var.labels
}

# =============================================================================
# Servidor — cx32, Ubuntu 22.04, localização ash (Ashburn, EUA)
# O cloud-init (user-data.sh.tpl) recebe o floating_ip para configurar
# o endereço no netplan de forma persistente.
# =============================================================================
resource "hcloud_server" "this" {
  name        = var.server_name
  image       = "ubuntu-22.04"
  server_type = var.server_type
  location    = var.server_location
  ssh_keys    = [hcloud_ssh_key.this.id]
  labels      = var.labels

  # O floating IP precisa existir antes do servidor para ser passado ao cloud-init
  depends_on = [hcloud_floating_ip.this]

  # Passa o floating IP como variável de template para configurá-lo no netplan
  user_data = templatefile("${path.module}/../../scripts/user-data.sh.tpl", {
    floating_ip = hcloud_floating_ip.this.ip_address
  })
}

# =============================================================================
# Floating IP Assignment — associa o floating IP ao servidor
# =============================================================================
resource "hcloud_floating_ip_assignment" "this" {
  floating_ip_id = hcloud_floating_ip.this.id
  server_id      = hcloud_server.this.id
}
