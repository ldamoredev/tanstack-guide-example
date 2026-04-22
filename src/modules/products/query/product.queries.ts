import { queryOptions } from '@tanstack/react-query'
import { fetchProductById, fetchProducts } from '../api/client'
import type { ProductsSearch } from '../model/types'

export function productsListQueryOptions(search: ProductsSearch) {
  return queryOptions({
    queryKey: ['products', search] as const,
    queryFn: () => fetchProducts(search),
  })
}

export function productDetailQueryOptions(productId: string) {
  return queryOptions({
    queryKey: ['products', productId] as const,
    queryFn: () => fetchProductById(productId),
  })
}
