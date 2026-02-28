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

module "supabase" {
  source = "./modules/supabase"

  project_name    = var.supabase_project_name
  organization_id = var.supabase_organization_id
  db_password     = var.supabase_db_password
  region          = var.supabase_region
  instance_size   = var.supabase_instance_size
}
