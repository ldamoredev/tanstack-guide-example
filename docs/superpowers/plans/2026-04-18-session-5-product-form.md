# Session 5 Product Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add TanStack Form-powered create and edit product flows that work against the existing mock backend and BFF layer.

**Architecture:** A shared product form component will own field rendering and validation, while TanStack Query mutations will handle create and update requests. TanStack Router routes will own page-specific loading, submission wiring, and navigation, and Prisma will remain unused for this session.

**Tech Stack:** TanStack Start, TanStack Router, TanStack Query, TanStack Form, React, TypeScript, Vitest, Express mock backend

---

## File Structure

- Create: `src/features/products/form.ts`
- Create: `src/features/products/form.test.ts`
- Create: `src/features/products/mutations.ts`
- Create: `src/features/products/mutations.test.ts`
- Create: `src/features/products/ProductForm.tsx`
- Create: `src/routes/products/new.tsx`
- Create: `src/routes/products/$productId/edit.tsx`
- Modify: `src/features/products/api.ts`
- Modify: `src/routes/products/index.tsx`
- Modify: `src/routes/products/$productId.tsx`
- Modify: `package.json`

### Task 1: Add TanStack Form Dependency

**Files:**
- Modify: `package.json`

- [ ] Install `@tanstack/react-form`
- [ ] Verify the lockfile updates cleanly

### Task 2: Define Product Form Model And Validation

**Files:**
- Create: `src/features/products/form.ts`
- Test: `src/features/products/form.test.ts`

- [ ] Write failing tests for `getDefaultProductFormValues`, `toProductFormValues`, and `validateProductFormValue`
- [ ] Run `pnpm exec vitest run src/features/products/form.test.ts` and verify failure
- [ ] Implement static category/supplier options, default values, conversion helpers, and validation helpers
- [ ] Re-run `pnpm exec vitest run src/features/products/form.test.ts` and verify pass

### Task 3: Add Create And Update Mutation Helpers

**Files:**
- Modify: `src/features/products/api.ts`
- Create: `src/features/products/mutations.ts`
- Test: `src/features/products/mutations.test.ts`

- [ ] Write failing tests for create and update request helpers
- [ ] Run `pnpm exec vitest run src/features/products/mutations.test.ts` and verify failure
- [ ] Add `createProduct` and `updateProduct` API helpers plus mutation helpers
- [ ] Re-run `pnpm exec vitest run src/features/products/mutations.test.ts` and verify pass

### Task 4: Build Shared ProductForm Component

**Files:**
- Create: `src/features/products/ProductForm.tsx`
- Test: `src/features/products/form.test.ts`

- [ ] Extend tests to cover inline validation behavior and submit-disabled state as needed
- [ ] Run the focused form test file and verify the new cases fail
- [ ] Implement `ProductForm` with `useForm`, field-level validators, submit handling, inline error UI, and shared create/edit props
- [ ] Re-run the focused form test file and verify pass

### Task 5: Add Create Product Route

**Files:**
- Create: `src/routes/products/new.tsx`
- Modify: `src/routes/products/index.tsx`

- [ ] Write or extend tests for create-page mutation success and navigation wiring where practical
- [ ] Run the focused tests and verify failure
- [ ] Implement `/products/new` using the shared form and create mutation
- [ ] Add a clear link from the products list page to the create page
- [ ] Re-run focused tests and verify pass

### Task 6: Add Edit Product Route

**Files:**
- Create: `src/routes/products/$productId/edit.tsx`
- Modify: `src/routes/products/$productId.tsx`

- [ ] Write or extend tests for edit-page default values and update mutation behavior where practical
- [ ] Run the focused tests and verify failure
- [ ] Implement `/products/$productId/edit` using hydrated product detail data and the shared form
- [ ] Add an edit link from the product detail page
- [ ] Re-run focused tests and verify pass

### Task 7: Final Session 5 Verification

**Files:**
- Review: `src/features/products/*`
- Review: `src/routes/products/*`

- [ ] Run `pnpm exec vitest run src/features/products/form.test.ts src/features/products/mutations.test.ts`
- [ ] Run `pnpm exec vitest run src/features/products/api.test.ts src/features/products/prefetch.test.ts src/features/products/server.test.ts src/features/products/search.test.ts`
- [ ] Run `cd backend && pnpm test`
- [ ] Run the dev servers and manually verify create and edit flows against the mock backend
- [ ] Note that Prisma remains intentionally out of scope for this session

## Self-Review

- The plan stays scoped to Session 5 and does not widen into Prisma, DB, or table work.
- Each task maps to one concrete learning concept: model, mutations, shared form, create route, edit route, verification.
- The implementation keeps route ownership, query ownership, and form ownership separated cleanly.
