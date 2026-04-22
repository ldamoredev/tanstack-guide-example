import type { Product } from './types'

export interface ProductFormValues {
  name: string
  sku: string
  price: string
  stock: string
  categoryId: string
  supplierId: string
}

export interface ProductMutationInput {
  name: string
  sku: string
  price: number
  stock: number
  categoryId: string
  supplierId: string
}

export const PRODUCT_FORM_CATEGORY_OPTIONS = [
  { value: 'cat-electronics', label: 'Electronics' },
  { value: 'cat-office', label: 'Office' },
  { value: 'cat-storage', label: 'Storage' },
  { value: 'cat-accessories', label: 'Accessories' },
] as const

export const PRODUCT_FORM_SUPPLIER_OPTIONS = [
  { value: 'sup-tech-hub', label: 'Tech Hub Distributors' },
  { value: 'sup-workflow-goods', label: 'Workflow Goods Co.' },
  { value: 'sup-storage-house', label: 'Storage House Supply' },
  { value: 'sup-studio-retail', label: 'Studio Retail Partners' },
] as const

export function getDefaultProductFormValues(): ProductFormValues {
  return {
    name: '',
    sku: '',
    price: '',
    stock: '',
    categoryId: '',
    supplierId: '',
  }
}

export function toProductFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    sku: product.sku,
    price: String(product.price),
    stock: String(product.stock),
    categoryId: product.categoryId,
    supplierId: product.supplierId,
  }
}

export function validateProductFormValue(
  fieldName: keyof ProductFormValues,
  value: string,
): string | undefined {
  switch (fieldName) {
    case 'name':
      return value.trim() ? undefined : 'Name is required'
    case 'sku':
      return value.trim() ? undefined : 'SKU is required'
    case 'categoryId':
      return value.trim() ? undefined : 'Category is required'
    case 'supplierId':
      return value.trim() ? undefined : 'Supplier is required'
    case 'price':
      return validateNonNegativeNumber(value, 'Price')
    case 'stock':
      return validateNonNegativeNumber(value, 'Stock')
    default:
      return undefined
  }
}

export function toProductFormSubmitValue(
  values: ProductFormValues,
): ProductMutationInput {
  return {
    name: values.name.trim(),
    sku: values.sku.trim(),
    price: Number(values.price),
    stock: Number(values.stock),
    categoryId: values.categoryId,
    supplierId: values.supplierId,
  }
}

export function isProductFormValid(values: ProductFormValues): boolean {
  return (
    validateProductFormValue('name', values.name) === undefined &&
    validateProductFormValue('sku', values.sku) === undefined &&
    validateProductFormValue('price', values.price) === undefined &&
    validateProductFormValue('stock', values.stock) === undefined &&
    validateProductFormValue('categoryId', values.categoryId) === undefined &&
    validateProductFormValue('supplierId', values.supplierId) === undefined
  )
}

function validateNonNegativeNumber(
  value: string,
  fieldLabel: 'Price' | 'Stock',
): string | undefined {
  if (!value.trim()) {
    return `${fieldLabel} is required`
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0
    ? undefined
    : `${fieldLabel} must be a non-negative number`
}
