output "cloudfront_distribution_id" {
  description = "Cloudfront Distribution ID for the pipeline"
  value       = aws_cloudfront_distribution.main.id
}

output "s3_bucket_name" {
  description = "S3 bucket name for the pipeline"
  value       = aws_s3_bucket.main.id
}

output "iam_role_arn" {
  description = "ARN from the Role which GitHub Actions must assume"
  value       = aws_iam_role.github_deploy.arn
}

output "cloudfront_distribution_domain_name" {
  description = "FQDN domain name from CloudFront distribution"
  value       = aws_cloudfront_distribution.main.domain_name
}

output "cloudfront_distribution_hosted_zone_id" {
  description = "CloudFront Hosted Zone ID (for Route 53 alias)"
  value       = aws_cloudfront_distribution.main.hosted_zone_id
}

output "domain_name" {
  description = "FQDN domain name of the site (passed as input)"
  value       = var.domain_name
}