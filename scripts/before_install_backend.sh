#!/bin/bash
echo "[BeforeInstall] Deteniendo servicios..."
sudo systemctl stop backend.service || true
