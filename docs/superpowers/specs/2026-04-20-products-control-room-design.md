# Products Control Room Design

## Goal

Redesign the `Products` area so it feels like the app's main `dense data lab workspace` instead of a lightly skinned CRUD flow.

The redesign should:

- make the browse view feel like a control room for filtering, sorting, paging, and scanning
- make TanStack concepts more visible inside the UI, especially query state, loader-backed data flow, and mutation entry points
- make the detail page feel like an inspection surface within the same system
- make create and edit flows feel like deliberate mutation workspaces
- preserve the existing product data, route, validation, and submission logic

## Current Problems

The `Products` area already carries the app's most important dynamic behavior, but the UI does not emphasize that strongly enough.

- The browse page introduces the route correctly, but the layout still reads as a conventional page header followed by filters and a table.
- Filtering, sorting, paging, and scanning are all present, but they do not feel unified into one data workspace.
- The filter controls are functional but visually underpowered relative to their importance.
- The table is readable, but it does not yet feel like the app's primary inspection grid.
- The detail page looks like a generic record summary instead of a deeper inspection surface.
- The create and edit routes use the correct TanStack Form and Query behavior, but the UI still feels like plain CRUD forms rather than mutation-focused learning surfaces.

## Product Direction

The full `Products` area should be treated as one connected workspace with three modes:

- `Browse` as the control room
- `Detail` as the inspection surface
- `Create/Edit` as mutation workspaces

The key idea is continuity. The user should feel like they are moving deeper into the same system rather than navigating to unrelated pages that merely share some styles.

## Design Principles

- The list page should be the strongest TanStack learning surface in the app.
- Filtering, sorting, query-state visibility, and row scanning should all be first-class concerns.
- The UI should become denser, but not visually noisy.
- Supporting route context should clarify what the screen demonstrates without turning into documentation.
- Detail and form views should inherit the same visual language and information hierarchy as the browse view.
- This pass should stay UI-first and avoid changing the underlying data contracts.

## Experience Direction

The recommended direction is an `instrument panel` for the browse route.

That means:

- a stronger top command surface
- a more obvious data summary layer
- a scan-friendly table presentation
- compact but visible route/query/data cues
- action buttons that feel like entry points into related TanStack flows

The experience should feel like a technical workspace rather than a product catalog.

## Browse View Structure

The browse route should become the `control room` for the whole product area.

### 1. Context Header

The page header should still explain the route, but it should become more explicit about what this screen teaches.

It should include:

- the page title
- compact chips such as `Data-backed`, `Loader`, `Query`, and `Search params`
- a short explanation that this is the main route for observing TanStack data flow
- primary actions for create, virtualized view, and DB view

The header should feel like a route briefing, not just a marketing hero.

### 2. Command Surface

`ProductFilters` should evolve into a more deliberate command surface.

It should emphasize:

- search
- category scope
- sort mode
- page navigation
- a concise summary of the current result set

The controls should feel grouped and operational rather than simply stacked form fields.

### 3. Data Summary Layer

The browse screen should surface a compact summary row around the table and filters.

Suggested information:

- current page and total pages
- total matching records
- active category scope
- whether the view is standard, virtualized, or DB-oriented through nearby route actions

This layer should help make query/data-state visibility more legible without requiring extra backend work.

### 4. Table As Inspection Grid

`ProductTable` should feel more like a scanning grid than a generic white table wrapper.

The redesign should prioritize:

- rapid row scanning
- stronger column hierarchy
- better action affordances
- clearer active sort indicators
- better visual fit with the shared learning-lab shell

The table should remain behaviorally simple, but visually become the center of gravity on the page.

## Detail View

The detail route should become an `inspection panel`.

The goal is to make opening a single product feel like drilling into the same workspace rather than leaving it.

The detail page should emphasize:

- product identity and classification
- pricing and stock as separate operational readouts
- category and supplier context
- a compact explanation that this screen is using loader-backed detail data through the shared query cache
- a clear path into edit mode

The supporting cards should feel more technical and structured than generic content blocks.

## Create And Edit Views

The create and edit routes should be treated as `mutation workspaces`.

The current form logic already serves the learning goal well, so the redesign should focus on layout and framing instead of behavior changes.

The mutation views should emphasize:

- that the user is performing a state change
- that TanStack Form owns field state and validation
- that TanStack Query owns the mutation flow after submit
- grouped, readable form sections rather than one plain input grid
- a stronger action area that makes the submit path more deliberate

The create and edit screens should feel related to each other and clearly connected to the main browse workspace.

## Product Form Layout

`ProductForm` should likely gain a stronger information structure without changing the actual fields or rules.

Potential improvements in this pass:

- clearer grouping of identity fields vs inventory fields vs relationship fields
- better spacing and field framing
- stronger error and state visibility
- a more intentional submit area

This does not require changing validation semantics or form APIs.

## Scope

This redesign includes:

- `ProductsPage`
- `ProductFilters`
- `ProductTable`
- `ProductDetailPage`
- `NewProductPage`
- `EditProductPage`
- `ProductForm`, if needed to support the mutation-workspace layout

This redesign does not include:

- changes to loaders, queries, or search-param behavior
- backend or BFF changes
- validation-rule changes
- mutation-flow changes
- table feature expansion such as bulk actions or inline editing

## Testing Strategy

This is primarily a UI and framing redesign, so the testing focus should stay narrow and intentional.

Add or update tests only where they prove the new route framing and UI language:

- browse route surfaces the new control-room identity and learning cues
- detail route surfaces its inspection framing
- create/edit routes surface mutation-workspace framing

Do not rewrite existing behavior tests unless the UI structure requires it.

## Success Criteria

The redesign is successful when:

- the browse route clearly feels like the densest and most intentional TanStack workspace in the app
- filtering, sorting, query visibility, and record scanning all feel equally supported
- detail and form routes feel like supporting modes of the same system
- the user can tell at a glance why `Products` is the app's main dynamic learning surface
- the UI changes preserve the current data behavior

## Risks

- increasing density too much could make the browse route feel cluttered
- over-labeling TanStack concepts could make the UI feel like documentation instead of product
- visual inconsistency between browse, detail, and form views would weaken the workspace concept
- layout-only changes could accidentally obscure current affordances if hierarchy is not carefully rebuilt

## Risk Mitigation

- keep the visual density controlled through clear grouping and spacing
- use compact chips and short explanatory copy instead of large teaching blocks
- port one shared visual language across all three product modes
- preserve current interaction patterns while improving emphasis and hierarchy
