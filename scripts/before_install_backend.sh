#!/bin/bash
if ! dotnet --list-runtimes 2>/dev/null | grep -q '^Microsoft\.NETCore\.App 8'; then
  echo "[BeforeInstall] Instalando .NET 8 runtime…"
  wget -qO- https://dot.net/v1/dotnet-install.sh | \
       bash /dev/stdin --channel 8.0 --runtime dotnet --install-dir /usr/share/dotnet
  ln -sf /usr/share/dotnet/dotnet /usr/bin/dotnet
fi
sudo systemctl stop backend.service || true
