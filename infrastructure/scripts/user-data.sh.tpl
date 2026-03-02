#!/bin/bash
set -euo pipefail

# =============================================================================
# Curator — Hetzner Cloud Instance Bootstrap (cloud-init)
# Instala K3s (Kubernetes leve), Git, psql e configura o Floating IP.
#
# K3s inclui Traefik como ingress controller e ServiceLB para expor as
# portas 80/443 diretamente na interface do host.
#
# Este arquivo é um template Terraform — ${floating_ip} é substituído pelo
# endereço real do Floating IP antes de ser enviado como user-data ao servidor.
# =============================================================================

export DEBIAN_FRONTEND=noninteractive

# --- System Update ---
apt-get update -y
apt-get upgrade -y

# --- Install dependencies ---
apt-get install -y curl git postgresql-client jq gettext-base

# --- Install kustomize ---
curl -sL "https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.4.3/kustomize_v5.4.3_linux_amd64.tar.gz" | tar xz -C /usr/local/bin

# --- Install K3s ---
# Inclui Traefik (ingress) + ServiceLB (expõe portas 80/443 no host)
curl -sfL https://get.k3s.io | sh -

# Aguarda K3s inicializar
sleep 10
until kubectl get nodes &>/dev/null; do
  echo "Aguardando K3s inicializar..."
  sleep 5
done

# Exporta kubeconfig para o usuário root
mkdir -p /root/.kube
cp /etc/rancher/k3s/k3s.yaml /root/.kube/config
chmod 600 /root/.kube/config

echo "export KUBECONFIG=/root/.kube/config" >> /root/.bashrc

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

echo "=== Curator Hetzner bootstrap completo — floating IP: ${floating_ip} ==="
echo "=== K3s versão: $(k3s --version | head -1) ==="
