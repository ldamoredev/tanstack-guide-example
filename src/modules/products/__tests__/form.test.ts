// @vitest-environment jsdom

import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type * as I18nModule from '#/lib/i18n'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { ProductForm } from '../ui/ProductForm'
import {
  getDefaultProductFormValues,
  toProductFormValues,
  validateProductFormValue,
} from '../model/form'

vi.mock('#/lib/i18n', async () => {
  const actual = await vi.importActual<typeof I18nModule>('#/lib/i18n')

  return {
    ...actual,
    useI18n: () => ({
      locale: 'en',
      setLocale: vi.fn(),
      copy: actual.defaultI18nCopy,
    }),
  }
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('product form helpers', () => {
  it('returns empty defaults for a new product form', () => {
    expect(getDefaultProductFormValues()).toEqual({
      name: '',
      sku: '',
      price: '',
      stock: '',
      categoryId: '',
      supplierId: '',
    })
  })

  it('maps a product into editable string field values', () => {
    expect(
      toProductFormValues({
        id: 'prod-mouse-wireless',
        name: 'Wireless Mouse',
        sku: 'MOU-210',
        price: 39,
        stock: 48,
        categoryId: 'cat-electronics',
        supplierId: 'sup-tech-hub',
      }),
    ).toEqual({
      name: 'Wireless Mouse',
      sku: 'MOU-210',
      price: '39',
      stock: '48',
      categoryId: 'cat-electronics',
      supplierId: 'sup-tech-hub',
    })
  })

  it('validates each field against catalog-aligned rules', () => {
    expect(validateProductFormValue('name', '   ')).toBe('Name is required')
    expect(validateProductFormValue('sku', '')).toBe('SKU is required')
    expect(validateProductFormValue('price', '')).toBe('Price is required')
    expect(validateProductFormValue('price', '-1')).toBe(
      'Price must be a non-negative number',
    )
    expect(validateProductFormValue('stock', 'nope')).toBe(
      'Stock must be a non-negative number',
    )
    expect(validateProductFormValue('categoryId', '')).toBe(
      'Category is required',
    )
    expect(validateProductFormValue('supplierId', '')).toBe(
      'Supplier is required',
    )
    expect(validateProductFormValue('name', 'Wireless Mouse')).toBeUndefined()
  })
})

describe('ProductForm', () => {
  it('shows inline validation and only submits normalized values when valid', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)

    render(
      React.createElement(ProductForm, {
        defaultValues: getDefaultProductFormValues(),
        submitLabel: 'Create product',
        onSubmit,
      }),
    )

    const submitButton = screen.getByRole('button', {
      name: 'Create product',
    })

    expect((submitButton as HTMLButtonElement).disabled).toBe(true)

    fireEvent.blur(screen.getByLabelText('Name'))

    expect(screen.getByText('Name is required')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Portable SSD' },
    })
    fireEvent.change(screen.getByLabelText('SKU'), {
      target: { value: 'SSD-900' },
    })
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: '149' },
    })
    fireEvent.change(screen.getByLabelText('Stock'), {
      target: { value: '18' },
    })
    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'cat-storage' },
    })
    fireEvent.change(screen.getByLabelText('Supplier'), {
      target: { value: 'sup-storage-house' },
    })

    await waitFor(() => {
      expect((submitButton as HTMLButtonElement).disabled).toBe(false)
    })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Portable SSD',
        sku: 'SSD-900',
        price: 149,
        stock: 18,
        categoryId: 'cat-storage',
        supplierId: 'sup-storage-house',
      })
    })
  })
})
