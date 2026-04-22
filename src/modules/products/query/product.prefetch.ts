import type { QueryClient } from '@tanstack/react-query'
import {
  productDetailQueryOptions,
  productsListQueryOptions,
} from './product.queries'
import {
  fetchProductByIdFromBff,
  fetchProductsFromBff,
} from '../server/bff'
import type {
  Product,
  ProductsListResponse,
  ProductsSearch,
} from '../model/types'

export function hydrateProductsListQuery(
  queryClient: QueryClient,
  search: ProductsSearch,
): Promise<ProductsListResponse> {
  const query = productsListQueryOptions(search)

  return queryClient.ensureQueryData({
    ...query,
    queryFn: () => fetchProductsFromBff(search),
  })
}

export function hydrateProductDetailQuery(
  queryClient: QueryClient,
  productId: string,
): Promise<Product> {
  const query = productDetailQueryOptions(productId)

  return queryClient.ensureQueryData({
    ...query,
    queryFn: () => fetchProductByIdFromBff(productId),
  })
}
