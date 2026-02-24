resource "aws_lightsail_database" "this" {
  relational_database_name = var.db_name
  availability_zone        = var.availability_zone
  master_database_name     = var.db_master_database
  master_username          = var.db_master_username
  master_password          = var.db_master_password
  bundle_id                = var.db_bundle_id
  blueprint_id             = var.db_blueprint_id
  publicly_accessible      = false
  skip_final_snapshot      = false

  tags = var.tags
}
