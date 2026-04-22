import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  fetchProductByIdFromBackend,
  proxyProductsRequest,
} from '../server/bff'
import { ProductNotFoundError } from '../model/errors'

const originalFetch = globalThis.fetch

afterEach(() => {
  vi.restoreAllMocks()
  globalThis.fetch = originalFetch
})

describe('proxyProductsRequest', () => {
  it('forwards mutation request init to the backend fetch call', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 'prod-901' }), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      }),
    )

    await proxyProductsRequest('/products', undefined, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: '{"name":"Portable SSD"}',
    })

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({
        method: 'POST',
        body: '{"name":"Portable SSD"}',
        headers: expect.any(Headers),
      }),
    )
  })

  it('preserves backend response headers that matter to proxy semantics', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'public, max-age=60',
          etag: '"products-v1"',
          vary: 'accept',
        },
      }),
    )

    const response = await proxyProductsRequest('/products')

    expect(response.headers.get('content-type')).toBe('application/json')
    expect(response.headers.get('cache-control')).toBe('public, max-age=60')
    expect(response.headers.get('etag')).toBe('"products-v1"')
    expect(response.headers.get('vary')).toBe('accept')
  })

  it('normalizes rejected upstream requests to a 502 JSON response', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('connect ECONNREFUSED'))

    const response = await proxyProductsRequest('/products')

    await expect(response.json()).resolves.toEqual({
      message: 'Products backend unavailable',
      code: 'BAD_GATEWAY',
    })
    expect(response.status).toBe(502)
    expect(response.headers.get('content-type')).toContain('application/json')
  })
})

describe('fetchProductByIdFromBackend', () => {
  it('preserves 404 as a typed not-found error for SSR loaders', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      }),
    )

    await expect(fetchProductByIdFromBackend('prod-missing')).rejects.toBeInstanceOf(
      ProductNotFoundError,
    )
  })
})
