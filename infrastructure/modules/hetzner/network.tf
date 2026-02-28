# =============================================================================
# Rede Privada — comunicação interna entre serviços (ex: servidor + Hetzner DBs futuros)
# CIDR: 10.0.0.0/16 | Subnet: 10.0.1.0/24
# =============================================================================

resource "hcloud_network" "this" {
  name     = "${var.server_name}-network"
  ip_range = "10.0.0.0/16"
  labels   = var.labels
}

resource "hcloud_network_subnet" "this" {
  network_id   = hcloud_network.this.id
  type         = "cloud"
  network_zone = "us-east" # Zona correspondente à localização ash (Ashburn, EUA)
  ip_range     = "10.0.1.0/24"
}

# Anexa o servidor à rede privada com IP fixo (facilita referências internas)
resource "hcloud_server_network" "this" {
  server_id  = hcloud_server.this.id
  network_id = hcloud_network.this.id
  ip         = "10.0.1.2"

  depends_on = [hcloud_network_subnet.this]
}
