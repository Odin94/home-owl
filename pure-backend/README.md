
# Home Owl 🦉 - Backend
Fastify typescript backend for Home Owl. Connects to a SQL database configured in `.env` and exposes a CRUD API for the home owl frontend.

It uses [Clerk](https://clerk.com) for authentication and user management and [Upstash](https://upstash.com) for rate limiting.

## How to run

### Setup
* Install [Docker](https://www.docker.com)
* Create `.env` based on `.env.sample`, create accounts for [Clerk](https://clerk.com) and [Upstash](https://upstash.com) and fill their API keys
* `npm i --legacy-peer-deps` to install dependencies  (legacy peer deps required because of `zod-prisma`)

### Prisma
The backend uses Prisma to manage the database. The following commands let you generate code from `./prisma/schema.prisma` and sync the schema to the database. Make sure your database is available and the correct `DATABASE_URL` is configured in `.env` first.

* `npx prisma generate`
* `npx prisma db push` to sync database
* `npx prisma studio` to run prisma studio for exploring the database

### Running the backend service
* Run database in docker from Home Owl root with `docker compose up -d`
* `npm start` to run


## Debugging
* Make sure to add a cors-supported origin to your debugging requests, eg. `curl localhost:8080 -H "Origin: http://localhost"`
  

## Notes
* If you ever want to compile to js and run that, consider the following steps:
    * Add `"outDir": "dist",` to tsconfig.json
    * Add `"build": "tsc -noEmit false -p tsconfig.json --pretty",` to package.json scripts
    * Make sure all module imports in typescript use ".js" ending (node requires it for imports) - or hope that this mess is fixed at time of reading
