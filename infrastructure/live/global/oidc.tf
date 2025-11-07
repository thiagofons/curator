# 1. Search root certificate in GitHub
data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com"
}

# 2. Create OIDC Provider in AWS
# Tells AWS: "Trust these tokens"
resource "aws_iam_openid_connect_provider" "github_actions" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [data.tls_certificate.github.certificates[0].sha1_fingerprint]
}

output "github_oidc_provider_arn" {
  description = "ARN from GitHub OIDC Provider"
  value       = aws_iam_openid_connect_provider.github_actions.arn
}