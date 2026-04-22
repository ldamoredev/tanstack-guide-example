import {
  parseProductsJsonResponse,
  toProductsNetworkError,
} from '../model/errors'
import type { ProductMutationInput } from '../model/form'
import { buildProductsListQueryParams } from '../model/search'
import type {
  Product,
  ProductsListResponse,
  ProductsSearch,
} from '../model/types'

const JSON_HEADERS = {
  accept: 'application/json',
}

const JSON_MUTATION_HEADERS = {
  ...JSON_HEADERS,
  'content-type': 'application/json',
}

export async function fetchProducts(
  search: ProductsSearch,
): Promise<ProductsListResponse> {
  try {
    const params = buildProductsListQueryParams(search)
    const response = await fetch(`/api/products?${params.toString()}`, {
      headers: JSON_HEADERS,
    })

    return await parseProductsJsonResponse<ProductsListResponse>(
      response,
      'products',
    )
  } catch (error) {
    throw toProductsNetworkError(error, 'products')
  }
}

export async function fetchProductById(productId: string): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      headers: JSON_HEADERS,
    })

    return await parseProductsJsonResponse<Product>(response, 'product')
  } catch (error) {
    throw toProductsNetworkError(error, 'product')
  }
}

export async function createProduct(
  input: ProductMutationInput,
): Promise<Product> {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: JSON_MUTATION_HEADERS,
      body: JSON.stringify(input),
    })

    return await parseProductsJsonResponse<Product>(response, 'product')
  } catch (error) {
    throw toProductsNetworkError(error, 'product')
  }
}

export async function updateProduct(
  productId: string,
  input: ProductMutationInput,
): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'PATCH',
      headers: JSON_MUTATION_HEADERS,
      body: JSON.stringify(input),
    })

    return await parseProductsJsonResponse<Product>(response, 'product')
  } catch (error) {
    throw toProductsNetworkError(error, 'product')
  }
}
