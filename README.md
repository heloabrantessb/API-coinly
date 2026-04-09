# API Coinly

Backend API for a personal finance mobile app, built with NestJS, Prisma, and PostgreSQL.

## Stack

- NestJS
- Prisma ORM
- PostgreSQL
- Docker Compose
- TypeScript

## Current Scope

The project currently includes the base application structure and the first domain modules:

- `users`
- `transactions`

The data model in [`prisma/schema.prisma`](C:\Users\heloisa.batista\Documents\API-coinly\prisma\schema.prisma) currently defines:

- `User`
- `Transaction`
- `Type` enum with `income` and `expense`

## Project Structure

```txt
src/
  prisma/
  users/
  transactions/
  app.module.ts
  main.ts
prisma/
  schema.prisma
docker-compose.yml
prisma.config.ts
```

## Requirements

- Node.js 20+
- npm 10+
- Docker Desktop

## Environment

Create a `.env` file in the project root.

Recommended local database connection when Prisma runs on your machine and PostgreSQL runs in Docker:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/coinly?schema=public"
```

Important:

- `docker-compose.yml` uses `POSTGRES_USER=postgres`
- `docker-compose.yml` uses `POSTGRES_PASSWORD=postgres`
- if you run Prisma commands from the host machine, use `localhost`, not `db`
- `db` only works as hostname from another container in the same Docker network

## Running PostgreSQL with Docker

Start the database:

```bash
docker compose up -d
```

Stop the database:

```bash
docker compose down
```

Current Docker service:

- `db`: PostgreSQL 15 exposed on port `5432`

## Install Dependencies

```bash
npm install
```

## Prisma

Validate the schema:

```bash
npx prisma validate
```

Create and apply a migration:

```bash
npx prisma migrate dev --name init
```

Generate the Prisma client:

```bash
npx prisma generate
```

## Running the API

Development:

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm run start:prod
```

Default Nest development URL:

```txt
http://localhost:3000
```

## Available Scripts

```bash
npm run build
npm run start
npm run start:dev
npm run start:debug
npm run start:prod
npm run lint
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

## Data Model Overview

### User

- `id`
- `email`
- `password_hash`
- `created_at`
- `updated_at`

### Transaction

- `id`
- `user_id`
- `type`
- `value`
- `category`
- `date`
- `description`
- `created_at`
- `updated_at`

## API Direction

This project is being structured as a REST API for a mobile finance app. The expected MVP direction is:

- authentication
- user management
- transaction CRUD
- PostgreSQL persistence

Expected resource style:

- `POST /auth/register`
- `POST /auth/login`
- `GET /transactions`
- `POST /transactions`
- `PATCH /transactions/:id`
- `DELETE /transactions/:id`

## Known Setup Caveats

- Prisma migrations require a valid `DATABASE_URL`
- Prisma CLI may fail in restricted environments if it cannot download engine binaries
- if PostgreSQL is running in Docker and Prisma is running on the host, the connection string must point to `localhost`

## Next Steps

- implement authentication with JWT
- connect `users` and `transactions` modules to Prisma
- add request validation and error handling
