// @vitest-environment jsdom

import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const queryClient = {
  setQueryData: vi.fn(),
}

const navigate = vi.fn().mockResolvedValue(undefined)
const createMutateAsync = vi.fn()
const updateMutateAsync = vi.fn()

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<object>('@tanstack/react-query')

  return {
    ...actual,
    useQueryClient: () => queryClient,
    useMutation: (options: { mutationKey?: readonly unknown[] }) => {
      if (options.mutationKey?.[1] === 'create') {
        return { mutateAsync: createMutateAsync }
      }

      return { mutateAsync: updateMutateAsync }
    },
  }
})

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<object>('@tanstack/react-router')

  return {
    ...actual,
    useNavigate: () => navigate,
  }
})

import { useCreateProductFlow } from '../application/useCreateProductFlow'
import { useUpdateProductFlow } from '../application/useUpdateProductFlow'

describe('product flow hooks', () => {
  it('creates a product, warms the detail cache, and navigates to the detail page', async () => {
    createMutateAsync.mockResolvedValue({
      id: 'prod-901',
      name: 'Portable SSD',
    })

    const { result } = renderHook(() => useCreateProductFlow())

    await result.current.submit({
      name: 'Portable SSD',
      sku: 'SSD-900',
      price: 149,
      stock: 18,
      categoryId: 'cat-storage',
      supplierId: 'sup-storage-house',
    })

    expect(queryClient.setQueryData).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith({
      to: '/products/$productId',
      params: { productId: 'prod-901' },
    })
  })

  it('updates a product, warms the detail cache, and navigates back to the detail page', async () => {
    updateMutateAsync.mockResolvedValue({
      id: 'prod-mouse-wireless',
      name: 'Wireless Mouse Pro',
    })

    const { result } = renderHook(() =>
      useUpdateProductFlow('prod-mouse-wireless'),
    )

    await result.current.submit({
      name: 'Wireless Mouse Pro',
      sku: 'MOU-210',
      price: 49,
      stock: 44,
      categoryId: 'cat-electronics',
      supplierId: 'sup-tech-hub',
    })

    expect(queryClient.setQueryData).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith({
      to: '/products/$productId',
      params: { productId: 'prod-mouse-wireless' },
    })
  })
})
