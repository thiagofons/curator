variable "instance_name" {
  description = "Name of the Lightsail instance"
  type        = string
}

variable "availability_zone" {
  description = "Availability zone for the instance"
  type        = string
}

variable "blueprint_id" {
  description = "Lightsail blueprint ID (OS image)"
  type        = string
}

variable "bundle_id" {
  description = "Lightsail bundle ID (instance size)"
  type        = string
}

variable "key_pair_name" {
  description = "Name of the SSH key pair"
  type        = string
}

variable "static_ip_name" {
  description = "Name for the static IP resource"
  type        = string
}

variable "user_data" {
  description = "Cloud-init script content"
  type        = string
  default     = ""
}

variable "open_ports" {
  description = "List of TCP ports to open in the firewall"
  type        = list(number)
  default     = [22, 80, 443]
}

variable "tags" {
  description = "Additional tags for the instance"
  type        = map(string)
  default     = {}
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
  description = "Master password for the managed database (sensitive)"
  type        = string
  sensitive   = true
}

variable "db_bundle_id" {
  description = "Lightsail DB bundle. micro_2_0 = 1 vCPU, 1GB RAM, 40GB SSD, ~$15/mo"
  type        = string
  default     = "micro_2_0"
}

variable "db_blueprint_id" {
  description = "Lightsail DB blueprint (engine version)"
  type        = string
  default     = "postgres_15"
}
