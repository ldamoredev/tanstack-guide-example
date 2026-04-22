import { QueryClient } from '@tanstack/react-query'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ProductNotFoundError } from '../model/errors'
import {
  hydrateProductDetailQuery,
  hydrateProductsListQuery,
} from '../query/product.prefetch'
import {
  productDetailQueryOptions,
  productsListQueryOptions,
} from '../query/product.queries'
import * as server from '../server/bff'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('hydrateProductsListQuery', () => {
  it('hydrates the shared query cache from the backend helper', async () => {
    const queryClient = new QueryClient()
    const search = {
      q: 'desk',
      category: 'cat-office' as const,
      sort: 'price-desc' as const,
      page: 2,
    }
    const products = {
      data: [],
      page: 2,
      pageSize: 4,
      totalItems: 0,
      totalPages: 1,
    }

    const fetchProductsFromBff = vi
      .spyOn(server, 'fetchProductsFromBff')
      .mockResolvedValue(products)

    await expect(hydrateProductsListQuery(queryClient, search)).resolves.toEqual(
      products,
    )

    expect(fetchProductsFromBff).toHaveBeenCalledWith(search)
    expect(
      queryClient.getQueryData(productsListQueryOptions(search).queryKey),
    ).toEqual(products)
  })
})

describe('hydrateProductDetailQuery', () => {
  it('hydrates the detail query cache from the backend helper', async () => {
    const queryClient = new QueryClient()
    const product = {
      id: 'prod-desk-lamp',
      name: 'Desk Lamp',
      sku: 'LAMP-410',
      price: 59,
      stock: 15,
      categoryId: 'cat-office',
      supplierId: 'sup-office-works',
    }

    const fetchProductByIdFromBff = vi
      .spyOn(server, 'fetchProductByIdFromBff')
      .mockResolvedValue(product)

    await expect(
      hydrateProductDetailQuery(queryClient, product.id),
    ).resolves.toEqual(product)

    expect(fetchProductByIdFromBff).toHaveBeenCalledWith(product.id)
    expect(
      queryClient.getQueryData(productDetailQueryOptions(product.id).queryKey),
    ).toEqual(product)
  })

  it('preserves typed not-found errors for the route loader', async () => {
    const queryClient = new QueryClient()

    vi.spyOn(server, 'fetchProductByIdFromBff').mockRejectedValue(
      new ProductNotFoundError(),
    )

    await expect(
      hydrateProductDetailQuery(queryClient, 'prod-missing'),
    ).rejects.toBeInstanceOf(ProductNotFoundError)
  })
})
