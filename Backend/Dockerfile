FROM golang:latest

WORKDIR /app

COPY ./ /app

RUN go mod download

RUN go get github.com/githubnemo/CompileDaemon

EXPOSE 8080

ENTRYPOINT CompileDaemon --build="go build src/main.go" --command=./main
