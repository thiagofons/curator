output "instance_name" {
  description = "Name of the Lightsail instance"
  value       = module.lightsail.instance_name
}

output "static_ip" {
  description = "Static IP address — point your DNS A records here"
  value       = module.lightsail.static_ip
}

output "instance_username" {
  description = "Default SSH username for the instance"
  value       = module.lightsail.instance_username
}

output "db_endpoint" {
  description = "Managed DB private endpoint — set as DATABASE_HOST in .env.production"
  value       = module.lightsail.db_endpoint
}

output "db_port" {
  description = "Managed DB port"
  value       = module.lightsail.db_port
}

output "private_key_pem" {
  description = "Private SSH key for the Lightsail instance — stored only in encrypted remote state"
  value       = tls_private_key.ssh.private_key_pem
  sensitive   = true
}
