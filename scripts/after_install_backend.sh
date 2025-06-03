#!/usr/bin/env bash
set -euo pipefail

chown -R www-data:www-data /var/www/backend
mkdir -p /var/www/backend/wwwroot
mkdir -p /var/www/backend/wwwroot/events
mkdir -p /var/www/backend/wwwroot/accommodations
mkdir -p /var/www/backend/wwwroot/images
mkdir -p /var/www/backend/wwwroot/recommendations
sudo chown -R www-data:www-data /var/www/backend/wwwroot
