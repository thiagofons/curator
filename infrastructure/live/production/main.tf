# 1. Read OUTPUTS from "global" 
# Getting the ARN from the certificate
data "terraform_remote_state" "global" {
  backend = "s3"
  config = {
    bucket = "curator-terraform-state-global"
    key    = "global/terraform.tfstate"
    region = "us-east-1"
  }
}

# 2. Call docs_site module
module "docs_site" {
  source = "../../modules/static-site"

  # --- Specific values for this site ---
  domain_name           = "docs.curator.com.br"
  github_org_repo       = "thiagofons/curator" # (Confirme se está correto)
  github_branch         = "main"

  # --- Values read from "global" ---
  acm_certificate_arn   = data.terraform_remote_state.global.outputs.wildcard_certificate_arn
  oidc_provider_arn     = data.terraform_remote_state.global.outputs.github_oidc_provider_arn
}

# 3. Outputs for the PIPELINE (What we need for GitHub)
output "docs_site_cloudfront_id" {
  description = "Cloudfront distribution ID for the pipeline"
  value       = module.docs_site.cloudfront_distribution_id
}
output "docs_site_bucket_name" {
  description = "S3 bucket name for the pipeline"
  value       = module.docs_site.s3_bucket_name
}
output "docs_site_iam_role_arn" {
  description = "The ARN from the Role that GitHub Actions must assume"
  value       = module.docs_site.iam_role_arn
}