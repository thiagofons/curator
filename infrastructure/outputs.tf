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
