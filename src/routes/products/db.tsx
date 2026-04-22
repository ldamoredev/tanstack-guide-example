import { createFileRoute } from '@tanstack/react-router'
import { DbProductsPage } from '#/modules/products'

export const Route = createFileRoute('/products/db')({
  component: DbProductsRoute,
})

function DbProductsRoute() {
  const { queryClient } = Route.useRouteContext()
  return <DbProductsPage queryClient={queryClient} />
}
