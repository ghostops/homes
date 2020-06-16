#!/bin/bash

HOMEAPP_PORT=4001
HOMEAPP_NAME=homeapp

docker build -t $HOMEAPP_NAME .
docker kill $HOMEAPP_NAME
docker run -d -p "$HOMEAPP_PORT:8080" --name $HOMEAPP_NAME $HOMEAPP_NAME
