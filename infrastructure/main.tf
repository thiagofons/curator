module "lightsail" {
  source = "./modules/lightsail"

  instance_name     = var.instance_name
  availability_zone = "${var.aws_region}a"
  blueprint_id      = var.blueprint_id
  bundle_id         = var.bundle_id
  key_pair_name     = aws_lightsail_key_pair.this.name
  static_ip_name    = var.static_ip_name
  user_data         = file("${path.module}/scripts/user-data.sh")
  open_ports        = var.open_ports

  db_name            = var.db_name
  db_master_database = var.db_master_database
  db_master_username = var.db_master_username
  db_master_password = var.db_master_password
  db_bundle_id       = var.db_bundle_id
  db_blueprint_id    = var.db_blueprint_id

  tags = {
    Name = var.instance_name
  }
}
