import type { ProductMutationInput } from './form'
import type { Product } from './types'

export const LOW_STOCK_THRESHOLD = 25

export function isLowStockProduct(product: Product): boolean {
  return product.stock <= LOW_STOCK_THRESHOLD
}

export function buildStockAdjustmentInput(
  product: Product,
  delta: number,
): ProductMutationInput {
  return {
    name: product.name,
    sku: product.sku,
    price: product.price,
    stock: Math.max(0, product.stock + delta),
    categoryId: product.categoryId,
    supplierId: product.supplierId,
  }
}
