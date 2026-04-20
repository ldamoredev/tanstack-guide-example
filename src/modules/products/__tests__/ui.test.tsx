// @vitest-environment jsdom

import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let suspenseData: unknown

const mockMatchRoute = vi.fn()
const mockCreateSubmit = vi.fn()
const mockUpdateSubmit = vi.fn()

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<object>('@tanstack/react-query')

  return {
    ...actual,
    useSuspenseQuery: () => ({
      data: suspenseData,
    }),
  }
})

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<object>('@tanstack/react-router')

  return {
    ...actual,
    Link: ({
      children,
      to,
      className,
    }: {
      children: React.ReactNode
      to?: string
      className?: string
    }) => (
      <a href={to} className={className}>
        {children}
      </a>
    ),
    Outlet: () => null,
    useMatchRoute: () => mockMatchRoute,
    useNavigate: () => vi.fn(),
  }
})

vi.mock('../ui/ProductFilters', () => ({
  ProductFilters: () => <div>filters panel</div>,
}))

vi.mock('../ui/ProductTable', () => ({
  ProductTable: () => <div>inspection grid</div>,
}))

vi.mock('../ui/ProductForm', () => ({
  ProductForm: ({ submitLabel }: { submitLabel: string }) => (
    <div>{submitLabel} form surface</div>
  ),
}))

vi.mock('../application/useCreateProductFlow', () => ({
  useCreateProductFlow: () => ({
    submit: mockCreateSubmit,
  }),
}))

vi.mock('../application/useUpdateProductFlow', () => ({
  useUpdateProductFlow: () => ({
    submit: mockUpdateSubmit,
  }),
}))

import { EditProductPage } from '../ui/EditProductPage'
import { NewProductPage } from '../ui/NewProductPage'
import { ProductDetailPage } from '../ui/ProductDetailPage'
import { ProductsPage } from '../ui/ProductsPage'
import type { Product, ProductsListResponse, ProductsSearch } from '../model/types'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

beforeEach(() => {
  mockMatchRoute.mockReturnValue(false)
})

const productsSearch: ProductsSearch = {
  q: '',
  category: '',
  sort: 'name-asc',
  page: 1,
}

const productsListResponse: ProductsListResponse = {
  data: [
    {
      id: 'prod-1',
      name: 'Portable SSD',
      sku: 'SSD-900',
      price: 149,
      stock: 18,
      categoryId: 'cat-storage',
      supplierId: 'sup-storage-house',
    },
  ],
  page: 1,
  pageSize: 10,
  totalItems: 1,
  totalPages: 1,
}

const productDetail: Product = {
  id: 'prod-1',
  name: 'Portable SSD',
  sku: 'SSD-900',
  price: 149,
  stock: 18,
  categoryId: 'cat-storage',
  supplierId: 'sup-storage-house',
}

describe('products UI framing', () => {
  it('frames the browse route as a control room for the data flow', () => {
    suspenseData = productsListResponse

    render(<ProductsPage search={productsSearch} />)

    expect(screen.getAllByText(/control room/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/search params/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/loader/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/query/i).length).toBeGreaterThan(0)
  })

  it('frames the detail route as an inspection surface', () => {
    suspenseData = productDetail

    render(<ProductDetailPage productId="prod-1" />)

    expect(screen.getAllByText(/inspection/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/shared query cache/i).length).toBeGreaterThan(0)
  })

  it('frames the create and edit routes as mutation workspaces', () => {
    render(
      <div>
        <NewProductPage />
        <EditProductPage product={productDetail} productId="prod-1" />
      </div>,
    )

    expect(screen.getAllByText(/mutation/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/performing a state change/i).length).toBeGreaterThan(0)
  })
})
