import { useState } from 'react'
import { gt, not, useLiveQuery } from '@tanstack/react-db'
import { Link } from '@tanstack/react-router'
import { getLocalizedCategoryLabel, useI18n } from '#/lib/i18n'
import { createProductCollection } from '../db/product.collection'
import { LOW_STOCK_THRESHOLD, buildStockAdjustmentInput } from '../model/db'
import { DEFAULT_PRODUCTS_SEARCH } from '../model/search'
import type { QueryClient } from '@tanstack/react-query'

interface DbProductsPageProps {
  queryClient: QueryClient
}

export function DbProductsPage({ queryClient }: DbProductsPageProps) {
  const { copy, locale } = useI18n()
  const [showLowStockOnly, setShowLowStockOnly] = useState(true)
  const [productCollection] = useState(() =>
    createProductCollection(queryClient),
  )
  const {
    data: products,
    isLoading,
    isError,
  } = useLiveQuery(
    (q) => {
      const query = q
        .from({ product: productCollection })
        .orderBy(({ product }) => product.stock, 'asc')

      return showLowStockOnly
        ? query.where(({ product }) =>
            not(gt(product.stock, LOW_STOCK_THRESHOLD)),
          )
        : query
    },
    [productCollection, showLowStockOnly],
  )

  const visibleProducts = products ?? []

  return (
    <main className="page-wrap px-3 py-8 sm:px-4 sm:py-12">
      <section className="island-shell rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-8">
        <p className="island-kicker mb-2">{copy.products.db.kicker}</p>
        <h1 className="display-title mb-3 text-3xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.products.db.title}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.products.db.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/products"
            search={DEFAULT_PRODUCTS_SEARCH}
            className="inline-flex rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)] no-underline"
          >
            {copy.products.db.back}
          </Link>
          <button
            type="button"
            onClick={() => setShowLowStockOnly((current) => !current)}
            className="inline-flex rounded-full border border-[rgba(16,72,87,0.18)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-semibold text-[var(--sea-ink)]"
          >
            {showLowStockOnly
              ? copy.products.db.showAll
              : copy.products.db.showLowStockOnly}
          </button>
        </div>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-5">
        <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
          {copy.products.db.threshold(
            LOW_STOCK_THRESHOLD,
            visibleProducts.length,
          )}
        </p>
      </section>

      <section className="mt-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] shadow-[0_18px_45px_rgba(30,90,72,0.08)]">
        {isLoading ? (
          <p className="m-0 px-5 py-6 text-sm text-[var(--sea-ink-soft)]">
            {copy.products.db.loading}
          </p>
        ) : isError ? (
          <p className="m-0 px-5 py-6 text-sm text-[var(--sea-ink-soft)]">
            {copy.products.db.error}
          </p>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full border-collapse">
                <thead className="bg-[rgba(79,184,178,0.1)]">
                  <tr>
                    <th className="border-b border-[var(--line)] px-4 py-3 text-left text-sm font-semibold text-[var(--sea-ink)]">
                      {copy.products.table.header.product}
                    </th>
                    <th className="border-b border-[var(--line)] px-4 py-3 text-left text-sm font-semibold text-[var(--sea-ink)]">
                      {copy.products.table.header.category}
                    </th>
                    <th className="border-b border-[var(--line)] px-4 py-3 text-left text-sm font-semibold text-[var(--sea-ink)]">
                      {copy.products.table.header.stock}
                    </th>
                    <th className="border-b border-[var(--line)] px-4 py-3 text-left text-sm font-semibold text-[var(--sea-ink)]">
                      {copy.products.db.action}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="odd:bg-[var(--surface-strong)] even:bg-[color-mix(in_oklab,var(--surface)_95%,var(--lagoon)_5%)]"
                    >
                      <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--sea-ink-soft)]">
                        <Link
                          to="/products/$productId"
                          params={{ productId: product.id }}
                          className="font-semibold text-[var(--sea-ink)] no-underline"
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--sea-ink-soft)]">
                        {getLocalizedCategoryLabel(product.categoryId, locale)}
                      </td>
                      <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--sea-ink-soft)]">
                        {product.stock}
                      </td>
                      <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--sea-ink-soft)]">
                        <button
                          type="button"
                          onClick={() => {
                            const next = buildStockAdjustmentInput(product, 5)
                            productCollection.update(product.id, (draft) => {
                              draft.stock = next.stock
                            })
                          }}
                          className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-3 py-2 text-xs font-semibold text-[var(--lagoon-deep)]"
                        >
                          {copy.products.db.addStock}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 p-4 md:hidden">
              {visibleProducts.map((product) => (
                <article
                  key={product.id}
                  className="mobile-data-card rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--surface-strong)_88%,var(--lagoon)_12%)] p-4"
                >
                  <Link
                    to="/products/$productId"
                    params={{ productId: product.id }}
                    className="font-semibold text-[var(--sea-ink)] no-underline"
                  >
                    {product.name}
                  </Link>
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="lab-note">
                        {copy.products.table.header.category}
                      </dt>
                      <dd className="m-0 text-[var(--sea-ink)]">
                        {getLocalizedCategoryLabel(product.categoryId, locale)}
                      </dd>
                    </div>
                    <div>
                      <dt className="lab-note">
                        {copy.products.table.header.stock}
                      </dt>
                      <dd className="m-0 text-[var(--sea-ink)]">
                        {product.stock}
                      </dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => {
                      const next = buildStockAdjustmentInput(product, 5)
                      productCollection.update(product.id, (draft) => {
                        draft.stock = next.stock
                      })
                    }}
                    className="mt-4 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-3 py-2 text-xs font-semibold text-[var(--lagoon-deep)]"
                  >
                    {copy.products.db.addStock}
                  </button>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
