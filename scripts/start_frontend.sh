#!/usr/bin/env bash
set -e

APP_DIR=/var/www/Frontend

# (re)iniciar con pm2
pm2 delete frontend || true                      # ignora si no existía
pm2 start npm --name frontend --prefix "$APP_DIR" -- start
pm2 save                                         # guarda la lista para reboot

echo "[ApplicationStart] Frontend en marcha bajo PM2"
