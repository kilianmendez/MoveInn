#!/usr/bin/env bash
set -euo pipefail
APP_DIR=/var/www/Frontend
cd "$APP_DIR"
npm ci                    
npm run build
