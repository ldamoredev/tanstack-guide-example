import { DebouncedSearchInput } from './DebouncedSearchInput'
import {
  CATEGORY_OPTIONS,
  SORT_OPTIONS,
} from '../model/search'
import type { ProductsListResponse, ProductsSearch } from '../model/types'

interface ProductFiltersProps {
  products: ProductsListResponse
  search: ProductsSearch
  onSearchChange: (nextValue: string) => void
  onCategoryChange: (nextValue: string) => void
  onSortChange: (nextValue: string) => void
  onPageChange: (nextValue: string) => void
}

export function ProductFilters({
  products,
  search,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onPageChange,
}: ProductFiltersProps) {
  const activeCategory =
    CATEGORY_OPTIONS.find((option) => option.value === search.category)?.label ??
    'All categories'

  return (
    <section className="island-shell mt-8 rounded-2xl p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="island-kicker mb-2">Command surface</p>
          <h2 className="m-0 text-xl font-semibold text-[var(--sea-ink)]">
            Tune the browse state before you scan the grid.
          </h2>
          <p className="mt-2 mb-0 max-w-2xl text-sm leading-7 text-[var(--sea-ink-soft)]">
            Search, category scope, sort mode, and page controls all feed the
            same loader and query-driven list. This panel keeps the browse state
            visible instead of hiding it behind the table.
          </p>
        </div>
        <div className="grid gap-2 sm:min-w-[260px] sm:grid-cols-2">
          <SummaryChip label="category" value={activeCategory} />
          <SummaryChip label="page" value={`${products.page} / ${products.totalPages}`} />
          <SummaryChip label="rows" value={String(products.totalItems)} />
          <SummaryChip label="sort" value={search.sort} />
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.35fr_0.85fr_0.85fr_0.65fr]">
        <DebouncedSearchInput value={search.q} onApplySearch={onSearchChange} />

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--sea-ink)]">
          Category
          <select
            value={search.category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm font-normal text-[var(--sea-ink)] outline-none"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--sea-ink)]">
          Sort
          <select
            value={search.sort}
            onChange={(event) => onSortChange(event.target.value)}
            className="rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm font-normal text-[var(--sea-ink)] outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--sea-ink)]">
          Page
          <input
            type="number"
            min="1"
            value={String(search.page)}
            onChange={(event) => onPageChange(event.target.value)}
            className="rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm font-normal text-[var(--sea-ink)] outline-none"
          />
        </label>
      </div>

      <p className="mt-4 mb-0 text-sm text-[var(--sea-ink-soft)]">
        Showing page {products.page} of {products.totalPages} with{' '}
        {products.totalItems} matching products.
      </p>
    </section>
  )
}

function SummaryChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--surface)_78%,transparent_22%)] px-4 py-3">
      <p className="island-kicker mb-2">{label}</p>
      <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">{value}</p>
    </div>
  )
}
