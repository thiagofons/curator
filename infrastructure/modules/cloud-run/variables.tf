variable "project_id" {}
variable "region" { default = "us-central1" }
variable "service_name" {}
variable "image_url" {}
variable "container_port" { default = 3000 }
variable "invoker_members" {
  description = "Quem pode acessar o serviço (allUsers para público)"
  type        = list(string)
  default     = ["allUsers"]
}
variable "cloud_sql_instance" {
  description = "Connection name da instância Cloud SQL (ex: project:region:instance)"
  default     = null
}
variable "env_vars" {
  description = "Mapa de variáveis de ambiente (KEY = VALUE)"
  type        = map(string)
  default     = {}
}
