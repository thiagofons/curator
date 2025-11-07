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

# Finds the Hosted Zone (que já configuramos no /global)
data "aws_route53_zone" "primary" {
  name = "curator.com.br"
}

# Creates the "Address" 
resource "aws_route53_record" "docs_site_dns" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = module.docs_site.domain_name 
  type    = "A"

  alias {
    # Pois to our front door at Cloudfront
    name                   = module.docs_site.cloudfront_distribution_domain_name
    zone_id                = module.docs_site.cloudfront_distribution_hosted_zone_id
    evaluate_target_health = false
  }
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