# TanStack Learning Playground

A practical TanStack lab for evaluating how the ecosystem behaves in a real React application: routing, server state, forms, tables, virtualization, client collections, timing, API routes, tests, and deployment.

Live guide: https://tantastack-guide-ldamoredev.netlify.app/

Made by [Lautaro Damore](https://github.com/ldamoredev).

## TL;DR

This is not a docs clone. It is a small full-stack playground built to answer one question:

Can TanStack give a React app a cleaner architecture for URL state, server state, forms, data-heavy screens, and server boundaries without hiding too much behind framework magic?

My answer after building this repo: yes, when the app has enough state and data flow complexity to justify the extra concepts. No, if the product is mostly static pages or simple CRUD.

## What This Project Is

- A TanStack Start app with route-level loading and API routes.
- A product workspace used to exercise realistic app flows.
- A bilingual study guide in English and Spanish.
- A single deployable Netlify app, including the API routes.
- A learning artifact focused on tradeoffs, not hype.

The main libraries used here are TanStack Start, Router, Query, Form, Table, Virtual, DB, Pacer, and Devtools.

## What You Will Learn

- How TanStack Router treats URL state as typed application state.
- How TanStack Query separates server state from local UI state.
- How route loaders, query prefetching, and Suspense fit together.
- Where Form, Table, Virtual, DB, and Pacer belong in the architecture.
- When TanStack improves maintainability and when it adds unnecessary surface area.
- How to deploy a TanStack Start app with API routes to Netlify.

## Why It Matters

React apps usually become hard to maintain in the seams:

- filters duplicated between URL, local state, and API calls
- fetch logic mixed with rendering
- forms leaking validation rules into components
- tables growing from simple lists into state machines
- optimistic UI spread across unrelated components

TanStack does not remove those problems. It gives them names, boundaries, and dedicated primitives. That is the interesting part.

## Demo

- Live app: https://tantastack-guide-ldamoredev.netlify.app/
- Study guide: https://tantastack-guide-ldamoredev.netlify.app/cheat-sheet
- Repository: https://github.com/ldamoredev/tanstack-guide-example

Routes worth opening:

- `/` for the project overview
- `/products` for Router + Query + Form + Table flow
- `/products/virtual` for virtualized rendering
- `/products/db` for client-side collections
- `/cheat-sheet` for the bilingual guide
- `/tooling` for tooling and deployment notes

## Quick Start

Requirements:

- Node `^20.19.0 || >=22.12.0`
- pnpm through Corepack

This repo pins Node `22.14.0` because Netlify needs a modern Node/Corepack combo for pnpm installs.

```bash
git clone https://github.com/ldamoredev/tanstack-guide-example
cd tanstack-guide-example
nvm use
corepack enable
corepack pnpm install
corepack pnpm dev
```

The app runs at:

```txt
http://localhost:3000
```

No separate backend process is required. Product APIs live inside the TanStack Start app:

```txt
/api/products
/api/products/:productId
```

The catalog is in-memory. Mutations are useful for learning loaders, Query invalidation, forms, and optimistic flows, but they are not durable across restarts or redeploys.

## Useful Commands

```bash
corepack pnpm test
corepack pnpm build
corepack pnpm check
corepack pnpm preview
```

## Deploy To Netlify

The project is configured with `@netlify/vite-plugin-tanstack-start` and `netlify.toml`.

1. Push the repository to GitHub.
2. Create a Netlify site from the repository.
3. Keep the build command as `corepack pnpm build`.
4. Keep Node at `22.14.0` or newer.
5. Use `dist` as the publish directory.

The Netlify plugin prepares the TanStack Start server runtime during `vite build`, so pages and API routes deploy together.

## Project Map

- `src/routes` contains TanStack Start and Router file-based routes.
- `src/routes/api` contains app-owned API routes.
- `src/modules/products` contains the product learning domain.
- `src/features/cheat-sheet` renders the bilingual guide.
- `tanstack-cheat-sheet.md` is the English guide.
- `tanstack-cheat-sheet.es.md` is the Spanish guide.

## My Take

TanStack is most valuable when your React app needs explicit control: typed routes, URL-owned state, server-state caching, route-level loading, complex forms, tables, and data-heavy workflows.

It is less attractive when you mainly need a content site, a marketing page, or a simple CRUD app where framework conventions are enough.

The value is not that TanStack makes everything easy. The value is that it makes important boundaries visible.
