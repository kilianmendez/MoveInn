#!/usr/bin/env bash
set -e

APP_DIR=/var/www/Frontend
pm2 delete frontend || true
pm2 start npm --name frontend --prefix "$APP_DIR" -- start
pm2 save
echo "[ApplicationStart] Frontend funcionando bajo PM2"
