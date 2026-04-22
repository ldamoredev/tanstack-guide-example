# TanStack Learning Playground

A personal learning playground for the TanStack ecosystem. The app is built with TanStack Start, Router, Query, Form, Table, Virtual, DB, Pacer, and Devtools. Product data now runs through app-owned TanStack Start API routes, so the normal project flow is a single deployable web app.

## What Is In This Repo

- `src/routes` contains the TanStack Start/Router file-based routes and API routes.
- `src/modules/products` contains the data-backed product workspace and in-memory demo catalog.
- `src/features/cheat-sheet` renders the bilingual TanStack cheat-sheet page.
- `tanstack-cheat-sheet.md` is the English study guide.
- `tanstack-cheat-sheet.es.md` is the Spanish study guide.

## Requirements

- Node `^20.19.0 || >=22.12.0`
- pnpm through Corepack

The Netlify TanStack Start plugin requires Node `22.12.0` or newer on the deployment runtime. The repo includes an `.nvmrc`, so this is the usual local setup:

```bash
nvm use
corepack enable
```

## Install

Install dependencies from the repo root:

```bash
corepack pnpm install
```

## Run The App

Start the TanStack app:

```bash
corepack pnpm dev
```

The app listens on:

```txt
http://localhost:3000
```

No separate backend process is required. The product API lives in:

```txt
/api/products
/api/products/:productId
```

The demo catalog is in-memory. Mutations are useful for learning TanStack Query, Form, loaders, and optimistic flows, but they are not durable across server restarts, cold starts, or redeploys.

## Deploy To Netlify

This project is configured for Netlify with `@netlify/vite-plugin-tanstack-start` and `netlify.toml`.

1. Push the repository to GitHub.
2. Create a new Netlify site from that repository.
3. Use the default build command from `netlify.toml`: `corepack pnpm build`.
4. Keep Node set to `22.12.0` or newer. `netlify.toml` already pins `NODE_VERSION` to `22.12.0`.
5. Deploy.

The plugin prepares the TanStack Start server runtime during `vite build`, so the API routes and pages deploy together as one Netlify app.

## Useful Commands

Run tests:

```bash
corepack pnpm test
```

Build for production:

```bash
corepack pnpm build
```

Format and lint:

```bash
corepack pnpm check
```

Preview the production build locally:

```bash
corepack pnpm preview
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
- Netlify TanStack Start deployment: https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/
