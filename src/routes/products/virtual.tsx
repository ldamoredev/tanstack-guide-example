import { createFileRoute } from '@tanstack/react-router'
import {
  VirtualProductsPage,
  hydrateProductsListQuery,
  validateProductsSearch,
} from '#/modules/products'

export const Route = createFileRoute('/products/virtual')({
  validateSearch: validateProductsSearch,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) =>
    hydrateProductsListQuery(context.queryClient, deps),
  component: VirtualProductsRoute,
})

function VirtualProductsRoute() {
  const search = Route.useSearch()
  return <VirtualProductsPage search={search} />
}
