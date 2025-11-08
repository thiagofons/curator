variable "turbo_cache_bucket_name" {
  description = "The name for the Turborepo remote cache S3 bucket"
  type        = string
  default     = "curator-turbo-cache" 
}

# 1. S3 Bucket for cache
resource "aws_s3_bucket" "turbo_cache" {
  bucket = var.turbo_cache_bucket_name
}

# 2. SRE/DevSecOps: Private, Cryptographed, Versioned
resource "aws_s3_bucket_public_access_block" "turbo_cache" {
  bucket                  = aws_s3_bucket.turbo_cache.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "turbo_cache" {
  bucket = aws_s3_bucket.turbo_cache.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "turbo_cache" {
  bucket = aws_s3_bucket.turbo_cache.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# 3. SRE: Lifecycle
# Deleting any cache object with more than 7 days
resource "aws_s3_bucket_lifecycle_configuration" "turbo_cache" {
  bucket = aws_s3_bucket.turbo_cache.id

  rule {
    id     = "expire-old-cache"
    status = "Enabled"

    expiration {
      days = 7
    }
  }
}

# Output so we can know the bucket name
output "turbo_cache_bucket_name" {
  description = "The name of the S3 bucket for Turborepo cache"
  value       = aws_s3_bucket.turbo_cache.bucket
}