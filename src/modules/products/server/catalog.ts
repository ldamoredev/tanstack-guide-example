import type { Product, ProductsListResponse } from '../model/types'
import type { ProductMutationInput } from '../model/form'

interface Category {
  id: string
  name: string
}

interface Supplier {
  id: string
  name: string
  email: string
}

type CreateProductInput = ProductMutationInput
type UpdateProductInput = Partial<CreateProductInput>

const PAGE_SIZE = 4

const initialCategories: Category[] = [
  { id: 'cat-electronics', name: 'Electronics' },
  { id: 'cat-office', name: 'Office' },
  { id: 'cat-storage', name: 'Storage' },
  { id: 'cat-accessories', name: 'Accessories' },
]

const initialSuppliers: Supplier[] = [
  {
    id: 'sup-tech-hub',
    name: 'Tech Hub Distributors',
    email: 'sales@techhub.example',
  },
  {
    id: 'sup-workflow-goods',
    name: 'Workflow Goods Co.',
    email: 'team@workflowgoods.example',
  },
  {
    id: 'sup-storage-house',
    name: 'Storage House Supply',
    email: 'orders@storagehouse.example',
  },
  {
    id: 'sup-studio-retail',
    name: 'Studio Retail Partners',
    email: 'hello@studioretail.example',
  },
]

const initialProducts: Product[] = [
  {
    id: 'prod-laptop-13',
    name: '13in Ultralight Laptop',
    sku: 'LAP-013',
    price: 1299,
    stock: 12,
    categoryId: 'cat-electronics',
    supplierId: 'sup-tech-hub',
  },
  {
    id: 'prod-mouse-wireless',
    name: 'Wireless Mouse',
    sku: 'MOU-210',
    price: 39,
    stock: 48,
    categoryId: 'cat-electronics',
    supplierId: 'sup-tech-hub',
  },
  {
    id: 'prod-keyboard-mechanical',
    name: 'Mechanical Keyboard',
    sku: 'KEY-330',
    price: 119,
    stock: 22,
    categoryId: 'cat-electronics',
    supplierId: 'sup-tech-hub',
  },
  {
    id: 'prod-chair-ergonomic',
    name: 'Ergonomic Office Chair',
    sku: 'CHR-401',
    price: 249,
    stock: 18,
    categoryId: 'cat-office',
    supplierId: 'sup-workflow-goods',
  },
  {
    id: 'prod-desk-standing',
    name: 'Standing Desk',
    sku: 'DSK-120',
    price: 499,
    stock: 9,
    categoryId: 'cat-office',
    supplierId: 'sup-workflow-goods',
  },
  {
    id: 'prod-lamp-task',
    name: 'Task Desk Lamp',
    sku: 'LMP-415',
    price: 79,
    stock: 31,
    categoryId: 'cat-office',
    supplierId: 'sup-studio-retail',
  },
  {
    id: 'prod-bin-stackable',
    name: 'Stackable Storage Bin',
    sku: 'BIN-510',
    price: 29,
    stock: 64,
    categoryId: 'cat-storage',
    supplierId: 'sup-storage-house',
  },
  {
    id: 'prod-rack-wire',
    name: 'Wire Shelving Rack',
    sku: 'RCK-610',
    price: 159,
    stock: 14,
    categoryId: 'cat-storage',
    supplierId: 'sup-storage-house',
  },
  {
    id: 'prod-notebook-grid',
    name: 'Grid Notebook Set',
    sku: 'NTB-205',
    price: 24,
    stock: 120,
    categoryId: 'cat-accessories',
    supplierId: 'sup-studio-retail',
  },
  {
    id: 'prod-cable-usbc',
    name: 'USB-C Charging Cable',
    sku: 'CBL-118',
    price: 19,
    stock: 85,
    categoryId: 'cat-accessories',
    supplierId: 'sup-tech-hub',
  },
]

const categories: Category[] = initialCategories.map(cloneCategory)
const suppliers: Supplier[] = initialSuppliers.map(cloneSupplier)
const products: Product[] = initialProducts.map(cloneProduct)

let productSequence = 900

export function listProductsResponse(
  searchParams = new URLSearchParams(),
): Response {
  return Response.json(listProducts(searchParams))
}

export function getProductResponse(productId: string): Response {
  const product = findProductById(productId)

  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 })
  }

  return Response.json(cloneProduct(product))
}

export async function createProductResponse(
  request: Request,
): Promise<Response> {
  const input = await readJsonBody(request)

  if (!isValidCreateProductInput(input)) {
    return Response.json(
      { message: 'Invalid product payload' },
      { status: 400 },
    )
  }

  return Response.json(createProduct(input), { status: 201 })
}

export async function updateProductResponse(
  productId: string,
  request: Request,
): Promise<Response> {
  const input = await readJsonBody(request)

  if (!isValidUpdateProductInput(input)) {
    return Response.json({ message: 'Invalid product update' }, { status: 400 })
  }

  const product = updateProduct(productId, input)

  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 })
  }

  return Response.json(product)
}

export function listProducts(
  searchParams: URLSearchParams,
): ProductsListResponse {
  const q = searchParams.get('q')?.trim().toLowerCase() ?? ''
  const category = searchParams.get('category')?.trim() ?? ''
  const sort = searchParams.get('sort') ?? 'name-asc'
  const pageParam = Number.parseInt(searchParams.get('page') ?? '1', 10)
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1

  let filteredProducts = products.map(cloneProduct)

  if (q) {
    filteredProducts = filteredProducts.filter((product) => {
      const searchable = `${product.name} ${product.sku}`.toLowerCase()
      return searchable.includes(q)
    })
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.categoryId === category,
    )
  }

  filteredProducts.sort((left, right) => compareProducts(left, right, sort))

  const totalItems = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE

  return {
    data: filteredProducts.slice(start, start + PAGE_SIZE),
    page,
    pageSize: PAGE_SIZE,
    totalItems,
    totalPages,
  }
}

export function getProduct(productId: string): Product | undefined {
  const product = findProductById(productId)
  return product ? cloneProduct(product) : undefined
}

export function resetProductCatalog(): void {
  categories.splice(
    0,
    categories.length,
    ...initialCategories.map(cloneCategory),
  )
  suppliers.splice(0, suppliers.length, ...initialSuppliers.map(cloneSupplier))
  products.splice(0, products.length, ...initialProducts.map(cloneProduct))
  productSequence = 900
}

function createProduct(input: CreateProductInput): Product {
  productSequence += 1

  const product: Product = {
    ...input,
    id: `prod-${productSequence}`,
  }

  products.push(product)
  return cloneProduct(product)
}

function updateProduct(
  productId: string,
  updates: UpdateProductInput,
): Product | undefined {
  const product = findProductById(productId)

  if (!product) {
    return undefined
  }

  Object.assign(product, updates)
  return cloneProduct(product)
}

async function readJsonBody(request: Request): Promise<unknown> {
  try {
    return await request.json()
  } catch {
    return undefined
  }
}

function compareProducts(left: Product, right: Product, sort: string): number {
  switch (sort) {
    case 'price-desc':
      return right.price - left.price
    case 'price-asc':
      return left.price - right.price
    case 'stock-desc':
      return right.stock - left.stock
    case 'stock-asc':
      return left.stock - right.stock
    case 'name-desc':
      return right.name.localeCompare(left.name)
    case 'name-asc':
    default:
      return left.name.localeCompare(right.name)
  }
}

function isValidCreateProductInput(
  input: unknown,
): input is CreateProductInput {
  if (!isPlainObject(input) || !hasOnlyAllowedCreateKeys(input)) {
    return false
  }

  return (
    isNonEmptyString(input.name) &&
    isNonEmptyString(input.sku) &&
    isValidPrice(input.price) &&
    isValidStock(input.stock) &&
    isExistingCategoryId(input.categoryId) &&
    isExistingSupplierId(input.supplierId)
  )
}

function isValidUpdateProductInput(
  input: unknown,
): input is UpdateProductInput {
  if (!isPlainObject(input)) {
    return false
  }

  const entries = Object.entries(input)
  if (entries.length === 0) {
    return false
  }

  return entries.every(([key, value]) => {
    switch (key) {
      case 'name':
        return isNonEmptyString(value)
      case 'sku':
        return isNonEmptyString(value)
      case 'categoryId':
        return isExistingCategoryId(value)
      case 'supplierId':
        return isExistingSupplierId(value)
      case 'price':
        return isValidPrice(value)
      case 'stock':
        return isValidStock(value)
      default:
        return false
    }
  })
}

function hasOnlyAllowedCreateKeys(input: Record<string, unknown>): boolean {
  const allowedKeys = [
    'name',
    'sku',
    'price',
    'stock',
    'categoryId',
    'supplierId',
  ]
  const inputKeys = Object.keys(input)

  return (
    inputKeys.length === allowedKeys.length &&
    inputKeys.every((key) => allowedKeys.includes(key))
  )
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidPrice(value: unknown): value is number {
  return isNonNegativeFiniteNumber(value)
}

function isValidStock(value: unknown): value is number {
  return isNonNegativeFiniteNumber(value)
}

function isNonNegativeFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

function isExistingCategoryId(value: unknown): value is string {
  return (
    isNonEmptyString(value) &&
    categories.some((category) => category.id === value)
  )
}

function isExistingSupplierId(value: unknown): value is string {
  return (
    isNonEmptyString(value) &&
    suppliers.some((supplier) => supplier.id === value)
  )
}

function findProductById(productId: string): Product | undefined {
  return products.find((product) => product.id === productId)
}

function cloneCategory(category: Category): Category {
  return { ...category }
}

function cloneSupplier(supplier: Supplier): Supplier {
  return { ...supplier }
}

function cloneProduct(product: Product): Product {
  return { ...product }
}
