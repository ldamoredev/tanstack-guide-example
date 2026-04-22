import { createCollection } from '@tanstack/react-db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import type { QueryClient } from '@tanstack/react-query'
import { updateProduct } from '../api/client'
import { DEFAULT_PRODUCTS_SEARCH } from '../model/search'
import type { Product, ProductsListResponse } from '../model/types'

export function createProductCollection(queryClient: QueryClient) {
  return createCollection(
    queryCollectionOptions({
      queryKey: ['products', 'db'] as const,
      queryFn: () => fetchAllProducts(),
      select: (response: ProductsListResponse) => response.data,
      queryClient,
      getKey: (product: Product) => product.id,
      onUpdate: async ({ transaction }) => {
        await Promise.all(
          transaction.mutations.map(async (mutation) => {
            await updateProduct(mutation.original.id, {
              name: mutation.modified.name,
              sku: mutation.modified.sku,
              price: mutation.modified.price,
              stock: mutation.modified.stock,
              categoryId: mutation.modified.categoryId,
              supplierId: mutation.modified.supplierId,
            })

            await queryClient.invalidateQueries({
              queryKey: ['products'],
            })
            await queryClient.invalidateQueries({
              queryKey: ['products', mutation.original.id],
            })
          }),
        )
      },
    }),
  )
}

async function fetchAllProducts(): Promise<ProductsListResponse> {
  const response = await fetch(
    `/api/products?sort=${DEFAULT_PRODUCTS_SEARCH.sort}&page=1`,
    {
      headers: {
        accept: 'application/json',
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to load products for the DB collection')
  }

  return response.json()
}
