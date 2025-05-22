#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/Frontend
cd "$APP_DIR"

# Instalar Node 18 y PM2 si faltan
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs build-essential
fi
command -v pm2 &>/dev/null || sudo npm i -g pm2

# Instalar dependencias (ci si hay lock, install si no)
if [ -f package-lock.json ]; then
  echo "[INFO] Usando npm ci…"
  npm ci --omit=dev
else
  echo "[WARN] No hay package-lock.json → npm install"
  npm install --production
fi

# Compilar Next.js
npm run build

echo "[BeforeInstall] Build completado en $APP_DIR"
