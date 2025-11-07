# 1. Find my domain in Route 53
data "aws_route53_zone" "primary" {
  name = "curator.com.br"
}

# 2. Creates Widcard
# DX: 1 Certificate for everyone
resource "aws_acm_certificate" "wildcard" {
  provider = aws.us-east-1 

  domain_name = "curator.com.br" 
  subject_alternative_names = [
    "*.curator.com.br" 
  ]
  
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "curator-wildcard-certificate"
  }
}

# 3. Create DNS records for validation
resource "aws_route53_record" "validation" {
  # Iterate over the validation records ordered by ACM
  for_each = {
    for dvo in aws_acm_certificate.wildcard.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = data.aws_route53_zone.primary.zone_id
    }
  }

  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type
  zone_id         = each.value.zone_id
  ttl             = 60
  allow_overwrite = true # Allows TF management
}

# 4. Await the verification to be concluded
resource "aws_acm_certificate_validation" "main" {
  provider = aws.us-east-1 

  certificate_arn         = aws_acm_certificate.wildcard.arn
  validation_record_fqdns = [for record in aws_route53_record.validation : record.fqdn]
}

# Output for production environment
output "wildcard_certificate_arn" {
  description = "Wildcard ARD emmited"
  value       = aws_acm_certificate.wildcard.arn
}