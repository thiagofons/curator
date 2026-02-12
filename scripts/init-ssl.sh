#!/bin/bash
set -euo pipefail

# =============================================================================
# Curator — Initial SSL Certificate Bootstrap
# Run this ONCE on the Lightsail instance BEFORE starting the Docker stack.
# Port 80 must be free (no nginx running yet).
#
# Usage:
#   sudo ./scripts/init-ssl.sh your-email@example.com
# =============================================================================

EMAIL="${1:?Usage: $0 <email>}"

DOMAINS=(
  "api.curator.com.br"
  "cms.curator.com.br"
)

echo "=== Obtaining SSL certificates for: ${DOMAINS[*]} ==="

for DOMAIN in "${DOMAINS[@]}"; do
  echo "--- Requesting certificate for ${DOMAIN} ---"
  certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email "${EMAIL}" \
    -d "${DOMAIN}"
done

echo ""
echo "=== SSL certificates obtained successfully ==="
echo "Certificates are stored in /etc/letsencrypt/live/"
echo ""
echo "You can now start the Docker stack:"
echo "  docker stack deploy -c docker-compose.production.yaml curator --with-registry-auth"
echo ""
echo "The certbot container will handle automatic renewals every 12 hours."
