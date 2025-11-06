# infrastructure/modules/static-site/variables.tf

variable "domain_name" {
  description = "O nome de domínio completo (FQDN) do site. Ex: docs.curator.com.br"
  type        = string
}

variable "acm_certificate_arn" {
  description = "O ARN do certificado SSL/TLS no ACM (na região us-east-1)"
  type        = string
}

variable "oidc_provider_arn" {
  description = "O ARN do provedor OIDC do GitHub (criado na pasta /global)"
  type        = string
}

variable "github_org_repo" {
  description = "O caminho do repositório no GitHub. Ex: 'SeuTime/curator-monorepo'"
  type        = string
}

variable "github_branch" {
  description = "O nome da branch que tem permissão para deploy. Ex: 'main'"
  type        = string
}