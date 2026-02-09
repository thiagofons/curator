resource "google_cloud_run_v2_service" "default" {
  name     = var.service_name
  location = var.region
  project  = var.project_id
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      max_instance_count = 2
      min_instance_count = 0 # Escala a zero para economizar
    }

    containers {
      image = var.image_url

      ports {
        container_port = var.container_port
      }

      # Loop para criar as variáveis de ambiente dinamicamente
      dynamic "env" {
        for_each = var.env_vars
        content {
          name  = env.key
          value = env.value
        }
      }

      # Se tiver Cloud SQL configurado, monta o volume
      dynamic "volume_mounts" {
        for_each = var.cloud_sql_instance != null ? [1] : []
        content {
          name       = "cloudsql"
          mount_path = "/cloudsql"
        }
      }
    }

    # Conexão com Cloud SQL
    dynamic "volumes" {
      for_each = var.cloud_sql_instance != null ? [1] : []
      content {
        name = "cloudsql"
        cloud_sql_instance {
          instances = [var.cloud_sql_instance]
        }
      }
    }
  }
}

# Configuração de acesso (Público ou Privado)
resource "google_cloud_run_service_iam_binding" "default" {
  location = google_cloud_run_v2_service.default.location
  service  = google_cloud_run_v2_service.default.name
  role     = "roles/run.invoker"
  members  = var.invoker_members
}
