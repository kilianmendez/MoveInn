#!/bin/bash
echo "[ApplicationStart] Iniciando Frontend…"
sudo systemctl reload apache2

sudo systemctl enable frontend.service
sudo systemctl start frontend.service
