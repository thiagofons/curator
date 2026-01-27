output "cluster_name" {
  description = "Cluster Name"
  value       = google_container_cluster.primary.name
}

output "cluster_endpoint" {
  description = "Cluster Endpoint"
  value       = google_container_cluster.primary.endpoint
}

output "get_credentials_command" {
  description = "Run this command to connect your kubectl to the cluster"
  value       = "gcloud container clusters get-credentials ${google_container_cluster.primary.name} --zone ${var.zone} --project ${var.project_id}"
}
