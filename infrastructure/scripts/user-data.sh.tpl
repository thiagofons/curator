#!/bin/bash
set -euo pipefail

# =============================================================================
# Curator — Hetzner Cloud Instance Bootstrap (cloud-init)
# Instala Docker, inicializa Swarm, cria volumes/rede, configura o Floating IP.
#
# Este arquivo é um template Terraform — ${floating_ip} é substituído pelo
# endereço real do Floating IP antes de ser enviado como user-data ao servidor.
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

# --- Initialize Docker Swarm ---
docker swarm init || true

# --- Create persistent Docker volumes ---
docker volume create redis_prod_data
docker volume create nginx_logs
docker volume create certbot_www

# --- Create Docker overlay network for the stack ---
docker network create --driver overlay --attachable curator-network || true

# --- Install Certbot ---
apt-get install -y certbot

# --- Install Git ---
apt-get install -y git

# --- Install PostgreSQL Client (útil para debug de conexão ao Supabase) ---
apt-get install -y postgresql-client

# =============================================================================
# Floating IP — configura o endereço estático no netplan de forma persistente.
# O Hetzner roteia o tráfego do Floating IP para este servidor, mas o kernel
# do Linux precisa ter o IP configurado na interface para aceitar os pacotes.
# =============================================================================
cat > /etc/netplan/60-floating-ip.yaml << 'EOF'
network:
  version: 2
  ethernets:
    eth0:
      addresses:
        - ${floating_ip}/32
EOF

netplan apply

echo "=== Curator Hetzner bootstrap complete — floating IP: ${floating_ip} ==="
