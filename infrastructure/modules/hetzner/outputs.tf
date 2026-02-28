output "server_name" {
  description = "Nome do servidor Hetzner Cloud"
  value       = hcloud_server.this.name
}

output "server_id" {
  description = "ID interno do servidor Hetzner Cloud"
  value       = hcloud_server.this.id
}

output "server_ipv4" {
  description = "IP primário do servidor (endereço público principal)"
  value       = hcloud_server.this.ipv4_address
}

output "floating_ip" {
  description = "Floating IP (IP estático) associado ao servidor — use este para DNS"
  value       = hcloud_floating_ip.this.ip_address
}
