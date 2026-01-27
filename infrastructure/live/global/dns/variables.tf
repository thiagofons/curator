variable "project_id" {
  description = "Google Cloud Project ID where resources will be created"
  type        = string
}

variable "region" {
  description = "Default region for resources (if applicable)"
  type        = string
  default     = "us-central1"
}

variable "domain_name" {
  description = "Root domain name (e.g., curator.com.br.)"
  type        = string
}

variable "dns_zone_name" {
  description = "Name of the Managed Zone resource in Google Cloud"
  type        = string
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

