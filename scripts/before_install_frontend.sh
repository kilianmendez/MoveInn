#!/usr/bin/env bash
set -euo pipefail                # corta si algo falla

APP_DIR=/var/www/Frontend        # tu destino definitivo

# 1- Asegúrate de tener Node (18+) y pm2; si ya están, estos pasos se saltan
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs build-essential
fi
command -v pm2 &>/dev/null || sudo npm i -g pm2

# 2- Construir Next.js
cd "$APP_DIR"
npm ci --omit=dev                # instala deps sin paquetes de dev
npm run build                    # genera .next/ y public/

echo "[BeforeInstall] Build completado en $APP_DIR"
