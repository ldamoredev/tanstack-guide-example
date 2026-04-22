import type { Product } from '../model/types'

export interface VirtualProductRow extends Product {
  virtualId: string
  sourceId: string
  sourceIndex: number
}

export function buildVirtualProductRows(
  products: Product[],
  totalRows: number,
): VirtualProductRow[] {
  if (products.length === 0 || totalRows <= 0) {
    return []
  }

  return Array.from({ length: totalRows }, (_, index) => {
    const product = products[index % products.length]

    return {
      ...product,
      virtualId: `${product.id}-virtual-${index + 1}`,
      sourceId: product.id,
      sourceIndex: index + 1,
    }
  })
}
