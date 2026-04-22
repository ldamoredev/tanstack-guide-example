import { createFileRoute } from '@tanstack/react-router'
import {
  ProductsPage,
  hydrateProductsListQuery,
  validateProductsSearch,
} from '#/modules/products'

export const Route = createFileRoute('/products/')({
  validateSearch: validateProductsSearch,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) =>
    hydrateProductsListQuery(context.queryClient, deps),
  component: ProductsRoute,
})

function ProductsRoute() {
  const search = Route.useSearch()
  return <ProductsPage search={search} />
}
