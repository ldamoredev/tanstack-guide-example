import type { AddressInfo } from 'node:net'

import { afterAll, beforeEach, expect, it } from 'vitest'

import { resetMockData } from './data/mockData.js'
import { createApp } from './server.js'

const servers = new Set<ReturnType<ReturnType<typeof createApp>['listen']>>()

afterAll(async () => {
  await Promise.all(
    [...servers].map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => {
            if (error) {
              reject(error)
              return
            }

            resolve()
          });
        }),
    ),
  );
})

async function requestJson(
  path: string,
  init?: RequestInit,
): Promise<{ status: number; body: unknown }> {
  const app = createApp()
  const server = app.listen(0)

  servers.add(server)

  await new Promise<void>((resolve, reject) => {
    server.once('listening', () => resolve())
    server.once('error', (error) => reject(error))
  })

  const { port } = server.address() as AddressInfo
  const response = await fetch(`http://127.0.0.1:${port}${path}`, init)
  const body = (await response.json()) as unknown

  return { status: response.status, body }
}

it('GET /products applies search, category, sort, and paging filters', async () => {
  const response = await requestJson(
    '/products?q=lap&category=cat-electronics&sort=price-desc&page=1',
  )

  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    data: [
      {
        id: 'prod-laptop-13',
        name: '13in Ultralight Laptop',
        sku: 'LAP-013',
        price: 1299,
        stock: 12,
        categoryId: 'cat-electronics',
        supplierId: 'sup-tech-hub',
      },
    ],
    page: 1,
    pageSize: 4,
    totalItems: 1,
    totalPages: 1,
  })
})

it('GET /products/:id returns a single product', async () => {
  const response = await requestJson('/products/prod-chair-ergonomic')

  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    id: 'prod-chair-ergonomic',
    name: 'Ergonomic Office Chair',
    sku: 'CHR-401',
    price: 249,
    stock: 18,
    categoryId: 'cat-office',
    supplierId: 'sup-workflow-goods',
  })
})

it('POST /products creates an in-memory product', async () => {
  const createResponse = await requestJson('/products', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Warehouse Label Printer',
      sku: 'PRN-880',
      price: 319,
      stock: 6,
      categoryId: 'cat-electronics',
      supplierId: 'sup-tech-hub',
    }),
  })

  expect(createResponse.status).toBe(201)

  const createdProduct = createResponse.body as {
    id: string
    name: string
    sku: string
    price: number
    stock: number
    categoryId: string
    supplierId: string
  }

  expect(createdProduct.name).toBe('Warehouse Label Printer')
  expect(createdProduct.id).toMatch(/^prod-/)

  const fetchResponse = await requestJson(`/products/${createdProduct.id}`)

  expect(fetchResponse.status).toBe(200)
  expect(fetchResponse.body).toEqual(createdProduct)
})

it('POST /products rejects client-supplied id and extra fields', async () => {
  const response = await requestJson('/products', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      id: 'prod-client-owned',
      name: 'Portable Scanner',
      sku: 'SCN-420',
      price: 199,
      stock: 7,
      categoryId: 'cat-electronics',
      supplierId: 'sup-tech-hub',
      unexpected: true,
    }),
  })

  expect(response.status).toBe(400)
  expect(response.body).toEqual({ message: 'Invalid product payload' })
})

it('POST /products returns 400 for a null JSON body', async () => {
  const response = await requestJson('/products', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: 'null',
  })

  expect(response.status).toBe(400)
  expect(response.body).toEqual({ message: 'Invalid product payload' })
})

it('POST /products returns 400 for invalid scalar values', async () => {
  const response = await requestJson('/products', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: '  ',
      sku: '',
      price: -10,
      stock: Number.NaN,
      categoryId: 'cat-electronics',
      supplierId: 'sup-tech-hub',
    }),
  })

  expect(response.status).toBe(400)
  expect(response.body).toEqual({ message: 'Invalid product payload' })
})

it('POST /products rejects impossible foreign-key references', async () => {
  const response = await requestJson('/products', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Portable Scanner',
      sku: 'SCN-420',
      price: 199,
      stock: 7,
      categoryId: 'cat-missing',
      supplierId: 'sup-missing',
    }),
  })

  expect(response.status).toBe(400)
  expect(response.body).toEqual({ message: 'Invalid product payload' })
})

it('PATCH /products/:id updates an existing product', async () => {
  const response = await requestJson('/products/prod-mouse-wireless', {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      stock: 52,
      price: 34,
    }),
  })

  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    id: 'prod-mouse-wireless',
    name: 'Wireless Mouse',
    sku: 'MOU-210',
    price: 34,
    stock: 52,
    categoryId: 'cat-electronics',
    supplierId: 'sup-tech-hub',
  })
})

it('PATCH /products/:id returns 400 for invalid updates', async () => {
  const response = await requestJson('/products/prod-mouse-wireless', {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: '',
      price: Number.NEGATIVE_INFINITY,
    }),
  })

  expect(response.status).toBe(400)
  expect(response.body).toEqual({ message: 'Invalid product update' })
})

it('PATCH /products/:id rejects impossible foreign-key references', async () => {
  const response = await requestJson('/products/prod-mouse-wireless', {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      categoryId: 'cat-missing',
      supplierId: 'sup-missing',
    }),
  })

  expect(response.status).toBe(400)
  expect(response.body).toEqual({ message: 'Invalid product update' })
})

it('PATCH /products/:id returns 404 when the product does not exist', async () => {
  const response = await requestJson('/products/prod-missing', {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      stock: 5,
    }),
  })

  expect(response.status).toBe(404)
  expect(response.body).toEqual({ message: 'Product not found' })
})

it('resetMockData restores original product values after a mutation', async () => {
  const updateResponse = await requestJson('/products/prod-mouse-wireless', {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      stock: 1,
      price: 999,
    }),
  })

  expect(updateResponse.status).toBe(200)

  resetMockData()

  const fetchResponse = await requestJson('/products/prod-mouse-wireless')

  expect(fetchResponse.status).toBe(200)
  expect(fetchResponse.body).toEqual({
    id: 'prod-mouse-wireless',
    name: 'Wireless Mouse',
    sku: 'MOU-210',
    price: 39,
    stock: 48,
    categoryId: 'cat-electronics',
    supplierId: 'sup-tech-hub',
  })
})

it('GET /categories returns the category list', async () => {
  const response = await requestJson('/categories')

  expect(response.status).toBe(200)
  expect(response.body).toEqual([
    { id: 'cat-electronics', name: 'Electronics' },
    { id: 'cat-office', name: 'Office' },
    { id: 'cat-storage', name: 'Storage' },
    { id: 'cat-accessories', name: 'Accessories' },
  ])
})

it('GET /suppliers returns the supplier list', async () => {
  const response = await requestJson('/suppliers')

  expect(response.status).toBe(200)
  expect(response.body).toEqual([
    {
      id: 'sup-tech-hub',
      name: 'Tech Hub Distributors',
      email: 'sales@techhub.example',
    },
    {
      id: 'sup-workflow-goods',
      name: 'Workflow Goods Co.',
      email: 'team@workflowgoods.example',
    },
    {
      id: 'sup-storage-house',
      name: 'Storage House Supply',
      email: 'orders@storagehouse.example',
    },
    {
      id: 'sup-studio-retail',
      name: 'Studio Retail Partners',
      email: 'hello@studioretail.example',
    },
  ])
})

beforeEach(() => {
  resetMockData()
})
