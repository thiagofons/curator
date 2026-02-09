variable "project_id" {}
variable "region" { default = "us-central1" }
variable "zone" { default = "us-central1-a" }
variable "cluster_name" { default = "curator" }

# Segredos (Defina no terraform.tfvars ou via env vars TF_VAR_...)
variable "db_user" { default = "payload" }
variable "db_password" {}
variable "payload_secret" {}
