#!/bin/bash
git stash
git pull

docker stop url-shortener
docker rm url-shortener
chmod +x ./bootstrap.sh
chmod +x ./ez-update.sh
./bootstrap.sh
