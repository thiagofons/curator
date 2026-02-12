output "instance_name" {
  description = "Name of the Lightsail instance"
  value       = aws_lightsail_instance.this.name
}

output "instance_username" {
  description = "Default SSH username for the instance"
  value       = aws_lightsail_instance.this.username
}

output "static_ip" {
  description = "Static IP address"
  value       = aws_lightsail_static_ip.this.ip_address
}
