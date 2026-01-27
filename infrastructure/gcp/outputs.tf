output "cluster_name" {
  description = "Nome do Cluster Criado"
  value       = google_container_cluster.primary.name
}

output "cluster_endpoint" {
  description = "Endpoint do Cluster"
  value       = google_container_cluster.primary.endpoint
}

output "get_credentials_command" {
  description = "Rode este comando para conectar seu kubectl ao cluster"
  value       = "gcloud container clusters get-credentials ${google_container_cluster.primary.name} --zone ${var.zone} --project ${var.project_id}"
}
