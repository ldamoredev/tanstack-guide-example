import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  ProductNotFoundError,
  ProductsApiError,
} from '../model/errors'
import {
  fetchProductById,
  fetchProducts,
} from '../api/client'

const originalFetch = globalThis.fetch

afterEach(() => {
  vi.restoreAllMocks()
  globalThis.fetch = originalFetch
})

describe('fetchProducts', () => {
  it('calls the thin app-owned BFF endpoint with backend-aligned search params', async () => {
    const responsePayload = {
      data: [],
      page: 2,
      pageSize: 4,
      totalItems: 0,
      totalPages: 1,
    }

    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(responsePayload), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )

    await expect(
      fetchProducts({
        q: 'lap',
        category: 'cat-electronics',
        sort: 'price-desc',
        page: 2,
      }),
    ).resolves.toEqual(responsePayload)

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/products?q=lap&category=cat-electronics&sort=price-desc&page=2',
      expect.objectContaining({
        headers: {
          accept: 'application/json',
        },
      }),
    )
  })

  it('throws a useful error when the proxy request fails', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'boom' }), {
        status: 502,
        headers: { 'content-type': 'application/json' },
      }),
    )

    await expect(
      fetchProducts({
        q: '',
        category: '',
        sort: 'name-asc',
        page: 1,
      }),
    ).rejects.toMatchObject({
      name: 'ProductsApiError',
      message: 'boom',
      status: 502,
    } satisfies Partial<ProductsApiError>)
  })

  it('wraps rejected fetches in a typed network error', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('socket hang up'))

    await expect(
      fetchProducts({
        q: '',
        category: '',
        sort: 'name-asc',
        page: 1,
      }),
    ).rejects.toMatchObject({
      name: 'ProductsApiError',
      message: 'Failed to fetch products',
      status: 0,
      code: 'NETWORK_ERROR',
    } satisfies Partial<ProductsApiError>)
  })
})

describe('fetchProductById', () => {
  it('requests a single product through the BFF layer', async () => {
    const product = {
      id: 'prod-mouse-wireless',
      name: 'Wireless Mouse',
      sku: 'MOU-210',
      price: 39,
      stock: 48,
      categoryId: 'cat-electronics',
      supplierId: 'sup-tech-hub',
    }

    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(product), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )

    await expect(fetchProductById('prod-mouse-wireless')).resolves.toEqual(
      product,
    )

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/products/prod-mouse-wireless',
      expect.objectContaining({
        headers: {
          accept: 'application/json',
        },
      }),
    )
  })

  it('preserves 404 semantics for missing products', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      }),
    )

    await expect(fetchProductById('prod-missing')).rejects.toBeInstanceOf(
      ProductNotFoundError,
    )
  })
})
