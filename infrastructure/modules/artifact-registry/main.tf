resource "google_artifact_registry_repository" "payload_repo" {
  location      = var.region
  repository_id = "payload-cms-repo"
  description   = "Docker repository for Payload CMS"
  format        = "DOCKER"
  project       = var.project_id
}
