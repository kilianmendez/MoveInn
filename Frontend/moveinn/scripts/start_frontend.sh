#!/bin/bash
cd /home/ubuntu/frontend/moveinn
npm install -g serve
pkill serve || true
serve -s out -l 3000 &