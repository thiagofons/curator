resource "aws_lightsail_instance_public_ports" "this" {
  instance_name = aws_lightsail_instance.this.name

  dynamic "port_info" {
    for_each = var.open_ports
    content {
      protocol  = "tcp"
      from_port = port_info.value
      to_port   = port_info.value
    }
  }
}
