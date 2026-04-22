import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createProduct,
  updateProduct,
} from '../api/client'
import {
  createProductMutationOptions,
  updateProductMutationOptions,
} from '../query/product.mutations'

const originalFetch = globalThis.fetch

afterEach(() => {
  vi.restoreAllMocks()
  globalThis.fetch = originalFetch
})

describe('product mutation api helpers', () => {
  it('creates a product through the BFF endpoint', async () => {
    const createdProduct = {
      id: 'prod-901',
      name: 'Portable SSD',
      sku: 'SSD-900',
      price: 149,
      stock: 18,
      categoryId: 'cat-storage',
      supplierId: 'sup-storage-house',
    }

    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(createdProduct), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      }),
    )

    await expect(
      createProduct({
        name: 'Portable SSD',
        sku: 'SSD-900',
        price: 149,
        stock: 18,
        categoryId: 'cat-storage',
        supplierId: 'sup-storage-house',
      }),
    ).resolves.toEqual(createdProduct)

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/products',
      expect.objectContaining({
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
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
  })

  it('updates a product through the BFF endpoint', async () => {
    const updatedProduct = {
      id: 'prod-mouse-wireless',
      name: 'Wireless Mouse Pro',
      sku: 'MOU-210',
      price: 49,
      stock: 44,
      categoryId: 'cat-electronics',
      supplierId: 'sup-tech-hub',
    }

    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(updatedProduct), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )

    await expect(
      updateProduct('prod-mouse-wireless', {
        name: 'Wireless Mouse Pro',
        sku: 'MOU-210',
        price: 49,
        stock: 44,
        categoryId: 'cat-electronics',
        supplierId: 'sup-tech-hub',
      }),
    ).resolves.toEqual(updatedProduct)

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/products/prod-mouse-wireless',
      expect.objectContaining({
        method: 'PATCH',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Wireless Mouse Pro',
          sku: 'MOU-210',
          price: 49,
          stock: 44,
          categoryId: 'cat-electronics',
          supplierId: 'sup-tech-hub',
        }),
      }),
    )
  })
})

describe('product mutation helpers', () => {
  it('invalidates the product list after a create succeeds', async () => {
    const queryClient = {
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    }

    const options = createProductMutationOptions(queryClient as never)

    await options.onSuccess?.(
      {
        id: 'prod-901',
        name: 'Portable SSD',
        sku: 'SSD-900',
        price: 149,
        stock: 18,
        categoryId: 'cat-storage',
        supplierId: 'sup-storage-house',
      },
      {
        name: 'Portable SSD',
        sku: 'SSD-900',
        price: 149,
        stock: 18,
        categoryId: 'cat-storage',
        supplierId: 'sup-storage-house',
      },
      undefined,
      undefined as never,
    )

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['products'],
    })
  })

  it('invalidates the list and detail after an update succeeds', async () => {
    const queryClient = {
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    }

    const options = updateProductMutationOptions(queryClient as never)

    await options.onSuccess?.(
      {
        id: 'prod-mouse-wireless',
        name: 'Wireless Mouse Pro',
        sku: 'MOU-210',
        price: 49,
        stock: 44,
        categoryId: 'cat-electronics',
        supplierId: 'sup-tech-hub',
      },
      {
        productId: 'prod-mouse-wireless',
        input: {
          name: 'Wireless Mouse Pro',
          sku: 'MOU-210',
          price: 49,
          stock: 44,
          categoryId: 'cat-electronics',
          supplierId: 'sup-tech-hub',
        },
      },
      undefined,
      undefined as never,
    )

    expect(queryClient.invalidateQueries).toHaveBeenNthCalledWith(1, {
      queryKey: ['products'],
    })
    expect(queryClient.invalidateQueries).toHaveBeenNthCalledWith(2, {
      queryKey: ['products', 'prod-mouse-wireless'],
    })
  })
})
