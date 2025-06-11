#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/Frontend

cd "$APP_DIR"

pm2 delete frontend || true

pm2 start npm --name frontend -- run start

pm2 save
