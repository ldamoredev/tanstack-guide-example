# TanStack Learning Path Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Learn the TanStack ecosystem through one small inventory admin app built on TanStack Start, with Nitro as the server runtime/BFF layer and a separate Node.js TypeScript backend.

**Architecture:** The browser uses TanStack Router for app navigation and UI state in the URL. TanStack Start renders the app and provides the server-side web layer, while Nitro powers the server runtime and server-side request routing. A separate Node.js TypeScript API owns business logic and persistence so the frontend stack stays focused on TanStack concepts.

**Tech Stack:** TanStack Start, TanStack Router, TanStack Query, TanStack Form, TanStack Table, TanStack Virtual, TanStack DB, TanStack Pacer, TanStack Devtools, Nitro, Node.js, TypeScript, Express

---

## Current Repo Snapshot

**Existing files to understand first**
- `src/router.tsx`
- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/routes/about.tsx`
- `src/components/Header.tsx`
- `vite.config.ts`

**What these files already teach**
- `src/router.tsx` registers the TanStack Router and router defaults.
- `src/routes/__root.tsx` is the document/app shell and mounts TanStack Devtools.
- `vite.config.ts` enables `tanstackStart()` and `nitro()`, which means this repo is already using TanStack Start with Nitro on the server side.

## Theory Primer

### TanStack Start
- TanStack Start is the full-stack React framework layer in this repo.
- It combines routing, SSR, server functions, document rendering, and frontend/server boundaries.
- Think of it as the web framework you are building inside.

### TanStack Router
- TanStack Router handles application routing.
- It owns page URLs, route params, search params, nested layouts, links, error boundaries, and route-level data concepts.
- Think: "What page am I on, and what state should live in the URL?"

### Nitro
- Nitro is the server runtime used by this stack.
- It handles server-side request execution, API/server route handling, deployment targets, and the runtime side of the app.
- Think: "What should happen when the server receives an HTTP request?"

### The Boundary You Must Keep Clear
- `TanStack Router` routes the app in the browser and app shell.
- `Nitro` routes requests on the server/runtime side.
- `TanStack Start` is the framework that ties those concerns together.

## Target File Structure

This is the structure to grow toward over the next sessions.

```text
src/
  components/
  features/
    products/
    categories/
    suppliers/
  lib/
    query/
    forms/
    db/
    pacer/
  routes/
    __root.tsx
    dashboard.tsx
    products/
      index.tsx
      $productId.tsx
    categories.tsx
    suppliers.tsx
server/
  api/
backend/
  src/
    data/
    routes/
    types/
    server.ts
```

## Session 1: Understand Start, Router, And Nitro

**Session outcome**
- You can explain the role of Start, Router, and Nitro clearly.
- You replace the starter feel of the app with an admin-app skeleton.
- You add the first real routes for the learning project.

**Theory to learn in this session**
- What a full-stack React framework does
- Why Router state should often live in the URL
- Why server runtime routing is different from app/page routing
- Why a small vertical slice beats generic tutorials

**Files**
- Modify: `src/components/Header.tsx`
- Modify: `src/routes/index.tsx`
- Modify: `src/routes/about.tsx`
- Create: `src/routes/dashboard.tsx`
- Create: `src/routes/products/index.tsx`
- Create: `src/routes/products/$productId.tsx`
- Create: `src/routes/categories.tsx`
- Create: `src/routes/suppliers.tsx`

- [ ] **Step 1: Read the current TanStack Start entry points**

Read:
- `src/router.tsx`
- `src/routes/__root.tsx`
- `vite.config.ts`

Expected understanding:
- `src/router.tsx` configures Router behavior.
- `src/routes/__root.tsx` defines the app shell and document-level rendering.
- `vite.config.ts` shows that Start and Nitro are both enabled.

- [ ] **Step 2: Write down the architecture in plain English**

Write this summary in your notes:

```text
Browser navigation and page state are handled by TanStack Router.
TanStack Start renders the app and provides full-stack framework behavior.
Nitro powers the server/runtime side of the app.
The separate Node API will later own backend business logic.
```

Expected result:
- You can say this from memory before writing more code.

- [ ] **Step 3: Convert the home page into an inventory admin landing page**

Modify `src/routes/index.tsx` so it stops being a generic starter and becomes a project introduction page with links to:
- Dashboard
- Products
- Categories
- Suppliers

Concept focus:
- The home page should explain the app's purpose, not the framework's purpose.

- [ ] **Step 4: Replace the starter navigation with app navigation**

Modify `src/components/Header.tsx` to link to:
- `/`
- `/dashboard`
- `/products`
- `/categories`
- `/suppliers`

Remove or reduce:
- TanStack marketing-style links
- Demo-oriented menu items that distract from the learning project

Concept focus:
- Navigation is part of the information architecture.
- A good router learning project has obvious destinations.

- [ ] **Step 5: Add a dashboard route**

Create `src/routes/dashboard.tsx`.

This route should contain:
- A page title
- A short explanation of the admin app
- Four cards for Products, Categories, Suppliers, and Stock Movements

Concept focus:
- A route file is the unit of page ownership.
- Keep route components simple and focused.

- [ ] **Step 6: Add the products list route**

Create `src/routes/products/index.tsx`.

This page should initially contain:
- A heading
- Placeholder filter/search area
- A small hard-coded list of products
- A link pattern to product detail pages

Concept focus:
- Start with static UI before adding data tools.
- This page will later become your Query + Table page.

- [ ] **Step 7: Add the product detail route**

Create `src/routes/products/$productId.tsx`.

This page should initially:
- Read the route param
- Show the selected product id
- Render placeholder sections for summary, pricing, stock, and supplier

Concept focus:
- Route params are part of Router's core model.
- This is the first place where URL structure becomes domain structure.

- [ ] **Step 8: Add categories and suppliers routes**

Create:
- `src/routes/categories.tsx`
- `src/routes/suppliers.tsx`

Each page should have:
- A title
- A short explanation
- Small placeholder records

Concept focus:
- Build the route map early.
- You are creating the app surface area before data complexity.

- [ ] **Step 9: Rewrite the about page to teach the stack**

Modify `src/routes/about.tsx` so it explains:
- What TanStack Start does
- What TanStack Router does
- What Nitro does
- What the future Node API will do

Concept focus:
- Teaching the system back to yourself is part of learning.

- [ ] **Step 10: Add URL-based filter state to the products page**

Extend `src/routes/products/index.tsx` to include search params such as:
- `q`
- `category`
- `sort`
- `page`

Do not fetch real data yet. Use placeholder state reflected in the UI.

Concept focus:
- URL state beats hidden component state for list pages.
- This is one of the most important TanStack Router habits.

- [ ] **Step 11: Run the app and verify the route map**

Run:

```bash
pnpm run dev
```

Verify manually:
- Home page renders the inventory intro
- Header links work
- `/dashboard` renders
- `/products` renders
- `/products/sku-001` renders
- `/categories` renders
- `/suppliers` renders

Expected result:
- You now have a real route skeleton instead of a starter template.

- [ ] **Step 12: Write down the Session 1 theory checkpoint**

Answer these questions in your notes:
- What does TanStack Start add on top of Router?
- What kind of routing does Nitro own?
- Why should product list filters live in the URL?
- Why are we using placeholder data first?

Expected result:
- If you can answer these clearly, Session 1 worked.

## Session 2: Create The Real Node.js TypeScript Backend

**Session outcome**
- You create the separate backend service.
- You understand why the frontend stack should not also own all backend responsibilities.
- You establish a simple API that the TanStack app will consume later.

**Theory to learn in this session**
- Separation between web app concerns and backend concerns
- Resource-oriented API design
- DTOs and response shaping
- Why "boring backend" is a learning advantage here

**Files**
- Create: `backend/package.json`
- Create: `backend/tsconfig.json`
- Create: `backend/src/server.ts`
- Create: `backend/src/types/product.ts`
- Create: `backend/src/types/category.ts`
- Create: `backend/src/types/supplier.ts`
- Create: `backend/src/data/mockData.ts`
- Create: `backend/src/routes/products.ts`
- Create: `backend/src/routes/categories.ts`
- Create: `backend/src/routes/suppliers.ts`

- [ ] **Step 1: Create the backend workspace**

Create a new folder:

```text
backend/
```

Purpose:
- Keep the backend physically separate from the TanStack app.

Concept focus:
- Physical separation helps you learn architecture boundaries faster.

- [ ] **Step 2: Initialize the backend package**

Create `backend/package.json` with scripts such as:
- `dev`
- `build`
- `start`

Recommended packages:
- `express`
- `cors`
- `typescript`
- `tsx`
- `@types/express`
- `@types/node`

Concept focus:
- Choose the simplest backend stack possible.
- The backend is not the learning star of this project.

- [ ] **Step 3: Add a minimal TypeScript config**

Create `backend/tsconfig.json`.

Keep it simple:
- `target` modern Node
- `module` NodeNext or ESNext
- `strict` true
- `rootDir` `src`
- `outDir` `dist`

Concept focus:
- Good defaults reduce distraction.

- [ ] **Step 4: Define your domain types**

Create:
- `backend/src/types/product.ts`
- `backend/src/types/category.ts`
- `backend/src/types/supplier.ts`

Suggested fields:

`Product`
- `id`
- `name`
- `sku`
- `price`
- `stock`
- `categoryId`
- `supplierId`

`Category`
- `id`
- `name`

`Supplier`
- `id`
- `name`
- `email`

Concept focus:
- Define the domain first, then write the routes.

- [ ] **Step 5: Add mock data**

Create `backend/src/data/mockData.ts`.

Include:
- 8 to 12 products
- 3 or 4 categories
- 3 or 4 suppliers

Concept focus:
- In-memory data is enough for learning Query, Router, and Form.
- Avoid database complexity too early.

- [ ] **Step 6: Create the products API**

Create `backend/src/routes/products.ts`.

Initial endpoints:
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PATCH /products/:id`

Behavior:
- `GET /products` supports optional `q`, `category`, `sort`, and `page`
- `GET /products/:id` returns one product
- `POST /products` creates a new in-memory product
- `PATCH /products/:id` updates a product

Concept focus:
- Your query params should line up with the URL state you designed in Session 1.

- [ ] **Step 7: Create the categories and suppliers APIs**

Create:
- `backend/src/routes/categories.ts`
- `backend/src/routes/suppliers.ts`

Initial endpoints:
- `GET /categories`
- `GET /suppliers`

Concept focus:
- Keep supporting endpoints small.
- The product resource is the center of gravity.

- [ ] **Step 8: Create the Express server**

Create `backend/src/server.ts`.

Responsibilities:
- Create the Express app
- Enable JSON parsing
- Enable CORS for local development
- Register the products, categories, and suppliers routes
- Start the server on a clear dev port such as `4001`

Concept focus:
- The backend owns resource endpoints.
- The frontend should not mix this concern into UI files.

- [ ] **Step 9: Verify the backend manually**

Run:

```bash
cd backend
pnpm install
pnpm dev
```

Verify:
- `GET /products`
- `GET /products/:id`
- `GET /categories`
- `GET /suppliers`

Expected result:
- You can query the backend independently of the frontend.

- [ ] **Step 10: Align frontend route state with backend query shape**

Review:
- `src/routes/products/index.tsx`
- `backend/src/routes/products.ts`

Make sure the same concepts exist on both sides:
- `q`
- `category`
- `sort`
- `page`

Concept focus:
- Good architecture means both layers speak the same domain language.

- [ ] **Step 11: Write the Session 2 theory checkpoint**

Answer these questions in your notes:
- Why are we keeping the Node API separate from the TanStack app?
- What does the backend own that Router does not?
- Why is mock data acceptable at this stage?
- Why should backend query params mirror frontend URL params?

Expected result:
- You understand the architectural split, not just the code.

## Sessions 3 Through 10 Overview

### Session 3: TanStack Start + Nitro As BFF
- Theory: BFF pattern, server boundaries, proxying
- Build: Server endpoints in the TanStack app that call the Node backend

### Session 4: TanStack Query
- Theory: Server state, query keys, invalidation, mutations
- Build: Product list/detail data fetching and mutations

### Session 5: TanStack Form
- Theory: Form state vs server state
- Build: Create/edit product forms with validation

### Session 6: TanStack Table
- Theory: Headless table state and rendering
- Build: Admin products data grid

### Session 7: TanStack Virtual
- Theory: Virtualization and scaling
- Build: Large product catalog view

### Session 8: TanStack DB
- Theory: Collections, live queries, normalized client data
- Build: Product and supplier collections with optimistic workflows

### Session 9: TanStack Pacer
- Theory: Debounce, throttle, queueing, pacing
- Build: Search/filter pacing and queued stock adjustments

### Session 10: Devtools + CLI + Final Review
- Theory: Observability and ecosystem workflow
- Build: Inspect routes, queries, and interactions with Devtools; explore CLI support

## Self-Review

- Session 1 covers framework boundaries, route structure, and URL state.
- Session 2 covers backend separation and API design.
- The later sessions progress in the recommended order: Router, Query, Form, Table, Virtual, DB, Pacer, Devtools.
- The plan stays intentionally small so the project teaches the ecosystem without becoming a large product build.

