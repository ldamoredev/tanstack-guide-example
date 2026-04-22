import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ProductNotFoundError } from '../model/errors'

const { hydrateProductDetailQuery, notFound } = vi.hoisted(() => ({
  hydrateProductDetailQuery: vi.fn(),
  notFound: vi.fn(),
}))

vi.mock('../query/product.prefetch', () => ({
  hydrateProductDetailQuery,
}))

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<object>('@tanstack/react-router')

  return {
    ...actual,
    notFound,
  }
})

import { loadProductOr404 } from '../application/loadProductOr404'

describe('loadProductOr404', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('hydrates the product detail query when the product exists', async () => {
    const queryClient = { id: 'query-client' }
    const product = { id: 'prod-mouse-wireless' }

    hydrateProductDetailQuery.mockResolvedValue(product)

    await expect(
      loadProductOr404(queryClient as never, 'prod-mouse-wireless'),
    ).resolves.toEqual(product)

    expect(hydrateProductDetailQuery).toHaveBeenCalledWith(
      queryClient,
      'prod-mouse-wireless',
    )
  })

  it('translates a typed missing product into TanStack Router notFound', async () => {
    const sentinel = new Error('route not found')

    hydrateProductDetailQuery.mockRejectedValue(new ProductNotFoundError())
    notFound.mockReturnValue(sentinel)

    await expect(loadProductOr404({} as never, 'prod-missing')).rejects.toBe(
      sentinel,
    )
    expect(notFound).toHaveBeenCalled()
  })

  it('rethrows non-not-found errors unchanged', async () => {
    const error = new Error('boom')

    hydrateProductDetailQuery.mockRejectedValue(error)

    await expect(loadProductOr404({} as never, 'prod-mouse-wireless')).rejects.toBe(
      error,
    )
  })
})
