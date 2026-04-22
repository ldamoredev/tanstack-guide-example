import { afterEach, describe, expect, it } from 'vitest'
import {
  createProductResponse,
  getProductResponse,
  listProductsResponse,
  resetProductCatalog,
  updateProductResponse,
} from '../server/catalog'

afterEach(() => {
  resetProductCatalog()
})

describe('product catalog server API', () => {
  it('filters, sorts, and paginates products from the app catalog', async () => {
    const response = await listProductsResponse(
      new URLSearchParams({
        q: 'DSK-120',
        category: 'cat-office',
        sort: 'price-desc',
        page: '1',
      }),
    )

    await expect(response.json()).resolves.toMatchObject({
      data: [
        expect.objectContaining({
          id: 'prod-desk-standing',
          name: 'Standing Desk',
        }),
      ],
      page: 1,
      pageSize: 4,
      totalItems: 1,
      totalPages: 1,
    })
    expect(response.status).toBe(200)
  })

  it('creates and updates products through response helpers', async () => {
    const createResponse = await createProductResponse(
      new Request('https://example.test/api/products', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Portable SSD',
          sku: 'SSD-900',
          price: 149,
          stock: 18,
          categoryId: 'cat-storage',
          supplierId: 'sup-storage-house',
        }),
      }),
    )

    const created = await createResponse.json()
    expect(createResponse.status).toBe(201)
    expect(created).toMatchObject({
      id: 'prod-901',
      name: 'Portable SSD',
    })

    const updateResponse = await updateProductResponse(
      created.id,
      new Request(`https://example.test/api/products/${created.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          stock: 21,
        }),
      }),
    )

    await expect(updateResponse.json()).resolves.toMatchObject({
      id: 'prod-901',
      stock: 21,
    })
    expect(updateResponse.status).toBe(200)
  })

  it('preserves validation and not found responses', async () => {
    const invalidCreate = await createProductResponse(
      new Request('https://example.test/api/products', {
        method: 'POST',
        body: JSON.stringify({
          name: '',
        }),
      }),
    )
    expect(invalidCreate.status).toBe(400)
    await expect(invalidCreate.json()).resolves.toEqual({
      message: 'Invalid product payload',
    })

    const missingProduct = await getProductResponse('prod-missing')
    expect(missingProduct.status).toBe(404)
    await expect(missingProduct.json()).resolves.toEqual({
      message: 'Product not found',
    })
  })
})
