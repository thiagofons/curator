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

output "db_endpoint" {
  description = "Private endpoint hostname of the managed database"
  value       = aws_lightsail_database.this.master_endpoint_address
}

output "db_port" {
  description = "Port of the managed database"
  value       = aws_lightsail_database.this.master_endpoint_port
}
