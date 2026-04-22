import { createFileRoute } from '@tanstack/react-router'
import { EditProductPage, loadProductOr404 } from '#/modules/products'

export const Route = createFileRoute('/products/$productId/edit')({
  loader: ({ context, params }) =>
    loadProductOr404(context.queryClient, params.productId),
  component: EditProductRoute,
})

function EditProductRoute() {
  const { productId } = Route.useParams()
  const product = Route.useLoaderData()
  return <EditProductPage product={product} productId={productId} />
}
