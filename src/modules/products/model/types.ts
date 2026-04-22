export interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  categoryId: string
  supplierId: string
}

export interface ProductsListResponse {
  data: Product[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export type ProductCategoryValue =
  | ''
  | 'cat-electronics'
  | 'cat-office'
  | 'cat-storage'
  | 'cat-accessories'

export type ProductSortValue =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'stock-asc'
  | 'stock-desc'

export interface ProductsSearch {
  q: string
  category: ProductCategoryValue
  sort: ProductSortValue
  page: number
}
