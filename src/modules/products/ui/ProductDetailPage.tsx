import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, Outlet, useMatchRoute } from '@tanstack/react-router'
import {
  formatUsdCurrency,
  getLocalizedCategoryLabel,
  useI18n,
} from '#/lib/i18n'
import { productDetailQueryOptions } from '../query/product.queries'

interface ProductDetailPageProps {
  productId: string
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const { copy, locale } = useI18n()
  const matchRoute = useMatchRoute()
  const productQuery = useSuspenseQuery(productDetailQueryOptions(productId))
  const product = productQuery.data
  const isEditing = Boolean(
    matchRoute({
      to: '/products/$productId/edit',
      params: { productId },
      fuzzy: false,
    }),
  )

  if (isEditing) {
    return <Outlet />
  }

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--route">{copy.products.chips.inspection}</span>
          <span className="lab-chip lab-chip--data">{copy.products.chips.detailRoute}</span>
          <span className="lab-chip lab-chip--tooling">{copy.products.chips.sharedQueryCache}</span>
        </div>
        <p className="island-kicker mb-2">{copy.products.detail.kicker}</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.products.detail.title(product.name)}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.products.detail.description}
        </p>
        <Link
          to="/products/$productId/edit"
          params={{ productId: product.id }}
          className="lab-button mt-5"
        >
          {copy.products.detail.edit}
        </Link>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {[
          [
            copy.products.detail.cards.identity,
            copy.products.detail.cards.identityText(
              getLocalizedCategoryLabel(product.categoryId, locale),
              product.sku,
            ),
          ],
          [
            copy.products.detail.cards.pricing,
            copy.products.detail.cards.pricingText(
              formatUsdCurrency(product.price, locale),
            ),
          ],
          [
            copy.products.detail.cards.stock,
            copy.products.detail.cards.stockText(product.stock),
          ],
          [
            copy.products.detail.cards.relationships,
            copy.products.detail.cards.relationshipsText(product.supplierId),
          ],
        ].map(([title, description]) => (
          <article key={title} className="feature-card rounded-2xl p-5">
            <p className="island-kicker mb-2">{title}</p>
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
              {title}
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {description}
            </p>
          </article>
        ))}
      </section>
    </main>
  )
}
