import { createFileRoute } from '@tanstack/react-router'
import { proxyProductsRequest } from '#/modules/products'
import { buildProxyRequestInit } from '#/modules/products'

export const Route = createFileRoute('/api/products')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const requestUrl = new URL(request.url)
        return proxyProductsRequest(
          '/products',
          requestUrl.searchParams,
          await buildProxyRequestInit(request),
        )
      },
      POST: async ({ request }) => {
        return proxyProductsRequest(
          '/products',
          undefined,
          await buildProxyRequestInit(request),
        )
      },
    },
  },
})
