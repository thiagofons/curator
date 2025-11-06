resource "aws_iam_oidc_provider" "github_actions" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [tfsig.actions-githubusercontent-com.thumbprint]
}

data "tls_certificate" "actions-githubusercontent-com" {
  url = "https://token.actions.githubusercontent.com"
}