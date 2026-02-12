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
