# Products Control Room Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Products area into a dense control-room workspace while preserving the existing TanStack query, route, validation, and mutation behavior.

**Architecture:** Keep the current data and route structure intact and focus on UI composition. Rebuild the browse page around a stronger command surface and inspection grid, then carry the same visual language into the detail and form routes so the whole Products area feels like one workspace.

**Tech Stack:** TanStack Start, TanStack Router, TanStack Query, TanStack Form, React 19, Tailwind CSS v4, Vitest

---

## File Structure

### Modify

- `src/modules/products/ui/ProductsPage.tsx`
- `src/modules/products/ui/ProductFilters.tsx`
- `src/modules/products/ui/ProductTable.tsx`
- `src/modules/products/ui/ProductDetailPage.tsx`
- `src/modules/products/ui/NewProductPage.tsx`
- `src/modules/products/ui/EditProductPage.tsx`
- `src/modules/products/ui/ProductForm.tsx`

### Create

- `src/modules/products/__tests__/ui.test.tsx`
- `docs/superpowers/plans/2026-04-20-products-control-room.md`

## Task 1: Add the failing Products UI framing test

**Files:**
- Create: `src/modules/products/__tests__/ui.test.tsx`

- [x] **Step 1: Write the failing test for the new browse/detail/form framing**

Add a test file that:
- renders `ProductsPage` with mocked query data and checks for control-room copy such as `control room`, `search params`, `loader`, and `query`
- renders `ProductDetailPage` with mocked detail data and checks for inspection framing
- renders `NewProductPage` and `EditProductPage` with mocked handlers and checks for mutation-workspace copy

- [x] **Step 2: Run the targeted test and verify it fails for missing UI framing**

Run:

```bash
corepack pnpm test src/modules/products/__tests__/ui.test.tsx
```

Expected:
- FAIL because the current Products area does not yet use the new control-room language

## Task 2: Redesign the browse page as the control room

**Files:**
- Modify: `src/modules/products/ui/ProductsPage.tsx`
- Modify: `src/modules/products/ui/ProductFilters.tsx`
- Modify: `src/modules/products/ui/ProductTable.tsx`

- [x] **Step 1: Rebuild the page header around route/query/data cues**

Update `ProductsPage` to:
- use stronger chips for `Data-backed`, `Loader`, `Query`, and `Search params`
- describe the browse screen as the main control room for the product flow
- preserve the existing route actions for create, virtualized, and DB views

- [x] **Step 2: Turn `ProductFilters` into a clearer command surface**

Update the filters panel to:
- group search, category, sort, and page controls more deliberately
- include a compact result summary
- visually support operational scanning rather than reading like a small form

- [x] **Step 3: Refresh `ProductTable` as an inspection grid**

Update the table to:
- strengthen the table heading row and row scanning rhythm
- improve action and sort affordances visually
- keep all existing behavior intact

- [x] **Step 4: Run the targeted test again**

Run:

```bash
corepack pnpm test src/modules/products/__tests__/ui.test.tsx
```

Expected:
- browse assertions move to green while detail/form assertions may still be red

## Task 3: Redesign the detail page as an inspection panel

**Files:**
- Modify: `src/modules/products/ui/ProductDetailPage.tsx`

- [x] **Step 1: Reframe the detail page as a deeper inspection surface**

Update the page to:
- keep the current query flow
- add clearer inspection cues and supporting chips
- separate identity, pricing, stock, and supplier/category context into more intentional cards

- [x] **Step 2: Run the targeted test again**

Run:

```bash
corepack pnpm test src/modules/products/__tests__/ui.test.tsx
```

Expected:
- detail assertions are green

## Task 4: Redesign create/edit/form as mutation workspaces

**Files:**
- Modify: `src/modules/products/ui/NewProductPage.tsx`
- Modify: `src/modules/products/ui/EditProductPage.tsx`
- Modify: `src/modules/products/ui/ProductForm.tsx`

- [x] **Step 1: Reframe the create and edit pages around mutation language**

Update the route shells to:
- call out mutation behavior explicitly
- carry the same visual language as browse/detail
- introduce a stronger action-oriented header

- [x] **Step 2: Group the form more intentionally without changing field logic**

Update `ProductForm` to:
- group fields by identity, inventory, and relationships
- improve supporting text and action placement
- preserve current validation and submit behavior

- [x] **Step 3: Run the targeted UI test again**

Run:

```bash
corepack pnpm test src/modules/products/__tests__/ui.test.tsx
```

Expected:
- full targeted Products UI suite passes

## Task 5: Verify the redesign against existing behavior

**Files:**
- Modify: any of the above for final polish if verification reveals issues

- [x] **Step 1: Run the targeted Products UI test**

Run:

```bash
corepack pnpm test src/modules/products/__tests__/ui.test.tsx
```

- [x] **Step 2: Run the existing product form test**

Run:

```bash
corepack pnpm test src/modules/products/__tests__/form.test.ts
```

- [x] **Step 3: Run the full test suite**

Run:

```bash
corepack pnpm test
```

Expected:
- app-side tests pass
- note any unrelated pre-existing failures explicitly

- [x] **Step 4: Run the production build**

Run:

```bash
corepack pnpm build
```

Expected:
- either build succeeds or pre-existing unrelated build blockers are called out explicitly

## Self-Review

### Spec coverage

- browse control-room work is covered in Task 2
- detail inspection work is covered in Task 3
- create/edit/form mutation workspace work is covered in Task 4
- verification is covered in Task 5

### Placeholder scan

- no placeholders remain
- every task names files and concrete verification commands

### Type consistency

- the plan keeps the current product query, route, and form APIs intact
- all framing changes stay in the UI layer
