#!/usr/bin/env bash
set -e

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential

rm -rf /var/www/frontend
mkdir -p /var/www/frontend

mv /home/ubuntu/app/frontend_src /home/ubuntu/app/frontend_build
cd /home/ubuntu/app/frontend_build

npm ci
npm run build

cp -R .next static server package.json /var/www/frontend
