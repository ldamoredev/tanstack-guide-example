import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  getLocalizedCategoryLabel,
  getLocalizedSortLabel,
  useI18n,
} from '#/lib/i18n'
import { ProductFilters } from './ProductFilters'
import { ProductTable } from './ProductTable'
import { productsListQueryOptions } from '../query/product.queries'
import { validateProductsSearch } from '../model/search'
import type { ProductSortValue, ProductsSearch } from '../model/types'

interface ProductsPageProps {
  search: ProductsSearch
}

export function ProductsPage({ search }: ProductsPageProps) {
  const { copy, locale } = useI18n()
  const navigate = useNavigate({ from: '/products/' })
  const productsQuery = useSuspenseQuery(productsListQueryOptions(search))
  const products = productsQuery.data

  function updateSort(currentSort: ProductSortValue, key: 'name' | 'price' | 'stock') {
    navigate({
      search: (prev) =>
        validateProductsSearch({
          ...prev,
          sort: getNextSort(currentSort, key),
        }),
    })
  }

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--data">{copy.products.chips.dataBacked}</span>
          <span className="lab-chip lab-chip--route">{copy.products.chips.loader}</span>
          <span className="lab-chip lab-chip--tooling">{copy.products.chips.query}</span>
          <span className="lab-chip lab-chip--route">{copy.products.chips.searchParams}</span>
        </div>
        <p className="island-kicker mb-2">Products</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.products.overview.title}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.products.overview.description}
        </p>
        <Link
          to="/products/new"
          className="lab-button mt-5"
        >
          {copy.products.overview.create}
        </Link>
        <Link
          to="/products/virtual"
          search={search}
          className="lab-button lab-button-secondary mt-5 ml-3"
        >
          {copy.products.overview.virtual}
        </Link>
        <Link
          to="/products/db"
          className="lab-button lab-button-secondary mt-5 ml-3"
        >
          {copy.products.overview.db}
        </Link>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label={copy.products.overview.metrics.matchingRows}
          value={String(products.totalItems)}
          description={copy.products.overview.metrics.currentResultSet}
        />
        <MetricCard
          label={copy.products.overview.metrics.pageWindow}
          value={`${products.page}/${products.totalPages}`}
          description={copy.products.overview.metrics.pagination}
        />
        <MetricCard
          label={copy.products.overview.metrics.activeScope}
          value={getLocalizedCategoryLabel(search.category, locale)}
          description={copy.products.overview.metrics.categoryFilter}
        />
        <MetricCard
          label={copy.products.overview.metrics.sortMode}
          value={getLocalizedSortLabel(search.sort, locale)}
          description={copy.products.overview.metrics.inspectionGrid}
        />
      </section>

      <ProductFilters
        products={products}
        search={search}
        onSearchChange={(nextValue) =>
          navigate({
            search: (prev) =>
              validateProductsSearch({
                ...prev,
                q: nextValue,
                page: 1,
              }),
          })
        }
        onCategoryChange={(nextValue) =>
          navigate({
            search: (prev) =>
              validateProductsSearch({
                ...prev,
                category: nextValue,
                page: 1,
              }),
          })
        }
        onSortChange={(nextValue) =>
          navigate({
            search: (prev) =>
              validateProductsSearch({
                ...prev,
                sort: nextValue,
              }),
          })
        }
        onPageChange={(nextValue) =>
          navigate({
            search: (prev) =>
              validateProductsSearch({
                ...prev,
                page: nextValue,
              }),
          })
        }
      />

      <ProductTable
        data={products.data}
        activeSort={search.sort}
        onSortToggle={(key) => updateSort(search.sort, key)}
      />
    </main>
  )
}

function getNextSort(
  currentSort: ProductSortValue,
  key: 'name' | 'price' | 'stock',
): ProductSortValue {
  const asc = `${key}-asc` as ProductSortValue
  const desc = `${key}-desc` as ProductSortValue

  return currentSort === asc ? desc : asc
}

function MetricCard({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <article className="feature-card rounded-2xl p-5">
      <p className="island-kicker mb-2">{label}</p>
      <p className="mb-2 text-xl font-semibold text-[var(--sea-ink)]">{value}</p>
      <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
        {description}
      </p>
    </article>
  )
}
