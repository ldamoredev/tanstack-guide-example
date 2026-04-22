import { useRef } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Link } from '@tanstack/react-router'
import {
  formatUsdCurrency,
  getLocalizedCategoryLabel,
  useI18n,
} from '#/lib/i18n'
import { productsListQueryOptions } from '../query/product.queries'
import { buildVirtualProductRows } from '../lib/virtual'
import type { ProductsSearch } from '../model/types'

interface VirtualProductsPageProps {
  search: ProductsSearch
}

export function VirtualProductsPage({ search }: VirtualProductsPageProps) {
  const { copy, locale } = useI18n()
  const productsQuery = useSuspenseQuery(productsListQueryOptions(search))
  const rows = buildVirtualProductRows(productsQuery.data.data, 1000)
  const parentRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 8,
  })

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <p className="island-kicker mb-2">{copy.products.virtual.kicker}</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.products.virtual.title}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.products.virtual.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/products"
            search={search}
            className="inline-flex rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)] no-underline"
          >
            {copy.products.virtual.back}
          </Link>
          <p className="m-0 self-center text-sm text-[var(--sea-ink-soft)]">
            {copy.products.virtual.querySource(productsQuery.data.data.length, rows.length)}
          </p>
        </div>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-5">
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 border-b border-[var(--line)] pb-3 text-sm font-semibold text-[var(--sea-ink)]">
          <span>{copy.products.table.header.product}</span>
          <span>SKU</span>
          <span>{copy.products.table.header.category}</span>
          <span>{copy.products.table.header.price}</span>
          <span>{copy.products.virtual.row}</span>
        </div>

        <div
          ref={parentRef}
          className="mt-3 overflow-auto rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--surface-strong)_84%,transparent_16%)]"
          style={{ height: '560px' }}
        >
          <div
            style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index]

              return (
                <div
                  key={row.virtualId}
                  className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 border-b border-[var(--line)] px-4 py-4 text-sm text-[var(--sea-ink-soft)] odd:bg-[var(--surface-strong)] even:bg-[color-mix(in_oklab,var(--surface)_95%,var(--lagoon)_5%)]"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <Link
                    to="/products/$productId"
                    params={{ productId: row.sourceId }}
                    search={search}
                    className="font-semibold text-[var(--sea-ink)] no-underline"
                  >
                    {row.name}
                  </Link>
                  <span>{row.sku}</span>
                  <span>
                    {getLocalizedCategoryLabel(row.categoryId, locale)}
                  </span>
                  <span>{formatUsdCurrency(row.price, locale)}</span>
                  <span className="font-mono text-xs text-[var(--sea-ink-soft)]">
                    #{row.sourceIndex}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
