variable "domain_name" {
  description = "The fully qualified domain name (FQDN) of the site. Ex: docs.curator.com.br"
  type        = string
}

variable "acm_certificate_arn" {
  description = "The ARN of the SSL/TLS certificate in ACM (in the us-east-1 region)"
  type        = string
}

variable "oidc_provider_arn" {
  description = "The ARN of the GitHub OIDC provider (created in the /global folder)"
  type        = string
}

variable "github_org_repo" {
  description = "The GitHub repository path. Ex: 'YourTeam/curator-monorepo'"
  type        = string
}

variable "github_branch" {
  description = "The name of the branch that is allowed to deploy. Ex: 'main'"
  type        = string
}