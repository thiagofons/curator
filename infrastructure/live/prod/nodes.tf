resource "google_container_node_pool" "spot_nodes" {
  name       = "pool-spot-nodes"
  location   = var.zone
  cluster    = google_container_cluster.primary.name
  node_count = 1

  autoscaling {
    min_node_count = 1
    max_node_count = 3
  }

  node_config {
    preemptible  = true
    machine_type = "e2-medium"

    oauth_scopes = ["https://www.googleapis.com/auth/cloud-platform"]
    tags         = ["gke-node", "curator-cms"]

    workload_metadata_config {
      mode = "GKE_METADATA"
    }
  }
}
