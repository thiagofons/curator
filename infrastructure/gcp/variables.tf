variable "project_id" {
  description = "O ID do seu projeto no Google Cloud (não é o nome, é o ID)"
  type        = string
}

variable "region" {
  description = "A região padrão para os recursos (ex: us-central1)"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "A zona específica para o Cluster Zonal (CRUCIAL para ser grátis)"
  type        = string
  default     = "us-central1-a"
}

variable "cluster_name" {
  description = "O nome do cluster Kubernetes"
  type        = string
  default     = "curator-platform-cluster"
}
