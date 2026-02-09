data "google_project" "current" {}

# Permite que o Cloud Run (Compute SA) leia imagens do Artifact Registry
resource "google_project_iam_member" "artifact_reader" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${data.google_project.current.number}-compute@developer.gserviceaccount.com"
}

# Permite que o Cloud Run (Compute SA) conecte no Cloud SQL
resource "google_project_iam_member" "sql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${data.google_project.current.number}-compute@developer.gserviceaccount.com"
}

# 1. REDE
module "networking" {
  source     = "../../modules/networking"
  project_id = var.project_id
  region     = var.region
}

# 2. GKE
# module "gke" {
#   source              = "../../modules/gke-cluster"
#   project_id          = var.project_id
#   zone                = var.zone
#   cluster_name        = var.cluster_name
#   network_name        = module.networking.network_name
#   subnet_name         = module.networking.subnet_name
#   pods_range_name     = module.networking.pods_range_name
#   services_range_name = module.networking.services_range_name
# }

# 3. REGISTRY
module "registry" {
  source     = "../../modules/artifact-registry"
  project_id = var.project_id
  region     = var.region
}

# 4. DATABASE
module "db" {
  source      = "../../modules/database"
  project_id  = var.project_id
  region      = var.region
  db_user     = var.db_user
  db_password = var.db_password
}

# 5. PAYLOAD APP (K8S)
#
# module "payload" {
#   source                      = "../../modules/k8s-payload"
#   image_url                   = "${module.registry.repo_url}/payload:latest"
#   db_instance_connection_name = module.db.instance_connection_name
#   db_user                     = var.db_user
#   db_password                 = var.db_password
#   db_name                     = module.db.db_name
#   payload_secret              = var.payload_secret
# }

module "payload" {
  source = "../../modules/cloud-run"

  project_id   = var.project_id
  region       = var.region
  service_name = "payload-cms"

  # 1. Imagem: Tenta pegar dinamicamente, ou mantém hardcoded se preferir garantir a tag v1
  # Sugestão: image_url = "${module.registry.repo_url}/payload-cms:v1"
  image_url = "us-central1-docker.pkg.dev/curator-667ef/payload-cms-repo/payload-cms:v1"

  # 2. Instância SQL: Pega direto do módulo de banco (Mais seguro)
  # Certifique-se que o modules/database/outputs.tf tem o output "instance_connection_name"
  cloud_sql_instance = module.db.instance_connection_name

  env_vars = {
    # Usa a variável secreta definida no variables.tf
    PAYLOAD_SECRET = var.payload_secret

    # 3. Conexão do Banco: Constrói a string usando as variáveis reais
    DATABASE_URI = "postgres://${var.db_user}:${var.db_password}@127.0.0.1/${module.db.db_name}?host=/cloudsql/${module.db.instance_connection_name}"

    NODE_ENV = "production"

  }
}
