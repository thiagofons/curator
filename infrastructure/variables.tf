variable "project" {
  description = "Project name used for resource tagging"
  type        = string
  default     = "curator"
}

variable "environment" {
  description = "Deployment environment (production, staging)"
  type        = string
  default     = "production"
}

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "sa-east-1"
}

variable "instance_name" {
  description = "Name of the Lightsail instance"
  type        = string
  default     = "curator-production"
}

variable "bundle_id" {
  description = "Lightsail bundle ID (instance size). small_3_0 = 2GB RAM, 1 vCPU, $5/mo"
  type        = string
  default     = "small_3_0"
}

variable "blueprint_id" {
  description = "Lightsail blueprint ID (OS image)"
  type        = string
  default     = "ubuntu_22_04"
}

variable "key_pair_name" {
  description = "Name of the Lightsail SSH key pair (must be created in the AWS console first)"
  type        = string
}

variable "static_ip_name" {
  description = "Name for the Lightsail static IP"
  type        = string
  default     = "curator-production-ip"
}

variable "open_ports" {
  description = "TCP ports to open in the Lightsail firewall"
  type        = list(number)
  default     = [22, 80, 443]
}

variable "db_name" {
  description = "Name of the Lightsail managed database instance"
  type        = string
  default     = "curator-production-db"
}

variable "db_master_database" {
  description = "Name of the initial database created in the instance"
  type        = string
  default     = "curator"
}

variable "db_master_username" {
  description = "Master username for the managed database"
  type        = string
  default     = "curator_master"
}

variable "db_master_password" {
  description = "Master password. Provide via TF_VAR_db_master_password env var — never commit."
  type        = string
  sensitive   = true
}

variable "db_bundle_id" {
  description = "Lightsail DB bundle ID. micro_2_0 ~$15/mo, small_2_0 ~$30/mo"
  type        = string
  default     = "micro_2_0"
}

variable "db_blueprint_id" {
  description = "Lightsail DB engine (blueprint)"
  type        = string
  default     = "postgres_15"
}
