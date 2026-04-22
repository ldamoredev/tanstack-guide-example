import { afterEach, describe, expect, it } from 'vitest'
import { ProductNotFoundError } from '../model/errors'
import { fetchProductByIdFromBff, fetchProductsFromBff } from '../server/bff'
import { resetProductCatalog } from '../server/catalog'

afterEach(() => {
  resetProductCatalog()
})

describe('app-local product server helpers', () => {
  it('reads the list directly from the app catalog', async () => {
    const products = await fetchProductsFromBff({
      q: 'MOU-210',
      category: 'cat-electronics',
      sort: 'name-asc',
      page: 1,
    })

    expect(products).toMatchObject({
      data: [
        expect.objectContaining({
          id: 'prod-mouse-wireless',
        }),
      ],
      page: 1,
      pageSize: 4,
      totalItems: 1,
      totalPages: 1,
    })
  })

  it('preserves 404 as a typed not-found error for SSR loaders', async () => {
    await expect(
      fetchProductByIdFromBff('prod-missing'),
    ).rejects.toBeInstanceOf(ProductNotFoundError)
  })
})
