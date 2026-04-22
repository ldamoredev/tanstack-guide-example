import { describe, expect, it } from 'vitest'
import { buildVirtualProductRows } from '../lib/virtual'

const baseProducts = [
  {
    id: 'prod-a',
    name: 'Alpha Keyboard',
    sku: 'ALPHA-001',
    price: 149,
    stock: 12,
    categoryId: 'cat-electronics',
    supplierId: 'sup-1',
  },
  {
    id: 'prod-b',
    name: 'Beta Mouse',
    sku: 'BETA-002',
    price: 59,
    stock: 34,
    categoryId: 'cat-accessories',
    supplierId: 'sup-2',
  },
]

describe('buildVirtualProductRows', () => {
  it('repeats base products into a large virtualized catalog with stable synthetic ids', () => {
    expect(buildVirtualProductRows(baseProducts, 5)).toEqual([
      {
        ...baseProducts[0],
        virtualId: 'prod-a-virtual-1',
        sourceId: 'prod-a',
        sourceIndex: 1,
      },
      {
        ...baseProducts[1],
        virtualId: 'prod-b-virtual-2',
        sourceId: 'prod-b',
        sourceIndex: 2,
      },
      {
        ...baseProducts[0],
        virtualId: 'prod-a-virtual-3',
        sourceId: 'prod-a',
        sourceIndex: 3,
      },
      {
        ...baseProducts[1],
        virtualId: 'prod-b-virtual-4',
        sourceId: 'prod-b',
        sourceIndex: 4,
      },
      {
        ...baseProducts[0],
        virtualId: 'prod-a-virtual-5',
        sourceId: 'prod-a',
        sourceIndex: 5,
      },
    ])
  })

  it('returns an empty array when there is no source data', () => {
    expect(buildVirtualProductRows([], 1000)).toEqual([])
  })
})
