# 1. DNS Zone (That we will import)
resource "google_dns_managed_zone" "default" {
  name        = var.dns_zone_name
  dns_name    = var.domain_name
  description = "DNS zone managed via Terraform"

  lifecycle {
    prevent_destroy = true
  }
}

# 2. MX Records (Titan Email)
resource "google_dns_record_set" "titan_mx" {
  name         = google_dns_managed_zone.default.dns_name
  managed_zone = google_dns_managed_zone.default.name
  type         = "MX"
  ttl          = 3600

  rrdatas = [
    "10 mx1.titan.email.",
    "20 mx2.titan.email."
  ]
}

# 3. TXT SPF Register
resource "google_dns_record_set" "titan_spf" {
  name         = google_dns_managed_zone.default.dns_name
  managed_zone = google_dns_managed_zone.default.name
  type         = "TXT"
  ttl          = 3600

  rrdatas = [
    "v=spf1 include:spf.titan.email ~all"
  ]
}

# 4. DMAR Register
resource "google_dns_record_set" "titan_dmarc" {
  name         = "_dmarc.${google_dns_managed_zone.default.dns_name}"
  managed_zone = google_dns_managed_zone.default.name
  type         = "TXT"
  ttl          = 3600

  rrdatas = [
    "v=DMARC1; p=none; adkim=s; aspf=s; pct=100"
  ]
}
