#!/bin/bash
echo "[ApplicationStart] Iniciando frontend..."
sudo systemctl reload apache
sudo systemctl enable apache
