terraform {
  required_version = ">= 1.6.0"

  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.0"
    }
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }

  # =============================================================================
  # Backend: Hetzner Object Storage (S3-compatible)
  # Valores estáticos ficam aqui. Valores dinâmicos (bucket, key, credenciais)
  # são passados via flags -backend-config no terraform init.
  #
  # Exemplo de init:
  #   terraform init \
  #     -backend-config="bucket=curator-terraform-state" \
  #     -backend-config="key=production/terraform.tfstate"
  #
  # Credenciais via variáveis de ambiente:
  #   export AWS_ACCESS_KEY_ID="seu_hos_access_key"
  #   export AWS_SECRET_ACCESS_KEY="seu_hos_secret_key"
  # =============================================================================
  backend "s3" {
    endpoints = {
      s3 = "https://nbg1.your-objectstorage.com"
    }

    region = "nbg1"

    # Flags obrigatórias para backends S3-compatible não-AWS
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    use_path_style              = true
  }
}

provider "hcloud" {
  # Token da API Hetzner Cloud.
  # Passe via TF_VAR_hcloud_token (env var) ou arquivo .tfvars (gitignored).
  token = var.hcloud_token
}

provider "supabase" {
  # Personal Access Token da conta Supabase.
  # Gere em: https://supabase.com/dashboard/account/tokens
  # Passe via TF_VAR_supabase_access_token — nunca commitar.
  access_token = var.supabase_access_token
}
