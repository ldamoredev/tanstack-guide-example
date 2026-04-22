# TanStack Study Guide For This Project

This document is meant to answer four questions for each TanStack library:

1. What problem does it solve?
2. When should I use it?
3. How does it work at a high level?
4. What are the main building blocks I actually need to learn?

This is not a full API reference. It is the mental model I would want if I were learning TanStack through this repo.

## The Big Picture

In this project, the stack is split like this:

- `TanStack Start` gives us the full-stack app shell.
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
2. Router matches the page
3. Start runs the app shell and server-side web logic
4. Query loads backend data
5. Form edits data
6. Table presents data
7. Virtual reduces DOM work for large lists
8. DB gives reactive client collections where needed
9. Pacer slows or queues actions when timing matters
10. Devtools helps you inspect all of the above

## TanStack Start

### Main reason to use it

Use TanStack Start when you want more than a client-side SPA. Start is the full-stack framework in the stack. According to the official docs, it is a full-stack React framework powered by TanStack Router and Vite, and adds full-document SSR, streaming, server routes, server functions, middleware, and full-stack bundling.

### When to use it

Use Start when you need one or more of these:

- SSR or streaming
- API routes or server routes inside the app
- server functions
- middleware and request context
- one project that handles both browser and server concerns
- a BFF layer in front of another backend

If you only want a client-side app with strong routing, TanStack Router alone can be enough.

### How it works

Start is built on top of TanStack Router. Router handles the route tree and page matching. Start adds the full-stack framework layer around it:

- document rendering
- server runtime integration
- API/server routes
- server functions
- build output for client and server

In this repo, Start is enabled in [vite.config.ts](/Users/lautarodamore/Documents/sample/vite.config.ts), and the router is created in [src/app/router.tsx](/Users/lautarodamore/Documents/sample/src/app/router.tsx).

### Main building blocks to learn

- `src/routes`
  This is where file-based routes live.
- `__root.tsx`
  The root route and document shell.
- `getRouter()`
  Creates the router instance.
- route loaders
  Load data for routes.
- server routes / API routes
  Endpoints inside the app.
- server functions
  Type-safe client-to-server calls.
- middleware and context
  Inject cross-cutting request data.

### Start and Nitro in this repo

This project also uses `nitro()` in [vite.config.ts](/Users/lautarodamore/Documents/sample/vite.config.ts). The clean way to think about it is:

- `TanStack Router` handles app routing
- `TanStack Start` is the full-stack framework
- `Nitro` is the server/runtime layer used in this setup

So if someone says “Nitro routing”, that usually means server/runtime routing, not page routing.

### In this repo

- app shell: [src/routes/__root.tsx](/Users/lautarodamore/Documents/sample/src/routes/__root.tsx)
- router creation: [src/app/router.tsx](/Users/lautarodamore/Documents/sample/src/app/router.tsx)
- server-facing API routes: [src/routes/api](/Users/lautarodamore/Documents/sample/src/routes/api)

### Mini example

You open `/products/prod-mouse-wireless`.

- Start receives the request
- it can render the route on the server
- it can run route loaders before the page is shown
- it can also expose `/api/products/prod-mouse-wireless` as an internal server route

So Start is the framework that lets one app handle both:

- page rendering
- server-side web logic

## TanStack Router

### Main reason to use it

Use Router when you want the URL to be a real part of your app state. Router handles page matching, nested layouts, params, search params, route loaders, navigation, and type-safe route APIs.

### When to use it

Use Router for:

- page navigation
- layouts and nested routes
- URL params like `/products/$productId`
- search params like `?q=ssd&sort=price-desc`
- route-level loading and preloading
- error boundaries and not-found flows

### How it works

Router builds a route tree and matches the current URL against it. Each matched route can contribute:

- component
- loader
- search-param validation
- route context
- error handling

One of the most important Router ideas is that search params are not just strings. They are application state that should be typed, validated, shareable, and bookmarkable.

### Main building blocks to learn

- `createFileRoute`
  Defines a route from a file.
- route tree
  The generated structure of all routes.
- params
  Path values like ids and slugs.
- search params
  URL state for filters, sorting, pagination, tabs.
- loaders
  Route-scoped data loading.
- `Link` and `navigate`
  Type-safe navigation APIs.
- route context
  Shared typed dependencies across routes.
- nested routes and outlets
  Parent-child page composition.

### Best use case in this repo

Router is the owner of:

- `/products`
- `/products/$productId`
- `/products/$productId/edit`
- URL state like `q`, `category`, `sort`, `page`

You can see that in [src/routes/products](/Users/lautarodamore/Documents/sample/src/routes/products).

### Most important rule

If state should survive refresh, be linkable, or be shareable, it usually belongs in the URL and therefore belongs to Router.

### Mini example

On the products page, this URL:

```txt
/products?q=ssd&category=storage&sort=price-desc&page=2
```

belongs to Router because:

- `q` is search text
- `category` is a filter
- `sort` defines ordering
- `page` defines pagination

That means the screen can be refreshed, bookmarked, or shared and still come back in the same state.

## TanStack Query

### Main reason to use it

Use Query for `server state`.

The official docs describe TanStack Query as the missing data-fetching library for web apps, and more technically as a tool for fetching, caching, synchronizing, and updating server state.

### When to use it

Use Query when data:

- comes from an API or backend
- can become stale
- may be shared across screens
- needs loading/error/success state
- needs retries, caching, invalidation, or optimistic updates

Examples:

- products list
- product detail
- dashboard metrics
- create/update/delete mutations

### How it works

Query is built around the idea that remote data has a lifecycle:

- fetch it
- cache it
- decide when it is fresh or stale
- refetch when necessary
- mutate it
- invalidate or update related cache entries

Instead of hand-rolling `useEffect + fetch + loading + error + refetch`, you declare:

- a `queryKey`
- a `queryFn`
- options like freshness and refetch behavior

### Main building blocks to learn

- `QueryClient`
  The cache manager for all queries.
- `useQuery` / `useSuspenseQuery`
  Read remote data.
- `queryKey`
  Identity of a piece of remote data.
- `queryFn`
  How to fetch it.
- `useMutation`
  Create/update/delete flows.
- invalidation
  Mark related cached data as stale.
- prefetching
  Load data before a screen uses it.
- hydration/dehydration
  SSR-friendly server/client transfer.

### Best use case in this repo

Query is used for the product list and product detail flows through:

- [src/modules/products/query/product.queries.ts](/Users/lautarodamore/Documents/sample/src/modules/products/query/product.queries.ts)
- [src/modules/products/query/product.mutations.ts](/Users/lautarodamore/Documents/sample/src/modules/products/query/product.mutations.ts)
- [src/modules/products/query/product.prefetch.ts](/Users/lautarodamore/Documents/sample/src/modules/products/query/product.prefetch.ts)

### Most important rule

Query is for server state, not for general UI state.

### Mini example

On `/products`, Query can identify the current list with a key like:

```ts
['products', { q: 'ssd', category: 'storage', sort: 'price-desc', page: 2 }]
```

Then it:

- fetches the list
- caches it
- returns loading or error state if needed
- can refetch later if the data becomes stale

When you create or edit a product, a mutation runs, and related product queries are invalidated.

## TanStack Form

### Main reason to use it

Use Form when the user is editing structured input and you need form state to be explicit, predictable, and type-safe.

The official docs position TanStack Form as a complete solution for form handling with TypeScript support, headless UI, and framework-agnostic design.

### When to use it

Use Form for:

- create and edit screens
- validation
- touched/dirty/submitting state
- nested fields
- async validation
- complex submission flows

### How it works

TanStack Form creates a form state machine around your inputs. Instead of every input managing itself with ad hoc `useState`, the form instance owns:

- current values
- field metadata
- validation state
- submission state
- form-level subscriptions

Fields subscribe to the form, and the form coordinates validation and submission.

### Main building blocks to learn

- `useForm`
  Creates the form instance.
- `form.Field`
  Connects a field to form state.
- `form.Subscribe`
  Subscribe to selected form state.
- validators
  Field-level or form-level validation.
- submit handling
  Turn form values into backend mutation input.

### Best use case in this repo

The product form is here:

- [src/modules/products/ui/ProductForm.tsx](/Users/lautarodamore/Documents/sample/src/modules/products/ui/ProductForm.tsx)
- [src/modules/products/model/form.ts](/Users/lautarodamore/Documents/sample/src/modules/products/model/form.ts)

It powers:

- create page: [src/modules/products/ui/NewProductPage.tsx](/Users/lautarodamore/Documents/sample/src/modules/products/ui/NewProductPage.tsx)
- edit page: [src/modules/products/ui/EditProductPage.tsx](/Users/lautarodamore/Documents/sample/src/modules/products/ui/EditProductPage.tsx)

### Most important rule

Form owns form state. Query owns backend data. Do not mix those responsibilities.

### Mini example

In the create-product screen:

- Form owns the current field values
- Form knows whether `name` or `sku` is invalid
- Form knows if the user touched a field
- Form knows if submission is in progress

Then on submit:

1. Form produces the validated input object
2. Query mutation sends it to the backend
3. navigation goes to the new product detail page

## TanStack Table

### Main reason to use it

Use Table when your data needs real table behavior, not just a mapped list.

The official docs emphasize that Table is headless. It does not render DOM for you. It gives you the behavior model, and you render the UI.

### When to use it

Use Table when you need:

- columns and rows
- sorting
- filtering
- pagination
- column visibility
- row selection
- grouping or expanding
- controlled table state

### How it works

You define column definitions and feed raw data into a table instance. Table then derives:

- headers
- rows
- cells
- sorting state
- filtering state
- pagination state

You render the UI yourself from those derived models.

### Main building blocks to learn

- `columnDef`
  Defines what a column is and how it reads data.
- `useReactTable`
  Creates the table instance.
- row models
  Derived representations of the current table state.
- table state
  Sorting, filtering, pagination, visibility, selection.
- controlled state
  Let Router or local state own table state if needed.

### Best use case in this repo

The products admin table lives in:

- [src/modules/products/ui/ProductTable.tsx](/Users/lautarodamore/Documents/sample/src/modules/products/ui/ProductTable.tsx)
- [src/modules/products/ui/ProductsPage.tsx](/Users/lautarodamore/Documents/sample/src/modules/products/ui/ProductsPage.tsx)

### Most important rule

Table does not fetch data and does not own your domain logic. It only models table behavior.

### Mini example

Suppose the products page already has data:

```ts
const products = [
  { name: 'Portable SSD', price: 149, stock: 18 },
  { name: 'Wireless Mouse', price: 49, stock: 44 },
]
```

Table takes that data plus column definitions and gives you:

- a `Product` column
- a `Price` column
- a `Stock` column
- derived headers and rows
- sorting behavior when a user clicks a header

It does not fetch the products. It just turns them into table state and models.

## TanStack Virtual

### Main reason to use it

Use Virtual when the list is large enough that rendering every DOM node is too expensive.

The docs describe TanStack Virtual as a headless utility for virtualizing long lists. It renders only the visible part of a large list while giving you full control over markup and styles.

### When to use it

Use Virtual when:

- you have hundreds or thousands of rows
- scrolling gets heavy
- mount/render cost is too high
- the bottleneck is DOM rendering, not data fetching

Do not use it too early. Small lists usually do not need it.

### How it works

Virtual keeps the whole data set conceptually available, but only computes and renders a window of visible items plus a small overscan buffer.

You tell it:

- how many items exist
- what element scrolls
- an estimated item size

It gives you virtual items with:

- index
- size
- start position

Then you position those items in your UI.

### Main building blocks to learn

- `useVirtualizer`
  Creates the virtualizer.
- `count`
  Total number of items.
- `getScrollElement`
  The scrolling container.
- `estimateSize`
  Estimated item height or width.
- virtual items
  The visible window you render.

### Best use case in this repo

The virtualized teaching page is here:

- [src/modules/products/ui/VirtualProductsPage.tsx](/Users/lautarodamore/Documents/sample/src/modules/products/ui/VirtualProductsPage.tsx)
- [src/modules/products/lib/virtual.ts](/Users/lautarodamore/Documents/sample/src/modules/products/lib/virtual.ts)

### Most important rule

Virtual changes rendering strategy, not your data model.

### Mini example

Imagine you have 10,000 product rows.

Without Virtual:

- the browser tries to render all 10,000 DOM rows

With Virtual:

- the app still conceptually has 10,000 products
- but the DOM may only render, for example, 20 to 40 visible rows at a time

The user still scrolls through the full list, but the browser does much less rendering work.

## TanStack DB

### Main reason to use it

Use DB when you want richer client-side data workflows than plain query caching usually gives you.

According to the docs, TanStack DB works by:

- defining collections
- using live queries across those collections
- making optimistic mutations with transactional mutators

### When to use it

Use DB when you need:

- client-side collections of records
- reactive derived views
- richer optimistic updates
- local-first style flows
- multiple UI views over the same client data

Do not start with DB just because it sounds powerful. Start with Query first. Add DB when Query invalidation and cache coordination start to feel limiting.

### How it works

DB is not your backend database. It is a client-side data layer.

The main idea is:

1. define a collection
2. load data into it
3. query it reactively with live queries
4. mutate it optimistically
5. sync those changes back to the server

This gives you a more app-like local data model.

### Main building blocks to learn

- collections
  Typed client-side sets of records.
- `useLiveQuery`
  Reactive query over collection data.
- optimistic mutations
  Update local collection first.
- mutators / transactions
  Apply local changes in a controlled way.
- sync strategy
  Decide how local updates persist to the backend.

### Best use case in this repo

The DB teaching slice lives in:

- [src/modules/products/db/product.collection.ts](/Users/lautarodamore/Documents/sample/src/modules/products/db/product.collection.ts)
- [src/modules/products/model/db.ts](/Users/lautarodamore/Documents/sample/src/modules/products/model/db.ts)
- [src/modules/products/ui/DbProductsPage.tsx](/Users/lautarodamore/Documents/sample/src/modules/products/ui/DbProductsPage.tsx)

### Most important rule

TanStack DB is a client data layer. It is not Prisma, Postgres, or your backend persistence.

### Mini example

Suppose you load products into a collection and show a “low stock” view.

Then the user clicks `+5 stock` for one product.

With DB:

1. the collection updates immediately on the client
2. the low-stock list reacts automatically
3. the backend sync happens after that

So the UI feels instant because the collection is reactive and optimistic.

## TanStack Pacer

### Main reason to use it

Use Pacer when timing is part of correctness or UX.

The official docs describe it as a library for controlling function execution timing correctly, with a consistent API, type-safety, and tree-shaking.

### When to use it

Use Pacer for:

- debounced search
- throttled resize or scroll handlers
- rate-limited actions
- queued work
- interactions that should not fire on every event

### How it works

Pacer sits between the event and the effect.

Instead of:

- every keystroke updating URL and refetching

you do:

- every keystroke updates local input
- Pacer delays the expensive action

This reduces waste and also prevents timing bugs and race conditions.

### Main building blocks to learn

- debouncing
  Wait until activity settles.
- throttling
  Limit how often something can run.
- queues
  Serialize or stage repeated work.
- execution control utilities
  Shared timing primitives extracted from patterns used in other TanStack libraries.

### Best use case in this repo

The debounced product search lives in:

- [src/modules/products/ui/DebouncedSearchInput.tsx](/Users/lautarodamore/Documents/sample/src/modules/products/ui/DebouncedSearchInput.tsx)
- [src/modules/products/lib/pacer.ts](/Users/lautarodamore/Documents/sample/src/modules/products/lib/pacer.ts)

### Most important rule

Pacer is not just about performance. It is also about making repeated interactions behave correctly.

### Mini example

A user types:

```txt
s -> ss -> ssd
```

Without Pacer:

- the app may update the URL and refetch on every keystroke

With a debounced Pacer flow:

- typing stays immediate
- the expensive search action only runs after the user pauses

That means fewer requests and a calmer UX.

## TanStack Devtools

### Main reason to use it

Use Devtools so you can inspect state and behavior instead of guessing.

The official docs describe TanStack Devtools as a framework-agnostic devtool foundation with framework adapters, a core shell, an event system, and build tooling.

### When to use it

Use Devtools during development when you need to inspect:

- route state
- query cache
- freshness and invalidation
- plugin panels
- app behavior during navigation and data loading

### How it works

Devtools has layered pieces:

- framework adapter
- core shell UI
- event system
- build tooling like the Vite plugin

Some TanStack libraries also expose devtool integrations that plug into this experience.

### Main building blocks to learn

- framework adapter
  React integration package.
- core shell
  The actual panel UI.
- Vite plugin
  Dev-only build integration and tooling support.
- plugins/panels
  What each library contributes to the devtools experience.

### Best use case in this repo

The global shell is mounted in:

- [src/routes/__root.tsx](/Users/lautarodamore/Documents/sample/src/routes/__root.tsx)

The Vite plugin is enabled in:

- [vite.config.ts](/Users/lautarodamore/Documents/sample/vite.config.ts)

There is also a small learning page here:

- [src/routes/tooling.tsx](/Users/lautarodamore/Documents/sample/src/routes/tooling.tsx)

### Most important rule

Devtools should be part of your learning loop. Inspect first, guess less.

### Mini example

You open the products page and something feels wrong.

With Devtools you can inspect:

- current route and search params
- whether the products query is fresh or stale
- whether a mutation invalidated the list

Instead of guessing “why is this refetching?”, you can see the actual app state.

## TanStack CLI

### Main reason to use it

Use the CLI to create TanStack Start or Router apps and add common integrations quickly.

The official overview describes it as a tool to scaffold Start and Router apps with add-ons for auth, databases, deployment, monitoring, and more.

### When to use it

Use the CLI when:

- starting a new TanStack project
- trying an official starter
- adding common integrations
- exploring add-ons and templates
- wanting a faster official setup path

### How it works

The CLI gives you:

- project creation
- starters and templates
- add-ons
- ecosystem introspection

So instead of manually wiring everything from scratch, you begin from an official base.

### Main building blocks to learn

- `create`
  Create a project.
- starters/templates
  Pick a starting shape.
- add-ons
  Bring in common capabilities.
- introspection
  Discover libraries, docs, and ecosystem data from the CLI.

### Best use case in this repo

You mainly need the CLI mentally as the official TanStack project bootstrap tool. The day-to-day work in this repo is more about Start, Router, Query, and the product module than about running CLI commands constantly.

### Most important rule

The CLI helps you start and scaffold. It is not a runtime library.

### Mini example

When starting a new project, instead of manually wiring:

- Start
- Router
- add-ons
- project structure

you can begin from:

```bash
npx @tanstack/cli create my-app
```

So CLI is the project bootstrap tool, while the rest of the TanStack libraries are what you use inside the app after it exists.

## Fast Comparison Guide

### Start vs Router

- `Router` = client/app routing mental model
- `Start` = full-stack framework around Router

If you need page matching only, think Router.
If you need SSR, server routes, middleware, or server functions, think Start.

### Router vs Query

- `Router` = where am I, and what state belongs in the URL?
- `Query` = what backend data should I fetch and cache for this route?

### Query vs DB

- `Query` = fetch/cache server state
- `DB` = richer client-side collections and live derived views

Start with Query. Add DB only when you feel the need for a client data model.

### Form vs Query

- `Form` = in-progress user input
- `Query` = saved backend data

### Table vs Virtual

- `Table` = behavior of tabular data
- `Virtual` = performance strategy for rendering large lists/tables

You can use Table without Virtual.
You can combine them when the row count becomes large.

### Start/Nitro vs backend

- `Start + Nitro` = app shell and BFF/server boundary
- `backend/` = real business logic service in this repo

Browser -> Start -> backend

## What To Learn First

If you want the highest-value learning order for this repo:

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

- [TanStack Start Overview](https://tanstack.com/start/v0/docs/framework/react/overview)
- [TanStack Start Routing](https://tanstack.com/start/latest/docs/framework/react/guide/routing)
- [TanStack Router Overview](https://tanstack.com/router/latest/docs/overview)
- [TanStack Query Overview](https://tanstack.com/query/docs)
- [TanStack Form Overview](https://tanstack.com/form/latest/docs/overview)
- [TanStack Table Overview](https://tanstack.com/table/latest/docs/overview)
- [TanStack Virtual Introduction](https://tanstack.com/virtual/latest/docs)
- [TanStack DB Overview](https://tanstack.com/db/latest/docs/overview)
- [TanStack Pacer Overview](https://tanstack.com/pacer/latest/docs/overview)
- [TanStack Devtools Overview](https://tanstack.com/devtools/latest/docs/overview)
- [TanStack CLI Overview](https://tanstack.com/cli/latest/docs/overview)
