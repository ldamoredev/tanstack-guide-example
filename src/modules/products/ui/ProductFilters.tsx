import { DebouncedSearchInput } from './DebouncedSearchInput'
import { CATEGORY_OPTIONS, SORT_OPTIONS } from '../model/search'
import {
  getLocalizedCategoryLabel,
  getLocalizedSortLabel,
  useI18n,
} from '#/lib/i18n'
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
  const { copy, locale } = useI18n()
  const activeCategory = getLocalizedCategoryLabel(search.category, locale)
  const activeSort = getLocalizedSortLabel(search.sort, locale)

  return (
    <section className="island-shell mt-6 rounded-2xl p-4 sm:mt-8 sm:p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="island-kicker mb-2">{copy.products.filters.kicker}</p>
          <h2 className="m-0 text-xl font-semibold text-[var(--sea-ink)]">
            {copy.products.filters.title}
          </h2>
          <p className="mt-2 mb-0 max-w-2xl text-sm leading-7 text-[var(--sea-ink-soft)]">
            {copy.products.filters.description}
          </p>
        </div>
        <div className="grid w-full gap-2 sm:min-w-[260px] sm:grid-cols-2 lg:w-auto">
          <SummaryChip
            label={copy.products.filters.labels.category}
            value={activeCategory}
          />
          <SummaryChip
            label={copy.products.filters.labels.page}
            value={`${products.page} / ${products.totalPages}`}
          />
          <SummaryChip
            label={copy.products.filters.labels.rows}
            value={String(products.totalItems)}
          />
          <SummaryChip
            label={copy.products.filters.labels.sort}
            value={activeSort}
          />
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.35fr_0.85fr_0.85fr_0.65fr]">
        <DebouncedSearchInput value={search.q} onApplySearch={onSearchChange} />

        <label className="lab-field-label">
          {copy.products.filters.labels.category}
          <div className="lab-select-wrap">
            <select
              value={search.category}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="lab-field lab-field--select"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value || 'all'} value={option.value}>
                  {getLocalizedCategoryLabel(option.value, locale)}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="lab-field-label">
          {copy.products.filters.labels.sort}
          <div className="lab-select-wrap">
            <select
              value={search.sort}
              onChange={(event) => onSortChange(event.target.value)}
              className="lab-field lab-field--select"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {getLocalizedSortLabel(option.value, locale)}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="lab-field-label">
          {copy.products.filters.labels.page}
          <input
            type="number"
            min="1"
            value={String(search.page)}
            onChange={(event) => onPageChange(event.target.value)}
            className="lab-field"
          />
        </label>
      </div>

      <p className="mt-4 mb-0 text-sm text-[var(--sea-ink-soft)]">
        {copy.products.filters.pageSummary(
          products.page,
          products.totalPages,
          products.totalItems,
        )}
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
