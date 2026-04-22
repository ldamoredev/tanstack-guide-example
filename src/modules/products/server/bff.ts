import { buildBackendUrl } from '#/server/backend'
import {
  parseProductsJsonResponse,
  toProductsNetworkError,
} from '../model/errors'
import { buildProductsListQueryParams } from '../model/search'
import type {
  Product,
  ProductsListResponse,
  ProductsSearch,
} from '../model/types'

const JSON_HEADERS = {
  accept: 'application/json',
}

export async function fetchProductsFromBackend(
  search: ProductsSearch,
): Promise<ProductsListResponse> {
  try {
    const response = await fetch(
      buildBackendUrl('/products', buildProductsListQueryParams(search)),
      {
        headers: JSON_HEADERS,
      },
    )

    return await parseProductsJsonResponse<ProductsListResponse>(
      response,
      'products',
    )
  } catch (error) {
    throw toProductsNetworkError(error, 'products')
  }
}

export async function fetchProductsFromBff(
  search: ProductsSearch,
): Promise<ProductsListResponse> {
  const response = await proxyProductsRequest(
    '/products',
    buildProductsListQueryParams(search),
  )

  return parseProductsJsonResponse<ProductsListResponse>(response, 'products')
}

export async function fetchProductByIdFromBackend(
  productId: string,
): Promise<Product> {
  try {
    const response = await fetch(buildBackendUrl(`/products/${productId}`), {
      headers: JSON_HEADERS,
    })

    return await parseProductsJsonResponse<Product>(response, 'product')
  } catch (error) {
    throw toProductsNetworkError(error, 'product')
  }
}

export async function fetchProductByIdFromBff(productId: string): Promise<Product> {
  const response = await proxyProductsRequest(`/products/${productId}`)

  return parseProductsJsonResponse<Product>(response, 'product')
}

export async function proxyProductsRequest(
  pathname: string,
  searchParams?: URLSearchParams,
  init?: RequestInit,
): Promise<Response> {
  try {
    const upstream = await fetch(buildBackendUrl(pathname, searchParams), {
      ...init,
      headers: buildProxyHeaders(init?.headers),
    })

    return new Response(upstream.body, {
      status: upstream.status,
      headers: new Headers(upstream.headers),
    })
  } catch {
    return Response.json(
      {
        message: 'Products backend unavailable',
        code: 'BAD_GATEWAY',
      },
      {
        status: 502,
      },
    )
  }
}

function buildProxyHeaders(headers?: HeadersInit): Headers {
  const merged = new Headers(JSON_HEADERS)

  if (!headers) {
    return merged
  }

  for (const [key, value] of new Headers(headers).entries()) {
    merged.set(key, value)
  }

  return merged
}
