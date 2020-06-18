#!/bin/bash

HOMEAPP_PORT=4001
HOMEAPP_NAME=homeapp

docker build -t $HOMEAPP_NAME .

if [ "$(docker ps -q -f name=$HOMEAPP_NAME)" ]; then
    docker stop $HOMEAPP_NAME
fi

if [ "$(docker ps -aq -f status=exited -f name=$HOMEAPP_NAME)" ]; then
    docker rm $HOMEAPP_NAME
fi

docker run -d -p "$HOMEAPP_PORT:8080" --name $HOMEAPP_NAME $HOMEAPP_NAME
