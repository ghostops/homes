#
# Builder stage
#
FROM golang:latest AS builder

WORKDIR /app

COPY ./ /app

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o main ./src

#
# Deployment stage
#

FROM alpine:latest AS deployment

WORKDIR /app

COPY --from=builder /app/.env.production ./.env
COPY --from=builder /app/main ./main

ENV GIN_MODE=release

CMD "./main"
