# infrastructure/live/global/providers.tf

terraform {
  # 1. TRAVANDO A VERSÃO (ESTE É O CONSERTO)
  # Estamos dizendo que queremos a versão mais recente 5.x do provedor AWS.
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

  # 2. CONFIGURAÇÃO DO BACKEND
  # (Vamos mover isso do main.tf para cá para centralizar)
  backend "s3" {
    bucket         = "curator-terraform-state-global"
    key            = "global/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "curator-terraform-lock-global"
  }
}

# 3. DEFINIÇÃO DOS PROVIDERS
provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  alias  = "us-east-1" # O alias para o ACM
  region = "us-east-1"
}