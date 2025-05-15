#!/usr/bin/env bash
set -e
# Asegura que Apache sirve del folder correcto
sudo a2ensite frontend.conf
sudo systemctl reload apache2
