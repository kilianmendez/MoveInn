#!/usr/bin/env bash
set -e

if ! command -v node >/dev/null 2>&1 || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt 18 ]; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs build-essential
fi

# PM2 global
sudo npm i -g pm2

# Limpiar destino y preparar carpetas
sudo rm -rf /var/www/Frontend
mkdir -p /var/www/Frontend

# Mover código y compilar
mv /home/ubuntu/app/frontend_src /home/ubuntu/app/frontend_build
cd /home/ubuntu/app/frontend_build

npm ci --omit=dev
npm run build  

# Copiar artefactos y dependencias
cp -R .next public package.json node_modules ecosystem.config.js /var/www/frontend
