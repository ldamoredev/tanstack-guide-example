# Session 5 Product Form Design

**Goal:** Add a focused TanStack Form learning slice that teaches create and edit product workflows without depending on Prisma or any external database URL.

## Scope

This session adds:
- a shared `ProductForm` experience for both create and edit
- one create route at `/products/new`
- one edit route at `/products/$productId/edit`
- TanStack Query mutations for `POST /products` and `PATCH /products/:id`
- simple client-side validation aligned with backend rules

This session does **not** add:
- Prisma setup
- category or supplier management pages
- dynamic category/supplier fetching
- table or virtualized admin UI

## Why Prisma Stays Out

The current repo has unrelated Prisma demo issues and no working database URL. That is not a blocker for learning TanStack Form. The existing mock Node backend already exposes the exact product create and update endpoints needed for this session, so the form learning path should use that backend and avoid the Prisma demo entirely.

## Architecture

- `TanStack Router` owns the create and edit page routes.
- `TanStack Query` owns product reads plus create and update mutations.
- `TanStack Form` owns field state, validation, touched state, submit state, and form submission.
- The browser continues to talk to the app-owned BFF routes first.
- The BFF continues to proxy to the separate Node TypeScript backend.

## Form Shape

The shared product form will edit these fields:
- `name`
- `sku`
- `price`
- `stock`
- `categoryId`
- `supplierId`

The form will use static category and supplier options for this session so the student can focus on form concepts instead of adding more server-state dependencies. The option values will match the mock backend ids that already exist.

## Validation Rules

Client-side rules should mirror backend expectations closely:
- `name` must be a non-empty trimmed string
- `sku` must be a non-empty trimmed string
- `price` must be a finite non-negative number
- `stock` must be a finite non-negative number
- `categoryId` must be selected
- `supplierId` must be selected

Validation should surface inline at the field level and block invalid submission.

## Submission Flows

### Create

- User visits `/products/new`
- Form starts with empty or sensible defaults
- On submit, app calls a create mutation through the BFF
- On success, invalidate product list queries and navigate to the created product detail route

### Edit

- User visits `/products/$productId/edit`
- Route loader hydrates existing product detail
- Form is initialized with the product values
- On submit, app calls an update mutation through the BFF
- On success, invalidate both list and detail queries and navigate back to that product detail route

## File Boundaries

- `src/features/products/form.ts` should hold form types, defaults, static option data, and validation helpers.
- `src/features/products/mutations.ts` should hold TanStack Query mutation options or mutation helpers for create and update.
- `src/features/products/ProductForm.tsx` should render the shared TanStack Form UI and delegate submit behavior through props.
- `src/routes/products/new.tsx` should own the create page.
- `src/routes/products/$productId/edit.tsx` should own the edit page.

This keeps route ownership separate from reusable form behavior.

## Teaching Goals

By the end of Session 5, the student should understand:
- why TanStack Form is different from local `useState` form wiring
- how `defaultValues` shape the form model
- how field validators work
- how submit state and errors are exposed
- how TanStack Form and TanStack Query cooperate during mutation flows
- how create and edit can share one form component while keeping route concerns separate

## Testing Strategy

Focused tests should cover:
- validation helpers
- create and update mutation request behavior
- shared form rendering and submit behavior
- route-level happy paths where practical

The backend test suite already covers the API contract, so this session should focus on the frontend form layer and mutation wiring.
