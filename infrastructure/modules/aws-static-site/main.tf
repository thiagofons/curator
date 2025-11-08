# --- 1. S3 BUCKET (O ARMAZÉM) ---
# Main bucket for static files
resource "aws_s3_bucket" "main" {
  bucket = var.domain_name
}

# DevSecOps: Blocks all direct public access to S3
resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.main.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# --- 2. LOGGING (Pilar SRE/Observabilidade) ---
# Separate bucket for production logging
resource "aws_s3_bucket" "logs" {
  bucket = "${var.domain_name}-logs"
}

resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "logs" {
  bucket = aws_s3_bucket.logs.id

  block_public_acls       = false # Necessário para o CloudFront Logging
  block_public_policy     = true
  ignore_public_acls      = false # Necessário para o CloudFront Logging
  restrict_public_buckets = true
}

resource "aws_s3_bucket_acl" "logs" {
  depends_on = [
    aws_s3_bucket_ownership_controls.logs,
    aws_s3_bucket_public_access_block.logs,
  ]

  bucket = aws_s3_bucket.logs.id
  acl    = "log-delivery-write"
}

# --- 3. CLOUDFRONT (Facade / CDN) ---
# OAC => Connect CloudFront to S3
resource "aws_cloudfront_origin_access_control" "main" {
  name                              = "oac-${var.domain_name}"
  description                       = "Origin Access Control for ${var.domain_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  comment             = var.domain_name
  default_root_object = "index.html"
  aliases             = [var.domain_name]

  # Origin: Points to S3
  origin {
    domain_name              = aws_s3_bucket.main.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.main.id
    origin_access_control_id = aws_cloudfront_origin_access_control.main.id
  }

  # Standard behavior
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = aws_s3_bucket.main.id
    viewer_protocol_policy = "redirect-to-https" # Forces HTTPS

    # Defines cache politic
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6" # "CachingOptimized"
  }

  # Logs configuration
  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.logs.bucket_domain_name
    prefix          = "cloudfront/"
  }

  # SSL (HTTPS)
  viewer_certificate {
    acm_certificate_arn      = var.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

# --- 4. PERMISSIONS (DevSecOps) ---

# S3 Bucket:Allow only Cloudfront to read the files
resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.main.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.main.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    # Condition: Only our Cloudfront distribution can read
    condition {
      test     = "ArnLike"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.main.arn]
    }
  }
}

# --- 5. GITHUB AUTHORIZATION (IAM Role for CI/CD Pipeline) ---

# GitHub role
resource "aws_iam_role" "github_deploy" {
  name = "github-deploy-role-${var.domain_name}"
  assume_role_policy = data.aws_iam_policy_document.github_trust.json
}

# Trust Policy: What this role can ACCESS
data "aws_iam_policy_document" "github_trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [var.oidc_provider_arn]
    }
    # Must be from OUR branch in OUR repo
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_org_repo}:ref:refs/heads/${var.github_branch}"]
    }
  }
}

# Premission Policy: What this role can DO
resource "aws_iam_role_policy" "github_deploy" {
  role = aws_iam_role.github_deploy.id
  policy = data.aws_iam_policy_document.github_perms.json
}

data "aws_iam_policy_document" "github_perms" {
  # Sync permission
  statement {
    actions = [
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:ListBucket"
    ]
    resources = [
      aws_s3_bucket.main.arn,
      "${aws_s3_bucket.main.arn}/*"
    ]
  }
  # Invalidate cache permission (deploy-docs.yml)
  statement {
    actions   = ["cloudfront:CreateInvalidation"]
    resources = [aws_cloudfront_distribution.main.arn]
  }
  # Turbo cache
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:PutObject"
    ]
    resources = ["arn:aws:s3:::curator-turbo-cache/curator/*"]
  }
  statement {
    effect = "Allow"
    actions   = ["s3:ListBucket"]
    resources = ["arn:aws:s3:::curator-turbo-cache"]
    condition {
      test     = "StringLike"
      variable = "s3:prefix"
      values   = ["curator/*"]
    }
  }
}