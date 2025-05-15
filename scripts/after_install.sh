#!/bin/bash
echo "[AfterInstall] Ajustando permisos y deps…"
sudo chown -R www-data:www-data /var/www/backend

sudo chown -R www-data:www-data /var/www/frontend

cd /var/www/frontend
npm ci --omit=dev

