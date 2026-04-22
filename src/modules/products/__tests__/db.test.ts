import { describe, expect, it } from 'vitest'
import {
  LOW_STOCK_THRESHOLD,
  buildStockAdjustmentInput,
  isLowStockProduct,
} from '../model/db'

const product = {
  id: 'prod-mouse-wireless',
  name: 'Wireless Mouse',
  sku: 'MSE-201',
  price: 49,
  stock: 12,
  categoryId: 'cat-electronics',
  supplierId: 'sup-tech-hub',
}

describe('isLowStockProduct', () => {
  it('treats products at or below the threshold as low stock', () => {
    expect(isLowStockProduct({ ...product, stock: LOW_STOCK_THRESHOLD })).toBe(true)
    expect(isLowStockProduct({ ...product, stock: LOW_STOCK_THRESHOLD - 1 })).toBe(
      true,
    )
    expect(isLowStockProduct({ ...product, stock: LOW_STOCK_THRESHOLD + 1 })).toBe(
      false,
    )
  })
})

describe('buildStockAdjustmentInput', () => {
  it('keeps the rest of the product payload intact while adjusting stock', () => {
    expect(buildStockAdjustmentInput(product, 5)).toEqual({
      name: 'Wireless Mouse',
      sku: 'MSE-201',
      price: 49,
      stock: 17,
      categoryId: 'cat-electronics',
      supplierId: 'sup-tech-hub',
    })
  })

  it('never lets stock go below zero', () => {
    expect(buildStockAdjustmentInput(product, -50).stock).toBe(0)
  })
})
