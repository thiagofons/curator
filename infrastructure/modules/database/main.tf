# Habilita API se necessário
resource "google_project_service" "sqladmin" {
  service = "sqladmin.googleapis.com"
  project = var.project_id
  disable_on_destroy = false
}

# Conexão privada (Requer configuração de Private Service Access na VPC,
# se não tiver, o Terraform falhará aqui. Se falhar, avise que ajustamos para IP Publico + Proxy)
resource "google_sql_database_instance" "postgres" {
  name             = "payload-db-prod"
  database_version = "POSTGRES_15"
  region           = var.region
  project          = var.project_id

  settings {
    tier = "db-f1-micro"
    availability_type = "ZONAL"
  }
  deletion_protection = true
}

resource "google_sql_database" "default" {
  name     = "payload-cms"
  instance = google_sql_database_instance.postgres.name
  project  = var.project_id
}

resource "google_sql_user" "default" {
  name     = var.db_user
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
  project  = var.project_id
}
