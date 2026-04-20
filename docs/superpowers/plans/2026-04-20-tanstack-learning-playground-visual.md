# TanStack Learning Playground Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the app UI from an inventory admin demo into a cohesive TanStack learning playground with a new shell, route framing, and shared visual system.

**Architecture:** Keep the current route structure and feature boundaries intact while rebuilding the shared shell and page framing layers. Establish the visual direction with AIDesigner first, then port the resulting design language into native TanStack Start components, shared styles, and existing route files.

**Tech Stack:** TanStack Start, TanStack Router, React 19, Tailwind CSS v4, Vitest, AIDesigner CLI/MCP workflow

---

## File Structure

### Existing files to modify

- `package.json`
  - Verify available scripts for testing and local preview during redesign work.
- `src/styles.css`
  - Replace the current inventory-oriented token system with a learning-playground visual system, shared shell utilities, and motion primitives.
- `src/routes/__root.tsx`
  - Update document title and keep the shared shell wired to the redesigned header and footer.
- `src/components/Header.tsx`
  - Rebuild the header into a learning-oriented navigation shell with grouped route cues.
- `src/components/Footer.tsx`
  - Reframe footer copy and supporting links to match the learning-playground identity.
- `src/routes/index.tsx`
  - Rebuild the home page into the main orientation surface for the app.
- `src/routes/dashboard.tsx`
  - Reframe the dashboard as a route-relationship and exploration overview.
- `src/routes/categories.tsx`
  - Reframe categories as an intentionally static reference screen.
- `src/routes/suppliers.tsx`
  - Reframe suppliers as an intentionally static reference screen.
- `src/modules/products/ui/ProductsPage.tsx`
  - Align the products page with the new shell and learning cues.
- `src/modules/products/ui/ProductTable.tsx`
  - Update the table surface styling so it matches the refreshed shell.

### New files to create

- `.aidesigner/mcp-latest.html`
  - Local HTML artifact captured from the latest AIDesigner run when generation succeeds.
- `docs/superpowers/plans/2026-04-20-tanstack-learning-playground-visual.md`
  - This implementation plan.

### Generated or tool-created outputs expected during implementation

- `.aidesigner/runs/<run-id>/...`
  - Captured AIDesigner run assets, previews, and adoption notes.

## Task 1: Establish the Design Reference With AIDesigner

**Files:**
- Modify: none
- Create: `.aidesigner/mcp-latest.html` via AIDesigner capture if generation succeeds
- Verify with: local CLI output for capture, preview, and adopt steps

- [x] **Step 1: Inspect the current visual shell and confirm AIDesigner is available**

Run:

```bash
ls -la .aidesigner
printenv | rg '^AIDESIGNER'
```

Expected:
- the repo-level `.aidesigner` directory exists
- either an AIDesigner auth variable is present, or the next step proves the helper can run through the connected environment

- [x] **Step 2: Try the local AIDesigner helper health check**

Run:

```bash
npx -y @aidesigner/agent-skills doctor
```

Expected:
- success output showing the helper is reachable, or a clear auth/setup error that identifies the next action

- [x] **Step 3: If AIDesigner is available, generate one visual direction for the learning playground**

Use a prompt equivalent to:

```text
TanStack Learning Playground for a personal learning app. Modern minimalist UI that mixes technical lab and playful interactive playground. Clear route relationships, visible learning/status cues, restrained cyan/teal accents, crisp panel structure, subtle motion, and a stronger orientation surface on the home page. Avoid business-dashboard framing. Keep it product-like, technical, and calm rather than flashy.
```

Expected:
- one coherent run id or a documented blocker if generation cannot proceed

- [x] **Step 4: Capture, preview, and analyze the AIDesigner run**

Run the equivalent capture, preview, and adopt steps if generation succeeds.

Expected:
- a saved local run under `.aidesigner/runs/<run-id>/`
- at least one preview artifact
- adoption notes to guide the real implementation

- [x] **Step 5: If AIDesigner is unavailable, stop and report the exact setup blocker before continuing**

Expected:
- a precise explanation of what needs to be connected or configured

## Task 2: Add Failing UI Tests For The New Learning-Playground Framing

**Files:**
- Modify: `/Users/lautarodamore/Documents/sample/src/modules/products/__tests__/flows.test.tsx` if it already hosts route rendering coverage, or create a new UI route test file if a cleaner location is obvious after inspection
- Test: route-level UI rendering expectations for the new shell copy and cues

- [x] **Step 1: Inspect the existing frontend test coverage for route rendering**

Run:

```bash
sed -n '1,260p' src/modules/products/__tests__/flows.test.tsx
rg -n "createRootRoute|render|ProductsPage|Dashboard|Home|Inventory Admin" src/modules/products/__tests__ src -g '*.test.ts' -g '*.test.tsx'
```

Expected:
- enough context to place the new assertions in the smallest useful test file

- [x] **Step 2: Write a failing test for the updated app framing**

Add assertions for behaviors such as:

```tsx
expect(screen.getByText(/TanStack Learning Playground/i)).toBeInTheDocument()
expect(screen.getByText(/personal learning app/i)).toBeInTheDocument()
expect(screen.getByText(/data-backed/i)).toBeInTheDocument()
expect(screen.getByText(/static/i)).toBeInTheDocument()
```

Expected:
- the new test describes the learning-playground framing before the UI is updated

- [x] **Step 3: Run the targeted test to verify it fails for the right reason**

Run:

```bash
pnpm test -- --runInBand src/modules/products/__tests__/flows.test.tsx
```

Expected:
- FAIL because the new copy and learning cues do not exist yet

## Task 3: Rebuild Shared Tokens And The Global Shell

**Files:**
- Modify: `src/styles.css`
- Modify: `src/routes/__root.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`

- [x] **Step 1: Replace the existing token system with the learning-playground visual tokens**

Add or replace CSS variables and utilities covering:

```css
:root {
  --bg-canvas: ...;
  --bg-panel: ...;
  --bg-panel-strong: ...;
  --fg-primary: ...;
  --fg-muted: ...;
  --accent: ...;
  --accent-strong: ...;
  --line-soft: ...;
  --line-strong: ...;
  --chip-static: ...;
  --chip-data: ...;
  --chip-route: ...;
  --chip-tooling: ...;
}
```

Expected:
- the global theme reads as a technical, calmer playground in light and dark modes

- [x] **Step 2: Add shared shell utility classes**

Create reusable classes for the refreshed shell, such as:

```css
.lab-shell { ... }
.lab-panel { ... }
.lab-grid { ... }
.lab-chip { ... }
.lab-chip--data { ... }
.lab-chip--static { ... }
.lab-chip--route { ... }
.lab-link { ... }
.page-hero { ... }
.page-eyebrow { ... }
```

Expected:
- route files can share one consistent language instead of hand-rolled per-page styling

- [x] **Step 3: Update the root document title and shared shell usage**

Change the root title to something like:

```tsx
{ title: 'TanStack Learning Playground' }
```

Expected:
- the browser title matches the new product identity

- [x] **Step 4: Rebuild the header as the global learning shell**

Implement:

```tsx
<header>
  <Link to="/">TanStack Learning Playground</Link>
  <nav>Overview / Routes / Data / Static / Tooling</nav>
  <ThemeToggle />
</header>
```

Expected:
- the header frames the app as a learning environment rather than an inventory tool

- [x] **Step 5: Reframe the footer copy**

Use footer language similar to:

```tsx
<p>Personal TanStack learning playground for routes, loaders, query flows, and experiments.</p>
```

Expected:
- the footer reinforces the same identity as the shell

- [x] **Step 6: Run the targeted test again to verify the new shell copy starts satisfying the new expectations**

Run:

```bash
pnpm test -- --runInBand src/modules/products/__tests__/flows.test.tsx
```

Expected:
- either PASS or a smaller remaining failure focused on route-level pages still pending

## Task 4: Rebuild The Home And Dashboard Orientation Surfaces

**Files:**
- Modify: `src/routes/index.tsx`
- Modify: `src/routes/dashboard.tsx`

- [x] **Step 1: Update the home route into an orientation-first landing page**

Implement sections that cover:

```tsx
<section>
  <h1>TanStack Learning Playground</h1>
  <p>Personal space for learning routes, query flows, loaders, and UI structure.</p>
</section>
<section>{/* route map / learning areas */}</section>
<section>{/* what is static vs data-backed */}</section>
<section>{/* explore next */}</section>
```

Expected:
- the landing page explains the app and where to go next

- [x] **Step 2: Update the dashboard into a route-relationship view**

Implement cards or panels that describe:

```tsx
[
  { title: 'Overview', label: 'Route framing', next: '/' },
  { title: 'Products', label: 'Data-backed', next: '/products' },
  { title: 'Categories', label: 'Static', next: '/categories' },
  { title: 'Suppliers', label: 'Static', next: '/suppliers' },
]
```

Expected:
- the dashboard acts as a map of the project instead of an operations placeholder

- [x] **Step 3: Run the targeted test again and confirm any home/dashboard assertions pass**

Run:

```bash
pnpm test -- --runInBand src/modules/products/__tests__/flows.test.tsx
```

Expected:
- the route-framing assertions for the shell, home, and dashboard now pass

## Task 5: Align Static And Data-Backed Screens With The New Shell

**Files:**
- Modify: `src/routes/categories.tsx`
- Modify: `src/routes/suppliers.tsx`
- Modify: `src/modules/products/ui/ProductsPage.tsx`
- Modify: `src/modules/products/ui/ProductTable.tsx`

- [x] **Step 1: Reframe categories as an intentional static contrast screen**

Use copy equivalent to:

```tsx
<p>This route stays static on purpose so it can contrast with the app's data-backed flows.</p>
```

Expected:
- the page teaches why it exists

- [x] **Step 2: Reframe suppliers with the same static-learning language**

Use copy equivalent to:

```tsx
<p>Static reference surface for comparing simple route rendering with more dynamic areas.</p>
```

Expected:
- the page feels deliberate rather than unfinished

- [x] **Step 3: Add learning cues to the products page without redesigning the workflow deeply**

Use labels or supporting copy equivalent to:

```tsx
<span>Data-backed</span>
<span>Query</span>
<span>Loader</span>
<p>The main route for exploring URL params, loader hydration, and BFF-backed data flow.</p>
```

Expected:
- products is clearly marked as the app's main dynamic example

- [x] **Step 4: Refresh the product table surface to match the new shell**

Keep behavior intact while updating:

```tsx
<section className="lab-panel ...">
```

Expected:
- the data table looks native to the new design system

- [x] **Step 5: Run the targeted test and any newly added assertions for static/data-backed cues**

Run:

```bash
pnpm test -- --runInBand src/modules/products/__tests__/flows.test.tsx
```

Expected:
- PASS for the updated learning-playground copy and cue assertions

## Task 6: Verify The Full Redesign Build

**Files:**
- Modify: any of the files above as needed for final fixes

- [x] **Step 1: Run the focused frontend tests**

Run:

```bash
pnpm test -- --runInBand src/modules/products/__tests__/flows.test.tsx
```

Expected:
- PASS

- [x] **Step 2: Run the full test suite**

Run:

```bash
pnpm test
```

Expected:
- PASS across the existing suite, or a precise list of unrelated pre-existing failures

- [x] **Step 3: Run the production build**

Run:

```bash
pnpm build
```

Expected:
- successful production build

- [x] **Step 4: Commit the implementation**

Run:

```bash
git add src/styles.css src/routes/__root.tsx src/components/Header.tsx src/components/Footer.tsx src/routes/index.tsx src/routes/dashboard.tsx src/routes/categories.tsx src/routes/suppliers.tsx src/modules/products/ui/ProductsPage.tsx src/modules/products/ui/ProductTable.tsx docs/superpowers/plans/2026-04-20-tanstack-learning-playground-visual.md .aidesigner
git commit -m "Refresh app as TanStack learning playground"
```

Expected:
- one commit containing the UI refresh and its supporting plan/artifacts

## Self-Review

### Spec coverage

- shared shell refresh is covered in Task 3
- home, dashboard, categories, suppliers, and products framing are covered in Tasks 4 and 5
- AIDesigner-first workflow is covered in Task 1
- verification is covered in Task 6

### Placeholder scan

- no `TBD`, `TODO`, or deferred implementation notes remain
- each task names exact files and exact verification commands

### Type consistency

- the plan keeps the existing route/module structure intact
- all new class names and shell concepts are introduced consistently across the tasks
