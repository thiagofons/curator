# =============================================================================
# Firewall — permite apenas SSH (22), HTTP (80) e HTTPS (443)
# Tráfego de saída (outbound) é liberado completamente por padrão na Hetzner.
# =============================================================================

resource "hcloud_firewall" "this" {
  name   = "${var.server_name}-firewall"
  labels = var.labels

  # Regras inbound dinâmicas — criadas para cada porta em var.open_ports
  dynamic "rule" {
    for_each = var.open_ports
    content {
      direction  = "in"
      protocol   = "tcp"
      port       = tostring(rule.value)
      source_ips = ["0.0.0.0/0", "::/0"] # IPv4 + IPv6
    }
  }
}

# Aplica o firewall ao servidor
resource "hcloud_firewall_attachment" "this" {
  firewall_id = hcloud_firewall.this.id
  server_ids  = [hcloud_server.this.id]
}
