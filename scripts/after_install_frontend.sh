#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/Frontend
cd "$APP_DIR"

echo "[AfterInstall] Instalando TODAS las dependencias para el build…"
npm ci                     # ← sin --omit=dev

echo "[AfterInstall] Compilando Next.js…"
npm run build



echo "[AfterInstall] Build completado en $APP_DIR"
