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
