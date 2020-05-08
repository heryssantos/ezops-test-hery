#!/bin/sh
echo "Stoping container"
docker container stop node-container
docker container stop nginx-container
echo "Removing container"
docker container rm node-container
docker container rm nginx-container
docker-compose up -d node
docker-compose up -d nginx