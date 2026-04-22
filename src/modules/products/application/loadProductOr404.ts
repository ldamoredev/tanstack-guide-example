import type { QueryClient } from '@tanstack/react-query'
import { notFound } from '@tanstack/react-router'
import { ProductNotFoundError } from '../model/errors'
import { hydrateProductDetailQuery } from '../query/product.prefetch'

export async function loadProductOr404(
  queryClient: QueryClient,
  productId: string,
) {
  try {
    return await hydrateProductDetailQuery(queryClient, productId)
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      throw notFound()
    }

    throw error
  }
}
