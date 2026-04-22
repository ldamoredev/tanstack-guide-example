import { createFileRoute } from '@tanstack/react-router'
import { ProductDetailPage, loadProductOr404 } from '#/modules/products'

export const Route = createFileRoute('/products/$productId')({
  loader: ({ context, params }) =>
    loadProductOr404(context.queryClient, params.productId),
  component: ProductDetailRoute,
})

function ProductDetailRoute() {
  const { productId } = Route.useParams()
  return <ProductDetailPage productId={productId} />
}
