# TanStack Study Guide For This Project

This guide is the opinionated version of what I learned while building this repo.

It is not a TanStack API reference. The docs already do that better. This is the mental model I would want as an experienced engineer evaluating whether TanStack is useful for a real React codebase.

## My Take

TanStack is not interesting because it gives React more libraries.

It is interesting because it gives names and boundaries to problems React apps already have: routing, URL state, server state, forms, tables, virtualization, optimistic updates, and timing.

That matters in real systems. The hard part of frontend architecture is rarely rendering a button. The hard part is keeping state ownership clear when the same screen has URL filters, cached backend data, forms, mutations, optimistic feedback, loading states, and derived table behavior.

My take: TanStack is strongest when you want explicit primitives instead of framework magic. It gives you control, but it also expects you to understand the boundaries.

## Why TanStack?

Modern React apps tend to accumulate accidental state machines:

- a router that knows the page but not the business search state
- `useEffect` chains pretending to be data fetching architecture
- forms that mix validation, pending state, and mutation logic
- tables that begin as `array.map` and slowly become custom frameworks
- cache invalidation hidden in component callbacks

TanStack gives those responsibilities dedicated tools.

Router owns URL state. Query owns server state. Form owns in-progress input. Table owns table behavior. Virtual owns DOM rendering strategy. DB owns richer client-side collections. Pacer owns repeated action timing. Start gives the app a server boundary.

The important part is not using every library. The important part is knowing which problem each library is allowed to solve.

## Why Now?

React has moved toward server rendering, streaming, route-level data, and tighter server/client boundaries. At the same time, many teams still need the ergonomics of a client-heavy app: typed URL state, interactive tables, fast mutations, and predictable cache behavior.

TanStack sits in that gap.

It is gaining traction because it does not force one product shape. You can use Router without Start. You can use Query in almost any React app. You can add Table or Virtual only when the screen earns it. That modularity is useful for teams that do not want all-or-nothing framework decisions.

## TanStack vs Next.js

Next.js is a full framework with strong conventions, especially for file routing, server rendering, server components, and deployment paths.

TanStack Start is more explicit and less mature. It gives you powerful primitives around Router, loaders, server routes, server functions, and Vite, but it asks you to make more architecture decisions yourself.

I would reach for Next.js when the product benefits from its conventions, ecosystem, and hosting defaults.

I would reach for TanStack Start when I want a more library-shaped architecture, stronger client routing ergonomics, and clear ownership over URL state and data flows.

## TanStack vs React Router

React Router is a stable default for routing in many React apps.

TanStack Router becomes more compelling when URL state is not just navigation but product behavior: filters, sorting, pagination, tabs, nested layouts, route loaders, and typed params/search.

The difference is not only routing. It is how much confidence you want around route contracts.

If routes are simple, React Router is enough. If route state is part of the product surface, TanStack Router is worth evaluating.

## TanStack Query vs Fetch Or Axios

`fetch` and `axios` are transport tools. They do not solve server-state lifecycle.

Real server state needs identity, caching, freshness, retries, loading states, mutation handling, invalidation, prefetching, and SSR hydration.

You can build that yourself with `useEffect`, local state, and conventions. Most teams eventually do. TanStack Query is the point where you stop pretending transport is architecture.

## When To Use TanStack

Use TanStack when:

- URL state matters and must be typed, shareable, and validated
- data is reused across screens and can become stale
- route loading should be part of navigation, not an afterthought
- forms have real validation and submission flows
- tables need sorting, filtering, pagination, visibility, or selection
- large lists create DOM performance problems
- optimistic UI and client-side derived views are important
- you want explicit boundaries more than hidden conventions

## When Not To Use TanStack

Do not use TanStack just to look modern.

Avoid it when:

- the app is mostly static content
- routing is simple and URL state does not matter
- server data is trivial and isolated
- the team does not want to learn several explicit primitives
- a framework convention already solves the problem well enough
- the product needs maximum ecosystem maturity over architectural control

For small apps, the extra vocabulary can be noise.

## Tradeoffs

The upside is control. TanStack makes state ownership visible and testable.

The cost is surface area. You need to learn the boundaries between Router, Query, Form, Table, DB, and Start. If the team blurs those boundaries, the stack can become harder than the problem.

DX is strong once the mental model clicks. Before that, it can feel like many small libraries asking for precise decisions.

Ecosystem maturity also varies. Query and Table are battle-tested. Start and DB are more emerging. That does not make them bad, but it changes the risk profile.

## Real-World Use Cases

TanStack makes sense for:

- internal admin tools with dense data screens
- finance, logistics, inventory, reporting, or operations apps
- SaaS products with heavy filtering and deep links
- dashboards where stale data and refetch behavior matter
- apps with complex forms and create/edit flows
- products that need fast optimistic feedback
- teams that care about type-safe route contracts

It is less compelling for a landing page, blog, brochure site, or tiny CRUD app.

## The Big Picture

In this repo, the stack is split like this:

- `TanStack Start` gives the full-stack app shell.
- `TanStack Router` controls page routing and URL state.
- `TanStack Query` controls backend data fetching and caching.
- `TanStack Form` controls form state and validation.
- `TanStack Table` controls table behavior.
- `TanStack Virtual` controls rendering performance for large lists.
- `TanStack DB` controls richer client-side collections and optimistic workflows.
- `TanStack Pacer` controls timing of repeated actions.
- `TanStack Devtools` helps inspect what the app is doing.
- `TanStack CLI` helps create and scaffold TanStack projects.

The flow in this repo is:

1. Browser enters a route
2. Router matches the page and validates URL state
3. Start runs the app shell and server-side web logic
4. Query loads backend data
5. Form edits data
6. Table presents data
7. Virtual reduces DOM work for large lists
8. DB gives reactive client collections where needed
9. Pacer slows or queues repeated actions
10. Devtools helps inspect the system

## TanStack Start

Start is the full-stack layer. It is the reason this project can have pages and API routes in one deployable app.

Use it when you need SSR, server routes, server functions, middleware, request context, or a BFF layer in front of another backend.

In this repo:

- `src/routes/__root.tsx` defines the root document shell.
- `src/app/router.tsx` creates the router.
- `src/routes/api` contains the app-owned API routes.
- `vite.config.ts` wires TanStack Start and the deployment runtime.

The key rule: Start is the application boundary. It should coordinate web concerns, not become a dumping ground for domain logic.

## TanStack Router

Router is where URL state becomes real application state.

The products page uses URL search for:

- `q`
- `category`
- `sort`
- `page`

That means a filtered product table can be refreshed, shared, bookmarked, and validated.

In this repo:

- `src/routes/products/index.tsx` validates search params and hydrates the list query.
- `src/modules/products/model/search.ts` defines the accepted search shape.
- `src/modules/products/ui/ProductsPage.tsx` updates URL state through typed navigation.

The key rule: if state should survive refresh or be shared as a link, Router should probably own it.

## TanStack Query

Query owns server state.

That means data with a lifecycle: fetch, cache, become stale, refetch, mutate, invalidate, and hydrate between server and client.

In this repo:

- `src/modules/products/query/product.queries.ts` defines query identities.
- `src/modules/products/query/product.mutations.ts` invalidates related product queries after writes.
- `src/modules/products/query/product.prefetch.ts` connects route loaders with Query.

The key rule: Query is not global state. It is a server-state cache.

Example query identity:

```ts
;['products', { q: 'ssd', category: 'storage', sort: 'price-desc', page: 2 }]
```

That key is not decoration. It is the identity of the remote data being requested.

## TanStack Form

Form owns in-progress user input.

That separation matters. Form state is not server state. Query should not know which field is dirty. Form should not become the cache.

In this repo:

- `src/modules/products/ui/ProductForm.tsx` renders create and edit forms.
- `src/modules/products/model/form.ts` defines validation and mutation input.
- `src/modules/products/application/useCreateProductFlow.ts` and `useUpdateProductFlow.ts` connect form submission to mutations.

The key rule: Form validates and produces input. Query persists it.

## TanStack Table

Table models table behavior. It does not fetch data, own domain logic, or render a design system for you.

Use it when a table needs sorting, filtering, pagination, row models, selection, column visibility, or controlled state.

In this repo:

- `src/modules/products/ui/ProductTable.tsx` renders the product grid.
- `src/modules/products/ui/ProductsPage.tsx` keeps table actions connected to URL state.

The key rule: Table is for table state, not data loading.

## TanStack Virtual

Virtual is a rendering strategy for large lists.

It keeps the full list conceptually available, but only renders the visible window plus overscan. That reduces DOM pressure without changing the data model.

In this repo:

- `src/modules/products/ui/VirtualProductsPage.tsx` demonstrates virtualized rows.
- `src/modules/products/lib/virtual.ts` contains the virtual data helpers.

The key rule: do not virtualize early. Use it when rendering volume is the bottleneck.

## TanStack DB

DB is a client-side data layer for richer local collections, live queries, and optimistic workflows.

It is not Postgres, Prisma, or your backend database.

In this repo:

- `src/modules/products/db/product.collection.ts` defines the collection.
- `src/modules/products/model/db.ts` models client-side DB behavior.
- `src/modules/products/ui/DbProductsPage.tsx` demonstrates reactive local product views.

The key rule: start with Query. Reach for DB when query invalidation is not expressive enough for the client-side data model.

## TanStack Pacer

Pacer owns timing.

That sounds small until you have search boxes, scroll handlers, resize handlers, repeated mutations, or rate-limited actions.

In this repo:

- `src/modules/products/ui/DebouncedSearchInput.tsx` keeps typing responsive.
- `src/modules/products/lib/pacer.ts` controls delayed search behavior.

The key rule: timing is part of UX correctness, not only performance.

## TanStack Devtools

Devtools shorten the feedback loop.

They help inspect routes, query cache, invalidation, freshness, and navigation behavior instead of guessing from console logs.

In this repo:

- `src/routes/__root.tsx` mounts the global shell.
- `vite.config.ts` enables the Vite plugin.
- `src/routes/tooling.tsx` collects tooling notes.

The key rule: inspect state before inventing theories.

## TanStack CLI

The CLI is useful for starting projects and exploring official setup paths.

It is not a runtime architecture decision. It helps bootstrap Start and Router apps, templates, and add-ons.

The key rule: use the CLI to start faster, then judge the architecture by the code you keep.

## Fast Comparison Guide

Start vs Router:

- `Router` controls routing and URL state.
- `Start` wraps Router with full-stack app capabilities.

Router vs Query:

- `Router` answers where the user is and what URL state is active.
- `Query` answers what server data belongs to that state.

Query vs DB:

- `Query` caches server state.
- `DB` models richer client-side collections and live derived views.

Form vs Query:

- `Form` owns unsaved input.
- `Query` owns persisted remote data.

Table vs Virtual:

- `Table` models tabular behavior.
- `Virtual` reduces DOM work.

## What To Learn First

The learning order I recommend for this repo:

1. Start
2. Router
3. Query
4. Form
5. Table
6. Virtual
7. DB
8. Pacer
9. Devtools
10. CLI

That order matches how the concepts depend on each other.

## Official Docs

- TanStack Start: https://tanstack.com/start
- TanStack Router: https://tanstack.com/router
- TanStack Query: https://tanstack.com/query
- TanStack Form: https://tanstack.com/form
- TanStack Table: https://tanstack.com/table
- TanStack Virtual: https://tanstack.com/virtual
- TanStack DB: https://tanstack.com/db
- TanStack Pacer: https://tanstack.com/pacer
- TanStack Devtools: https://tanstack.com/devtools
- TanStack CLI: https://tanstack.com/cli
