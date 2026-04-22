import { createFileRoute } from '@tanstack/react-router'
import {
  getProductResponse,
  updateProductResponse,
} from '#/modules/products/server/catalog'

export const Route = createFileRoute('/api/products/$productId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        return getProductResponse(params.productId)
      },
      PATCH: async ({ params, request }) => {
        return updateProductResponse(params.productId, request)
      },
    },
  },
})
