# Recipe Processor API

## Steps to run
### Docker
```bash
$ docker build . -f Dockerfile -t receipt-processor-challenge-api:latest
$ docker run -p 3000:3000 receipt-processor-challenge-api:latest
```

### Docker Compose
Prod
```bash
$ docker compose -f docker-compose.prod.yaml build
$ docker compose -f docker-compose.prod.yaml up
```

Dev
```bash
$ docker compose -f docker-compose.dev.yaml build
$ docker compose -f docker-compose.dev.yaml up
```

### No Docker
Dependencies
* [node](https://nodejs.org/en/download)
* [pnpm](https://pnpm.io/installation)
	* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) can also be used.

Install
```bash
$ git clone git@github.com:eristow/receipt-processor-challenge.git
$ pnpm install
```

Prod
```bash
$ pnpm run build
$ pnpm start
```

Dev
```bash
$ pnpm dev
```

## Discussion
### Technologies used
* TypeScript
* Express
* Docker
* Docker Compose

### Design Decisions
* Why TypeScript and Express
	* Although I have some experience in Go, I'm most comfortable quickly developing in TypeScript and picked it for that reason. I opted for TypeScript over JavaScript due to the type safety and OOP approach I wanted to take with MVC and the Receipt/Item types.
	* I chose Express because of its open-ended and flexible nature. I also have experience with NestJS in enterprise scenarios, and I find it best to use when paired with Angular due to the similar app structure. Since I'm unsure what front-end will be used, I picked Express.

* Why MVC
	* Because Express does not force a specific app/folder structure onto the developer, I picked MVC as the app structure. This is because its organized approach will allow the developer experience of the app to scale nicely compared to a less organized approach, which might require refactoring in the future as the complexity of the app increases.
	* I also added services in addition to the typical models and controllers. I opted for this because of the business logic involved with calculating the points for a receipt. I wanted that logic to be separate from the controller, as I thought the controller would become too bloated and no longer single responsibility if it were to include the points logic.

* In-memory DB vs actual DB
	* According to the specifications provided, an in-memory DB was sufficient for the scope of the challenge. However, I would opt to use an actual DB server if the scope of the challenge was increased or if I was to continue developing this app. My choice of DB would be PostgreSQL because of my experience with it, its ubiquity in cloud providers, and its flexibility through the use of extensions (I would need the uuid extension for this app).

* In-memory DB singleton pattern
	* In my `ReceiptDatabase` class, I used the singleton pattern to ensure that only one DB instance is ever available. This is to reduce the chance of multiple in-memory DBs, leading to duplicate or inconsistent data. This would be eliminated by using an external DB with a connection pool instead of the singleton pattern.

* Why Docker Compose
	* I am using Docker Compose to create separate dev and prod instances from a single multi-stage Dockerfile. It also makes building images and running containers simpler from the CLI. If the scale/complexity of the app is increased (e.g. adding external DB, microservices, messaging queues, ...), then Kubernetes or similar container orchestration tools could also be used instead of Docker Compose.
