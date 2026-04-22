import { createFileRoute } from '@tanstack/react-router'
import { proxyProductsRequest } from '#/modules/products'
import { buildProxyRequestInit } from '#/modules/products'

export const Route = createFileRoute('/api/products/$productId')({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        return proxyProductsRequest(
          `/products/${params.productId}`,
          undefined,
          await buildProxyRequestInit(request),
        )
      },
      PATCH: async ({ params, request }) => {
        return proxyProductsRequest(
          `/products/${params.productId}`,
          undefined,
          await buildProxyRequestInit(request),
        )
      },
    },
  },
})
