# infrastructure/live/production/main.tf

# 1. LÊ OS OUTPUTS DA PASTA "global" (O Pilar de IaC)
# É assim que pegamos o ARN do certificado
data "terraform_remote_state" "global" {
  backend = "s3"
  config = {
    bucket = "curator-terraform-state-global"
    key    = "global/terraform.tfstate"
    region = "us-east-1"
  }
}

# 2. CHAMA O NOSSO MÓDULO (O Pilar de Reusabilidade)
# Aqui é onde os valores que você definiu são usados
module "docs_site" {
  source = "../../modules/static-site" # Caminho para o módulo

  # --- Valores Específicos para este site ---
  domain_name           = "docs.curator.com.br"
  github_org_repo       = "thiagofons/curator" # (Confirme se está correto)
  github_branch         = "main"

  # --- Valores Lidos do estado "global" ---
  acm_certificate_arn   = data.terraform_remote_state.global.outputs.wildcard_certificate_arn
  oidc_provider_arn     = data.terraform_remote_state.global.outputs.github_oidc_provider_arn
}

# 3. OUTPUTS PARA O PIPELINE (O que precisamos para o GitHub)
output "docs_site_cloudfront_id" {
  description = "O ID da distribuição CloudFront para o pipeline"
  value       = module.docs_site.cloudfront_distribution_id
}
output "docs_site_bucket_name" {
  description = "O nome do bucket S3 para o pipeline"
  value       = module.docs_site.s3_bucket_name
}
output "docs_site_iam_role_arn" {
  description = "O ARN do Role que o GitHub Actions deve assumir"
  value       = module.docs_site.iam_role_arn
}