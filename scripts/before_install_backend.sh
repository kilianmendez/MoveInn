#!/bin/bash
set -euo pipefail

sudo systemctl stop backend.service || true
sudo rm -rf /var/www/backend/*

