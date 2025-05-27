#!/usr/bin/env bash
set -euo pipefail

SRC_ROOT=/Backend/Backend
PUBLISH_DIR=$SRC_ROOT/Backend/publish     
DEST=/var/www/backend

echo "[AfterInstall] Sincronizando artefacto publicado…"
mkdir -p "$DEST"
rsync -a --delete "$PUBLISH_DIR/" "$DEST/"

echo "[AfterInstall] Aplicando migraciones EF Core…"
export ASPNETCORE_ENVIRONMENT=Production        
dotnet ef database update \
  -p "$SRC_ROOT/Backend/Backend.csproj" \
  -s "$SRC_ROOT/Backend/Backend.csproj" \
  --no-build

chown -R www-data:www-data "$DEST"
