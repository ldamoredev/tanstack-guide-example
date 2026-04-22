import type {
  ProductCategoryValue,
  ProductsSearch,
  ProductSortValue,
} from './types'

const PRODUCT_CATEGORY_VALUES = [
  '',
  'cat-electronics',
  'cat-office',
  'cat-storage',
  'cat-accessories',
] as const satisfies readonly ProductCategoryValue[]

const PRODUCT_SORT_VALUES = [
  'name-asc',
  'name-desc',
  'price-asc',
  'price-desc',
  'stock-asc',
  'stock-desc',
] as const satisfies readonly ProductSortValue[]

export const CATEGORY_OPTIONS = [
  { value: '', label: 'All categories' },
  { value: 'cat-electronics', label: 'Electronics' },
  { value: 'cat-office', label: 'Office' },
  { value: 'cat-storage', label: 'Storage' },
  { value: 'cat-accessories', label: 'Accessories' },
] as const satisfies readonly {
  value: ProductCategoryValue
  label: string
}[]

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low-High)' },
  { value: 'price-desc', label: 'Price (High-Low)' },
  { value: 'stock-asc', label: 'Stock (Low-High)' },
  { value: 'stock-desc', label: 'Stock (High-Low)' },
] as const satisfies readonly {
  value: ProductSortValue
  label: string
}[]

export const DEFAULT_PRODUCTS_SEARCH: ProductsSearch = {
  q: '',
  category: '',
  sort: 'name-asc',
  page: 1,
}

export function validateProductsSearch(
  search: Record<string, unknown>,
): ProductsSearch {
  return {
    q:
      typeof search.q === 'string'
        ? search.q.trim().toLowerCase()
        : '',
    category: isProductCategoryValue(search.category)
      ? search.category
      : DEFAULT_PRODUCTS_SEARCH.category,
    sort: isProductSortValue(search.sort)
      ? search.sort
      : DEFAULT_PRODUCTS_SEARCH.sort,
    page: normalizePage(search.page),
  }
}

export function buildProductsListQueryParams(
  search: ProductsSearch,
): URLSearchParams {
  const params = new URLSearchParams()

  if (search.q) {
    params.set('q', search.q)
  }

  if (search.category) {
    params.set('category', search.category)
  }

  params.set('sort', search.sort)
  params.set('page', String(search.page))

  return params
}

export function getCategoryLabel(categoryId: string): string {
  return (
    CATEGORY_OPTIONS.find((option) => option.value === categoryId)?.label ??
    categoryId
  )
}

function isProductCategoryValue(
  value: unknown,
): value is ProductCategoryValue {
  return (
    typeof value === 'string' &&
    PRODUCT_CATEGORY_VALUES.includes(value as ProductCategoryValue)
  )
}

function isProductSortValue(value: unknown): value is ProductSortValue {
  return (
    typeof value === 'string' &&
    PRODUCT_SORT_VALUES.includes(value as ProductSortValue)
  )
}

function normalizePage(value: unknown): number {
  if (typeof value === 'number') {
    return Number.isInteger(value) && value > 0 ? value : 1
  }

  if (typeof value === 'string') {
    const parsed = Number.parseInt(value.trim(), 10)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 1
  }

  return 1
}
