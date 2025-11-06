terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1" 
}

# 1. O Bucket S3 para o State (Global)
# SRE/DevSecOps: Privacy, Criptography, Versioned
resource "aws_s3_bucket" "state_global" {
  bucket = "curator-terraform-state-global"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "state_global" {
  bucket = aws_s3_bucket.state_global.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state_global" {
  bucket = aws_s3_bucket.state_global.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "state_global" {
  bucket = aws_s3_bucket.state_global.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# 2. DynamoDB for State Locking (Global)
# SRE: It prevents two developers from running "apply" at the same time.
resource "aws_dynamodb_table" "lock_global" {
  name           = "curator-terraform-lock-global"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}