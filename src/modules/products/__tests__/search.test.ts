import { describe, expect, it } from 'vitest'
import {
  DEFAULT_PRODUCTS_SEARCH,
  buildProductsListQueryParams,
  validateProductsSearch,
} from '../model/search'

describe('validateProductsSearch', () => {
  it('normalizes unknown values to backend-aligned defaults', () => {
    expect(
      validateProductsSearch({
        q: 42,
        category: 'cat-missing',
        sort: 'price-sideways',
        page: '0',
      }),
    ).toEqual(DEFAULT_PRODUCTS_SEARCH)
  })

  it('keeps valid backend filter values and trims the query', () => {
    expect(
      validateProductsSearch({
        q: '  lap  ',
        category: 'cat-electronics',
        sort: 'price-desc',
        page: '3',
      }),
    ).toEqual({
      q: 'lap',
      category: 'cat-electronics',
      sort: 'price-desc',
      page: 3,
    })
  })

  it('normalizes the search query casing for stable query keys', () => {
    expect(
      validateProductsSearch({
        q: '  LaPTop  ',
        category: '',
        sort: 'name-asc',
        page: '1',
      }),
    ).toEqual({
      q: 'laptop',
      category: '',
      sort: 'name-asc',
      page: 1,
    })
  })
})

describe('buildProductsListQueryParams', () => {
  it('omits empty optional filters but keeps sort and page', () => {
    expect(
      buildProductsListQueryParams({
        q: '',
        category: '',
        sort: 'name-asc',
        page: 1,
      }).toString(),
    ).toBe('sort=name-asc&page=1')
  })

  it('serializes all active filters for the BFF request', () => {
    expect(
      buildProductsListQueryParams({
        q: 'mouse',
        category: 'cat-electronics',
        sort: 'stock-desc',
        page: 2,
      }).toString(),
    ).toBe('q=mouse&category=cat-electronics&sort=stock-desc&page=2')
  })
})
