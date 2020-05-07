#!/bin/sh
echo "Pulling repository"
git pull
echo "Stoping container"
docker container stop node-container
echo "Removing container"
docker container rm node-container
docker-compose up -d node

