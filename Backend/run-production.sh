HOMEAPP_PORT=4001

docker build -t homeapp .
docker run -d -p "$HOMEAPP_PORT:8080" homeapp
