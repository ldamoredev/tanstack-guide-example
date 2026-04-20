import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { ProductFilters } from './ProductFilters'
import { ProductTable } from './ProductTable'
import { productsListQueryOptions } from '../query/product.queries'
import { getCategoryLabel, validateProductsSearch } from '../model/search'
import type { ProductSortValue, ProductsSearch } from '../model/types'

interface ProductsPageProps {
  search: ProductsSearch
}

export function ProductsPage({ search }: ProductsPageProps) {
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
          <span className="lab-chip lab-chip--data">data-backed</span>
          <span className="lab-chip lab-chip--route">loader</span>
          <span className="lab-chip lab-chip--tooling">query</span>
          <span className="lab-chip lab-chip--route">search params</span>
        </div>
        <p className="island-kicker mb-2">Products</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Products control room
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          This is the main workspace for exploring filter orchestration, row
          scanning, loader hydration, TanStack Query cache behavior, and the
          BFF-backed data flow. It is the control room for the product area.
        </p>
        <Link
          to="/products/new"
          className="lab-button mt-5"
        >
          Create product
        </Link>
        <Link
          to="/products/virtual"
          search={search}
          className="lab-button lab-button-secondary mt-5 ml-3"
        >
          Virtualized catalog
        </Link>
        <Link
          to="/products/db"
          className="lab-button lab-button-secondary mt-5 ml-3"
        >
          DB live view
        </Link>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="matching rows"
          value={String(products.totalItems)}
          description="current query result set"
        />
        <MetricCard
          label="page window"
          value={`${products.page}/${products.totalPages}`}
          description="search params drive pagination"
        />
        <MetricCard
          label="active scope"
          value={search.category ? getCategoryLabel(search.category) : 'All categories'}
          description="category filter in effect"
        />
        <MetricCard
          label="sort mode"
          value={search.sort}
          description="scan order for the inspection grid"
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
