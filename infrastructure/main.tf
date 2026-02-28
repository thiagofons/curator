module "hetzner" {
  source = "./modules/hetzner"

  server_name     = var.server_name
  server_type     = var.server_type
  server_location = var.server_location
  ssh_public_key  = var.ssh_public_key
  open_ports      = var.open_ports

  labels = {
    project     = var.project
    environment = var.environment
    managed_by  = "terraform"
  }
}
