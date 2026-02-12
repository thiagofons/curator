#!/bin/bash
set -euo pipefail

# =============================================================================
# Curator — Lightsail Instance Bootstrap (cloud-init)
# Installs Docker, Docker Compose, initializes Swarm, and installs Certbot.
# =============================================================================

export DEBIAN_FRONTEND=noninteractive

# --- System Update ---
apt-get update -y
apt-get upgrade -y

# --- Install Docker CE ---
apt-get install -y ca-certificates curl gnupg lsb-release

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# --- Add default user to docker group ---
usermod -aG docker ubuntu

# --- Initialize Docker Swarm ---
docker swarm init || true

# --- Install Certbot ---
apt-get install -y certbot

# --- Install Git ---
apt-get install -y git

echo "=== Curator instance bootstrap complete ==="
