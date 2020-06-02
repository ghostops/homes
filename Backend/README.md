# Homes Backend

### Setup

* Copy `.env.example` to `.env` and replace the values if needed
* Run `docker-compose up -d` to start the dev server

### Production build

* Copy `.env.example` to `.env.production` and replace the values with your live values
* Run `docker build -t homes .`
* To start it  run: `docker run -it homes:latest`
