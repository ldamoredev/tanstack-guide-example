# TanStack Architecture Refactor Design

## Goal

Refactor the current TanStack Start learning project into a clearer, more maintainable structure with:

- thin TanStack route files
- domain-oriented modules
- explicit server/BFF boundaries
- cleaner test placement
- less scanning noise in production folders

This refactor is structural. It should preserve behavior while making future work easier.

## Current Problems

The current project shows a few clear architectural issues:

- `src/routes/products/index.tsx` is too large and mixes route wiring, page UI, table config, filter UI, and local helper logic.
- `src/features/products` mixes domain model, React UI, Query wiring, server/BFF code, DB code, Virtual helpers, Pacer helpers, and tests in one flat folder.
- tests are colocated in the main production directory listing, which makes the module harder to scan.
- shared vs domain-specific code is not clearly separated.
- server-facing code is not visually distinct enough from browser-facing code.

## Design Principles

- `src/routes` is only for TanStack file-based routing and route contracts.
- domain code lives in `src/modules/<domain>`.
- route files should stay thin and mostly delegate to module page/components.
- server/BFF code should be explicit and separate from client UI code.
- tests should stay close to the domain, but not mixed into the main production file list.
- avoid over-engineering with too many architecture layers for a small project.

## Target Structure

```text
src/
  app/
    router.tsx
    query-client.ts

  routes/
    __root.tsx
    index.tsx
    dashboard.tsx
    categories.tsx
    suppliers.tsx
    tooling.tsx
    products/
      index.tsx
      new.tsx
      virtual.tsx
      db.tsx
      $productId.tsx
      $productId/
        edit.tsx
    api/
      products.tsx
      products/
        $productId.tsx

  modules/
    products/
      model/
      ui/
      query/
      api/
      server/
      db/
      lib/
      __tests__/
      index.ts

  shared/
    ui/
    lib/

  server/
    backend.ts
```

## Product Module Boundaries

`src/modules/products/model`
- product types
- search params parsing/normalization
- form value mapping/validation
- small domain helpers

`src/modules/products/ui`
- `ProductsPage`
- `ProductTable`
- `ProductFilters`
- `ProductForm`
- `DebouncedSearchInput`

`src/modules/products/query`
- Query `queryOptions`
- mutation options
- prefetch helpers

`src/modules/products/api`
- browser-facing client API helpers that call `/api/products`

`src/modules/products/server`
- server/BFF helpers used by route handlers

`src/modules/products/db`
- TanStack DB collection wiring

`src/modules/products/lib`
- non-domain-specific but module-local helpers like virtual row helpers

`src/modules/products/__tests__`
- all product tests moved here

`src/modules/products/index.ts`
- public exports for the module

## Route File Rules

Route files should mainly contain:

- `createFileRoute(...)`
- `validateSearch`
- `loaderDeps`
- `loader`
- route-specific guards like `notFound`
- import and render of a page component

Route files should not be the main home for:

- large JSX page layouts
- table column definitions
- repeated event handlers
- reusable feature logic
- mixed UI and domain helper code

## Test Placement

Tests will move from:

- `src/features/products/*.test.ts`

To:

- `src/modules/products/__tests__/*.test.ts`

This keeps tests near the product domain while cleaning up the production file list.

## Shared Layer Rules

`src/shared` is only for truly cross-domain code.

Examples:

- generic reusable UI primitives
- generic utilities
- testing helpers that are not product-specific

Non-generic product code must stay in `src/modules/products`, even if it feels reusable inside that domain.

## Server Layer Rules

`src/server`
- app-level server helpers
- backend URL/config helpers

`src/modules/products/server`
- product-specific BFF/server logic

The intent is to make browser code and server-only code visually distinct.

## Scope

This refactor includes:

- moving product code from `src/features/products` into `src/modules/products`
- moving `src/lib/query-client.ts` into `src/app/query-client.ts`
- moving server helpers into clearer app/module locations
- rewriting route files to be thin adapters
- moving product tests into `__tests__`

This refactor does not include:

- changing user-facing behavior on purpose
- fixing the existing Prisma/demo issues
- introducing a full Feature-Sliced Design rewrite
- refactoring unrelated non-product routes beyond what is needed for imports

## Expected Outcome

After the refactor:

- route files are easier to read
- product logic has clearer ownership
- tests are easier to locate without cluttering production folders
- server/BFF boundaries are clearer
- the project matches TanStack Start patterns more closely while remaining pragmatic

## Risks

- import path churn could temporarily break route files or tests
- generated route typing can expose mistakes quickly if route exports change
- moving too many files at once could create avoidable noise

## Risk Mitigation

- refactor in phases
- keep behavior unchanged
- run focused product tests during the migration
- use TypeScript to catch import/wiring mistakes before declaring success
