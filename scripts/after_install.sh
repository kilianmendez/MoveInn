#!/bin/bash
echo "[AfterInstall] Ajustando permisos..."
sudo chown -R www-data:www-data /var/www/backend
sudo chown -R www-data:www-data /var/www/frontend

echo "[AfterInstall] Instalando npm en Frontend (si lo necesitas)..."
cd /var/www/frontend
npm ci --omit=dev
echo