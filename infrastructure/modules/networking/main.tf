resource "google_compute_network" "main_vpc" {
  name                    = var.vpc_name
  auto_create_subnetworks = false
  project                 = var.project_id
}

resource "google_compute_subnetwork" "gke_subnet" {
  name          = var.subnet_name
  ip_cidr_range = "10.10.0.0/20"
  region        = var.region
  network       = google_compute_network.main_vpc.id
  project       = var.project_id

  secondary_ip_range {
    range_name    = "gke-pods-range"
    ip_cidr_range = "10.40.0.0/14"
  }
  secondary_ip_range {
    range_name    = "gke-services-range"
    ip_cidr_range = "10.100.0.0/20"
  }
}
