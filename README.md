# Recipe Processor API

## Steps to run:
### Docker:
```bash
$ docker build . -f Dockerfile -t receipt-processor-challenge-api:latest
$ docker run -p 3000:3000 receipt-processor-challenge-api:latest
```

### Docker Compose:
Prod:
```bash
$ docker compose -f docker-compose.prod.yaml build
$ docker compose -f docker-compose.prod.yaml up
```

Dev:
```bash
$ docker compose -f docker-compose.dev.yaml build
$ docker compose -f docker-compose.dev.yaml up
```

### No Docker:
Dependencies:
* [node](https://nodejs.org/en/download)
* [pnpm](https://pnpm.io/installation)
	* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) can also be used.

Install:
```bash
$ git clone git@github.com:eristow/receipt-processor-challenge.git
$ pnpm install
```

Prod:
```bash
$ pnpm run build
$ pnpm start
```

Dev:
```bash
$ pnpm dev
```

## Discussion:
### Technologies used:
* TypeScript
* Express
* Docker
* Docker Compose

### Design Decisions:
TODO: add stuff here
* Why TypeScript and Express
* Why MVC
* In-memory DB vs actual DB
* In-memory DB singleton pattern
* Folder structure of routes, controllers, services, models
* Why Docker Compose
