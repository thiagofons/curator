output "registry_url" {
  value = module.registry.repo_url
}
output "db_connection_name" {
  value = module.db.instance_connection_name
}

output "payload_url" {
  value = module.payload.service_url
}
