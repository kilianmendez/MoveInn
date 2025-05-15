#!/bin/bash
echo "[ApplicationStart] Iniciando Backend…"
sudo systemctl daemon-reload
sudo systemctl enable backend.service
sudo systemctl start backend.service
