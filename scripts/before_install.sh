#!/bin/bash
echo "[BeforeInstall] Deteniendo el servicio backend …"
sudo systemctl stop backend || true
