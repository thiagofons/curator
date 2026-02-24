# =============================================================================
# SSH Key Pair — gerado automaticamente pelo Terraform
# A chave privada fica no state (backend S3 com encrypt=true).
# Nunca expor o output fora do pipeline.
# =============================================================================

resource "tls_private_key" "ssh" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_lightsail_key_pair" "this" {
  name       = "${var.instance_name}-key"
  public_key = tls_private_key.ssh.public_key_openssh
}
