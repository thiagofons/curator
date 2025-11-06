terraform {
  # 1. Locking the version
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0" # Exige a versão 5.x ou superior
    }
    tls = {
      source  = "hashicorp/tls"
      version = ">= 4.0"
    }

  }

  # 2. Back-End configuration
  backend "s3" {
    bucket         = "curator-terraform-state-global"
    key            = "global/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "curator-terraform-lock-global"
  }
}

# 3. Providers definition
provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  alias  = "us-east-1" # O alias para o ACM
  region = "us-east-1"
}