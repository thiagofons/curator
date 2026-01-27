variable "project_id" {
  description = "Google Cloud Project ID where resources will be created"
  type        = string
}

variable "region" {
  description = "Default region for resources (e.g., us-central1)"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "Specific zone for the Zonal Cluster (CRUCIAL to be free)"
  type        = string
  default     = "us-central1-a"
}

variable "cluster_name" {
  description = "Kubernetes cluster name"
  type        = string
  default     = "curator-platform-cluster"
}
