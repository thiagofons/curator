terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # State backend for production infra
  backend "s3" {
    bucket         = "curator-terraform-state-global" # Mesmo bucket
    key            = "production/terraform.tfstate"     # Caminho diferente
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "curator-terraform-lock-global"  # Mesma tabela de lock
  }
}

provider "aws" {
  region = "us-east-1" 
}