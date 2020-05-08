#!/bin/sh
echo "Stoping container"
docker container stop node-container
docker container stop nginx-container

echo "Removing container"
docker container rm node-container
docker container rm nginx-container

echo "Removing images"
docker image rm ezops-test-hery_node
docker image rm ezops-test-hery_nginx

echo "Check if mongo-container is started"
if [ ! "$(docker ps -q -f name=mongo-container)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=mongo-container)" ]; then
        # remove container if it's exited (stopped)
        docker rm mongo-container
    fi
    # run mongo container
    echo "Running mongo-contaier"
    #docker container run --name mongo-container --volume "$(pwd)/mongo/data/db:/data/db" --publish 27017:27017 --network=ezops-test-hery_backend --detach mongo
    docker-compose up -d mongo
fi

echo "Running node and nginx contaiers"
docker-compose up -d node
docker-compose up -d nginx
