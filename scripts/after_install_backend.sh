#!/usr/bin/env bash
set -euo pipefail

SRC_ROOT=/Backend/Backend
PUBLISH_DIR=$SRC_ROOT/publish     
DEST=/var/www/backend

echo "[AfterInstall] Sincronizando artefacto publicado…"
mkdir -p "$DEST"
rsync -a --delete "$PUBLISH_DIR/" "$DEST/"

chown -R www-data:www-data "$DEST"
