#!/bin/sh
echo "Testing ..."
bash test.sh
echo "Stoping container"
docker container stop node-container
echo "Removing container"
docker container rm node-container
docker-compose up -d node
