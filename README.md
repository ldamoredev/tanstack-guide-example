# TanStack Learning Playground

A personal learning playground for the TanStack ecosystem. The app is built with TanStack Start, Router, Query, Form, Table, Virtual, DB, Pacer, and Devtools, with a small separate Express backend that serves the product data used by the learning flows.

## What Is In This Repo

- `src/routes` contains the TanStack Start/Router file-based routes.
- `src/modules/products` contains the data-backed product workspace.
- `src/features/cheat-sheet` renders the bilingual TanStack cheat-sheet page.
- `backend` contains the separate mock Node/Express API.
- `tanstack-cheat-sheet.md` is the English study guide.
- `tanstack-cheat-sheet.es.md` is the Spanish study guide.

## Requirements

- Node `^20.19.0 || >=22.12.0`
- pnpm through Corepack
- Docker only if you want to run an optional local Postgres container for future database experiments

The repo includes an `.nvmrc`, so this is the usual Node setup:

```bash
nvm use
corepack enable
```

## Install

Install frontend dependencies from the repo root:

```bash
corepack pnpm install
```

Install backend dependencies separately:

```bash
cd backend
corepack pnpm install
```

## Run The App

Start the mock backend in one terminal:

```bash
cd backend
corepack pnpm dev
```

The backend listens on:

```txt
http://127.0.0.1:4001
```

Start the TanStack app in another terminal:

```bash
corepack pnpm dev
```

The frontend listens on:

```txt
http://localhost:3000
```

The frontend BFF uses `BACKEND_URL` when provided and otherwise defaults to `http://127.0.0.1:4001`.

Example override:

```bash
BACKEND_URL=http://127.0.0.1:4001 corepack pnpm dev
```

## Database And Docker Notes

The current product flow does not require a database. It uses the separate Express backend with in-memory mock data so the repo can focus on TanStack learning concepts.

There is currently no committed `docker-compose.yml` or Prisma schema in this workspace. The existing `.env.local` has a `DATABASE_URL` placeholder for future database work, but the app can run without it.

If you want a local Postgres container ready for future experiments, you can run:

```bash
docker run --name tanstack-learning-postgres \
  -e POSTGRES_USER=tanstack \
  -e POSTGRES_PASSWORD=tanstack \
  -e POSTGRES_DB=tanstack_learning \
  -p 5432:5432 \
  -d postgres:16
```

Then set:

```bash
DATABASE_URL="postgresql://tanstack:tanstack@localhost:5432/tanstack_learning"
```

Only add Prisma/database commands once the repo has an actual schema and persistence flow.

## Useful Commands

Run frontend tests:

```bash
corepack pnpm test
```

Run backend tests:

```bash
cd backend
corepack pnpm test
```

Build the frontend:

```bash
corepack pnpm build
```

Build the backend:

```bash
cd backend
corepack pnpm build
```

Format and lint:

```bash
corepack pnpm check
```

## Routes To Explore

- `/` gives the learning overview.
- `/dashboard` maps the route relationships.
- `/products` is the main data-backed TanStack workspace.
- `/products/virtual` demonstrates TanStack Virtual.
- `/products/db` demonstrates TanStack DB-style client collections.
- `/cheat-sheet` renders the bilingual study guide.
- `/tooling` collects commands and inspection notes.

## Clone This Project

The app includes a visible repository action that points to:

```bash
git clone https://github.com/ldamoredev/tanstack-guide-example
```

If the repository URL changes, update `PROJECT_REPOSITORY_URL` in `src/features/cheat-sheet/content.ts`.

## Learn More

- TanStack Start: https://tanstack.com/start
- TanStack Router: https://tanstack.com/router
- TanStack Query: https://tanstack.com/query
- TanStack Form: https://tanstack.com/form
- TanStack Table: https://tanstack.com/table
- TanStack Virtual: https://tanstack.com/virtual
- TanStack DB: https://tanstack.com/db
- TanStack Pacer: https://tanstack.com/pacer
