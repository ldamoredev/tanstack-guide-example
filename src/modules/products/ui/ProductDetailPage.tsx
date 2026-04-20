import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, Outlet, useMatchRoute } from '@tanstack/react-router'
import { productDetailQueryOptions } from '../query/product.queries'
import { getCategoryLabel } from '../model/search'

interface ProductDetailPageProps {
  productId: string
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
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
          <span className="lab-chip lab-chip--route">inspection</span>
          <span className="lab-chip lab-chip--data">detail route</span>
          <span className="lab-chip lab-chip--tooling">shared query cache</span>
        </div>
        <p className="island-kicker mb-2">Product Detail</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Product inspection: {product.name}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          This inspection surface loads backend-backed product data through the
          BFF layer, with the loader and component sharing the same shared query
          cache entry.
        </p>
        <Link
          to="/products/$productId/edit"
          params={{ productId: product.id }}
          className="lab-button mt-5"
        >
          Edit product
        </Link>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {[
          [
            'Identity',
            `${getCategoryLabel(product.categoryId)} category · SKU ${product.sku}`,
          ],
          ['Pricing', `$${product.price.toFixed(2)} current list price for this record.`],
          ['Stock', `${product.stock} units currently available in the inspection view.`],
          ['Relationships', `Primary supplier id ${product.supplierId}.`],
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
