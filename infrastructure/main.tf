module "lightsail" {
  source = "./modules/lightsail"

  instance_name     = var.instance_name
  availability_zone = "${var.aws_region}a"
  blueprint_id      = var.blueprint_id
  bundle_id         = var.bundle_id
  key_pair_name     = var.key_pair_name
  static_ip_name    = var.static_ip_name
  user_data         = file("${path.module}/scripts/user-data.sh")
  open_ports        = var.open_ports

  tags = {
    Name = var.instance_name
  }
}
