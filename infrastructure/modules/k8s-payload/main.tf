resource "kubernetes_deployment" "payload" {
  metadata {
    name = "payload-cms"
    labels = { app = "payload" }
  }

  spec {
    replicas = 1
    selector {
      match_labels = { app = "payload" }
    }
    template {
      metadata {
        labels = { app = "payload" }
      }
      spec {
        # Container 1: Aplicação Payload
        container {
          image = var.image_url
          name  = "payload-cms"

          env {
            name  = "DATABASE_URI"
            # Conecta em localhost pois o Proxy (abaixo) abre a porta localmente
            value = "postgresql://${var.db_user}:${var.db_password}@127.0.0.1:5432/${var.db_name}"
          }
          env {
            name  = "PAYLOAD_SECRET"
            value = var.payload_secret
          }
          port {
            container_port = 3000
          }
        }

        # Container 2: Cloud SQL Auth Proxy (Sidecar)
        container {
          image = "gcr.io/cloud-sql-connectors/cloud-sql-proxy:2.1.0"
          name  = "cloud-sql-proxy"
          command = [
            "/cloud_sql_proxy",
            "--instances=${var.db_instance_connection_name}=tcp:5432"
          ]
          security_context {
            run_as_non_root = true
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "payload" {
  metadata {
    name = "payload-service"
  }
  spec {
    selector = { app = "payload" }
    port {
      port        = 80
      target_port = 3000
    }
    type = "LoadBalancer"
  }
}
