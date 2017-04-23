#!/bin/bash
git pull
docker build -t url-shortener .
docker run -d -p 7070:7070 -e MONGO_USERNAME_URLSHORTENER -e MONGO_PASSWORD_URLSHORTENER -e MONGO_URI_URLSHORTENER --name url-shortener url-shortener
