#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/Frontend
cd "$APP_DIR"

# Instalar dependencias
if [ -f package-lock.json ]; then
  echo "[AfterInstall] package-lock.json encontrado → npm ci"
  npm ci --omit=dev
else
  echo "[AfterInstall] No hay lock → npm install --production"
  npm install --production
fi

# Compilar Next.js
npm run build
echo "[AfterInstall] Build completado en $APP_DIR"
