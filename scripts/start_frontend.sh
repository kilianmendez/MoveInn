#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/Frontend

if ! pm2 -v >/dev/null 2>&1; then
  npm i -g pm2@latest
fi

cd "$APP_DIR"
pm2 delete frontend || true               

pm2 start "npm run start" --name frontend

pm2 save
