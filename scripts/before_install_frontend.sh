#!/usr/bin/env bash
set -euo pipefail

echo "[BeforeInstall] Instalando Node 18 y PM2 (solo la primera vez)…"
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs build-essential
fi
command -v pm2 &>/dev/null || sudo npm i -g pm2
