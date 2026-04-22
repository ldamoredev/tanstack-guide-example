# TanStack Architecture Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the TanStack Start app into thin routes plus domain modules, with cleaner server boundaries and product tests moved out of the production file list.

**Architecture:** Keep `src/routes` as TanStack file-routing adapters only, move product logic into `src/modules/products`, move app wiring into `src/app`, and separate app-level server helpers from product-specific BFF logic. Preserve behavior while making route files and module scanning much clearer.

**Tech Stack:** TanStack Start, TanStack Router, TanStack Query, TanStack DB, TanStack Pacer, React 19, TypeScript, Vitest

---

## File Map

- Create: `src/app/query-client.ts`
- Create: `src/app/router.tsx`
- Create: `src/server/backend.ts`
- Create: `src/modules/products/model/{types.ts,search.ts,form.ts,db.ts}`
- Create: `src/modules/products/api/product.client.ts`
- Create: `src/modules/products/server/product.server.ts`
- Create: `src/modules/products/query/{product.queries.ts,product.mutations.ts,product.prefetch.ts}`
- Create: `src/modules/products/db/product.collection.ts`
- Create: `src/modules/products/lib/{virtual.ts,pacer.ts}`
- Create: `src/modules/products/ui/{ProductsPage.tsx,ProductTable.tsx,ProductFilters.tsx,ProductForm.tsx,DebouncedSearchInput.tsx,ProductDetailPage.tsx,NewProductPage.tsx,EditProductPage.tsx,VirtualProductsPage.tsx,DbProductsPage.tsx}`
- Create: `src/modules/products/index.ts`
- Create: `src/modules/products/__tests__/*`
- Modify: `src/routes/products/{index.tsx,new.tsx,virtual.tsx,db.tsx,$productId.tsx,$productId/edit.tsx}`
- Modify: `src/routes/api/products.tsx`
- Modify: `src/routes/api/products/$productId.tsx`
- Modify: `src/routes/index.tsx`
- Modify: `src/routes/__root.tsx` only if imports need adjustment
- Delete after migration: old `src/features/products/*`
- Delete after migration: `src/lib/query-client.ts`
- Delete after migration: `src/router.tsx`
- Delete after migration: `src/lib/server/backend.ts` if superseded

### Task 1: Create app and module skeleton

**Files:**
- Create: `src/app/query-client.ts`
- Create: `src/app/router.tsx`
- Create: `src/server/backend.ts`
- Create: `src/modules/products/index.ts`

- [ ] **Step 1: Write the failing import smoke test**

```ts
import { describe, expect, it } from 'vitest'

describe('module app skeleton', () => {
  it('exposes the new app and product module entrypoints', async () => {
    const app = await import('#/app/query-client')
    const router = await import('#/app/router')
    const products = await import('#/modules/products')

    expect(app.createQueryClient).toBeTypeOf('function')
    expect(router.getRouter).toBeTypeOf('function')
    expect(products).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `corepack pnpm exec vitest run src/modules/products/__tests__/app-skeleton.test.ts`
Expected: FAIL with module-not-found errors for the new app/module paths

- [ ] **Step 3: Write minimal implementation**

```ts
// src/app/query-client.ts
export { createQueryClient } from '../lib/query-client'

// src/app/router.tsx
export { getRouter } from '../router'

// src/server/backend.ts
export * from '../lib/server/backend'

// src/modules/products/index.ts
export {}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `corepack pnpm exec vitest run src/modules/products/__tests__/app-skeleton.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app src/server src/modules/products docs/superpowers/plans/2026-04-19-tanstack-architecture-refactor.md
git commit -m "refactor: add app and module skeleton"
```

### Task 2: Move product model, api, query, db, lib, and server code

**Files:**
- Create: `src/modules/products/model/{types.ts,search.ts,form.ts,db.ts}`
- Create: `src/modules/products/api/product.client.ts`
- Create: `src/modules/products/server/product.server.ts`
- Create: `src/modules/products/query/{product.queries.ts,product.mutations.ts,product.prefetch.ts}`
- Create: `src/modules/products/db/product.collection.ts`
- Create: `src/modules/products/lib/{virtual.ts,pacer.ts}`
- Create: `src/modules/products/__tests__/{api.test.ts,search.test.ts,form.test.ts,db.test.ts,mutations.test.ts,prefetch.test.ts,server.test.ts,virtual.test.ts,pacer.test.ts}`

- [ ] **Step 1: Move the tests first to the new module test folder**

```text
Move without behavior changes:
src/features/products/api.test.ts -> src/modules/products/__tests__/api.test.ts
src/features/products/search.test.ts -> src/modules/products/__tests__/search.test.ts
src/features/products/form.test.ts -> src/modules/products/__tests__/form.test.ts
src/features/products/db.test.ts -> src/modules/products/__tests__/db.test.ts
src/features/products/mutations.test.ts -> src/modules/products/__tests__/mutations.test.ts
src/features/products/prefetch.test.ts -> src/modules/products/__tests__/prefetch.test.ts
src/features/products/server.test.ts -> src/modules/products/__tests__/server.test.ts
src/features/products/virtual.test.ts -> src/modules/products/__tests__/virtual.test.ts
src/features/products/pacer.test.ts -> src/modules/products/__tests__/pacer.test.ts
```

- [ ] **Step 2: Run the moved tests to verify they fail only on import paths**

Run: `corepack pnpm exec vitest run src/modules/products/__tests__/api.test.ts src/modules/products/__tests__/search.test.ts`
Expected: FAIL with import path errors pointing to the old feature paths

- [ ] **Step 3: Move the implementation files into module boundaries and update imports**

```text
Move:
src/features/products/types.ts -> src/modules/products/model/types.ts
src/features/products/search.ts -> src/modules/products/model/search.ts
src/features/products/form.ts -> src/modules/products/model/form.ts
src/features/products/db.ts -> src/modules/products/model/db.ts
src/features/products/api.ts -> src/modules/products/api/product.client.ts
src/features/products/server.ts -> src/modules/products/server/product.server.ts
src/features/products/queries.ts -> src/modules/products/query/product.queries.ts
src/features/products/mutations.ts -> src/modules/products/query/product.mutations.ts
src/features/products/prefetch.ts -> src/modules/products/query/product.prefetch.ts
src/features/products/collection.ts -> src/modules/products/db/product.collection.ts
src/features/products/virtual.ts -> src/modules/products/lib/virtual.ts
src/features/products/pacer.ts -> src/modules/products/lib/pacer.ts
```

- [ ] **Step 4: Add public exports for the product module**

```ts
// src/modules/products/index.ts
export * from './model/types'
export * from './model/search'
export * from './model/form'
export * from './model/db'
export * from './api/product.client'
export * from './server/product.server'
export * from './query/product.queries'
export * from './query/product.mutations'
export * from './query/product.prefetch'
export * from './db/product.collection'
export * from './lib/virtual'
export * from './lib/pacer'
```

- [ ] **Step 5: Run focused product tests**

Run: `corepack pnpm exec vitest run src/modules/products/__tests__/api.test.ts src/modules/products/__tests__/search.test.ts src/modules/products/__tests__/form.test.ts src/modules/products/__tests__/db.test.ts src/modules/products/__tests__/mutations.test.ts src/modules/products/__tests__/prefetch.test.ts src/modules/products/__tests__/server.test.ts src/modules/products/__tests__/virtual.test.ts src/modules/products/__tests__/pacer.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/modules/products
git commit -m "refactor: move product domain logic into modules"
```

### Task 3: Extract product UI pages/components and thin route files

**Files:**
- Create: `src/modules/products/ui/{ProductsPage.tsx,ProductTable.tsx,ProductFilters.tsx,ProductForm.tsx,DebouncedSearchInput.tsx,ProductDetailPage.tsx,NewProductPage.tsx,EditProductPage.tsx,VirtualProductsPage.tsx,DbProductsPage.tsx}`
- Modify: `src/routes/products/{index.tsx,new.tsx,virtual.tsx,db.tsx,$productId.tsx,$productId/edit.tsx}`

- [ ] **Step 1: Write a route smoke test for the thin route wrapper**

```ts
import { describe, expect, it } from 'vitest'

describe('products route module split', () => {
  it('lets the products route import a page component from the product module', async () => {
    const page = await import('#/modules/products/ui/ProductsPage')
    expect(page.ProductsPage).toBeTypeOf('function')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `corepack pnpm exec vitest run src/modules/products/__tests__/route-ui.test.ts`
Expected: FAIL with module-not-found for `ProductsPage`

- [ ] **Step 3: Extract the route UI into module components**

```text
Create focused UI files:
- ProductsPage owns page composition
- ProductTable owns columns and table rendering
- ProductFilters owns search/category/sort/page controls
- NewProductPage and EditProductPage own create/edit screen composition
- ProductDetailPage owns the detail screen
- VirtualProductsPage owns the virtual example
- DbProductsPage owns the DB example
```

- [ ] **Step 4: Rewrite route files to thin adapters**

```tsx
// src/routes/products/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { ProductsPage, hydrateProductsListQuery, validateProductsSearch } from '#/modules/products'

export const Route = createFileRoute('/products/')({
  validateSearch: validateProductsSearch,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => hydrateProductsListQuery(context.queryClient, deps),
  component: ProductsPage,
})
```

- [ ] **Step 5: Run focused product tests**

Run: `corepack pnpm exec vitest run src/modules/products/__tests__/form.test.ts src/modules/products/__tests__/mutations.test.ts src/modules/products/__tests__/prefetch.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/modules/products/ui src/routes/products
git commit -m "refactor: thin product route files"
```

### Task 4: Update API routes and app wiring imports

**Files:**
- Modify: `src/routes/api/products.tsx`
- Modify: `src/routes/api/products/$productId.tsx`
- Modify: `src/router.tsx` or move to `src/app/router.tsx`
- Modify: imports that still point at old feature/lib paths

- [ ] **Step 1: Update product API routes to use module server helpers**

```tsx
import { proxyProductsRequest } from '#/modules/products'
```

- [ ] **Step 2: Update router/query-client imports to app paths**

```ts
// move real implementations
src/lib/query-client.ts -> src/app/query-client.ts
src/router.tsx -> src/app/router.tsx
```

- [ ] **Step 3: Leave compatibility re-exports only if needed briefly**

```ts
// temporary compatibility only if the route tree or imports still depend on old paths
export * from '../app/query-client'
export * from './app/router'
```

- [ ] **Step 4: Run TypeScript**

Run: `corepack pnpm exec tsc --noEmit`
Expected: only the pre-existing Prisma/demo errors remain

- [ ] **Step 5: Commit**

```bash
git add src/routes/api src/app src/router.tsx src/lib/query-client.ts
git commit -m "refactor: align api routes and app wiring"
```

### Task 5: Clean up old paths and verify the refactor

**Files:**
- Delete: `src/features/products/*`
- Delete: `src/lib/server/backend.ts` if fully replaced
- Delete: temporary compatibility exports if no longer needed

- [ ] **Step 1: Search for old product feature imports**

Run: `rg -n "features/products|lib/query-client|lib/server/backend|#/router" src`
Expected: no remaining production imports to the old locations

- [ ] **Step 2: Delete obsolete files**

```text
Remove old files only after all imports resolve through the new module/app/server paths.
```

- [ ] **Step 3: Run focused tests plus TypeScript**

Run: `corepack pnpm exec vitest run src/modules/products/__tests__/api.test.ts src/modules/products/__tests__/search.test.ts src/modules/products/__tests__/form.test.ts src/modules/products/__tests__/db.test.ts src/modules/products/__tests__/mutations.test.ts src/modules/products/__tests__/prefetch.test.ts src/modules/products/__tests__/server.test.ts src/modules/products/__tests__/virtual.test.ts src/modules/products/__tests__/pacer.test.ts src/features/tooling/tooling.test.ts`
Expected: PASS

Run: `corepack pnpm exec tsc --noEmit`
Expected: only the pre-existing Prisma/demo errors remain

- [ ] **Step 4: Manual route smoke checks**

Run:
- `pnpm run dev`
- open `/products`
- open `/products/new`
- open `/products/prod-mouse-wireless`
- open `/products/virtual`
- open `/products/db`

Expected:
- same behavior as before
- thinner route files on disk
- product tests live under `src/modules/products/__tests__`

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "refactor: finalize tanstack module structure"
```
