import { createFileRoute } from '@tanstack/react-router'
import {
  createProductResponse,
  listProductsResponse,
} from '#/modules/products/server/catalog'

export const Route = createFileRoute('/api/products')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const requestUrl = new URL(request.url)
        return listProductsResponse(requestUrl.searchParams)
      },
      POST: async ({ request }) => {
        return createProductResponse(request)
      },
    },
  },
})
