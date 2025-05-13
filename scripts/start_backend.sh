#!/bin/bash
echo "[ApplicationStart] Iniciando backend..."
sudo systemctl daemon-reload
sudo systemctl start backend.service
sudo systemctl enable backend.service
