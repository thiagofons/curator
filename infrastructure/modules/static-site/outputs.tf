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