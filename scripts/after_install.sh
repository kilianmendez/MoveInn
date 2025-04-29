#!/bin/bash
echo "[AfterInstall] Ajustando permisos de /var/www/backend…"
sudo chown -R www-data:www-data /var/www/backend
