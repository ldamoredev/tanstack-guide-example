import { parseProductsJsonResponse } from '../model/errors'
import { buildProductsListQueryParams } from '../model/search'
import type {
  Product,
  ProductsListResponse,
  ProductsSearch,
} from '../model/types'
import { getProductResponse, listProductsResponse } from './catalog'

export async function fetchProductsFromBff(
  search: ProductsSearch,
): Promise<ProductsListResponse> {
  const response = listProductsResponse(buildProductsListQueryParams(search))

  return parseProductsJsonResponse<ProductsListResponse>(response, 'products')
}

export async function fetchProductByIdFromBff(
  productId: string,
): Promise<Product> {
  const response = getProductResponse(productId)

  return parseProductsJsonResponse<Product>(response, 'product')
}
