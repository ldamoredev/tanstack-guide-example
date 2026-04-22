import type { Category } from "../types/category.js";
import type { Product, CreateProductInput, UpdateProductInput } from "../types/product.js";
import type { Supplier } from "../types/supplier.js";

const initialCategories: Category[] = [
  { id: "cat-electronics", name: "Electronics" },
  { id: "cat-office", name: "Office" },
  { id: "cat-storage", name: "Storage" },
  { id: "cat-accessories", name: "Accessories" },
];

const initialSuppliers: Supplier[] = [
  {
    id: "sup-tech-hub",
    name: "Tech Hub Distributors",
    email: "sales@techhub.example",
  },
  {
    id: "sup-workflow-goods",
    name: "Workflow Goods Co.",
    email: "team@workflowgoods.example",
  },
  {
    id: "sup-storage-house",
    name: "Storage House Supply",
    email: "orders@storagehouse.example",
  },
  {
    id: "sup-studio-retail",
    name: "Studio Retail Partners",
    email: "hello@studioretail.example",
  },
];

const initialProducts: Product[] = [
  {
    id: "prod-laptop-13",
    name: "13in Ultralight Laptop",
    sku: "LAP-013",
    price: 1299,
    stock: 12,
    categoryId: "cat-electronics",
    supplierId: "sup-tech-hub",
  },
  {
    id: "prod-mouse-wireless",
    name: "Wireless Mouse",
    sku: "MOU-210",
    price: 39,
    stock: 48,
    categoryId: "cat-electronics",
    supplierId: "sup-tech-hub",
  },
  {
    id: "prod-keyboard-mechanical",
    name: "Mechanical Keyboard",
    sku: "KEY-330",
    price: 119,
    stock: 22,
    categoryId: "cat-electronics",
    supplierId: "sup-tech-hub",
  },
  {
    id: "prod-chair-ergonomic",
    name: "Ergonomic Office Chair",
    sku: "CHR-401",
    price: 249,
    stock: 18,
    categoryId: "cat-office",
    supplierId: "sup-workflow-goods",
  },
  {
    id: "prod-desk-standing",
    name: "Standing Desk",
    sku: "DSK-120",
    price: 499,
    stock: 9,
    categoryId: "cat-office",
    supplierId: "sup-workflow-goods",
  },
  {
    id: "prod-lamp-task",
    name: "Task Desk Lamp",
    sku: "LMP-415",
    price: 79,
    stock: 31,
    categoryId: "cat-office",
    supplierId: "sup-studio-retail",
  },
  {
    id: "prod-bin-stackable",
    name: "Stackable Storage Bin",
    sku: "BIN-510",
    price: 29,
    stock: 64,
    categoryId: "cat-storage",
    supplierId: "sup-storage-house",
  },
  {
    id: "prod-rack-wire",
    name: "Wire Shelving Rack",
    sku: "RCK-610",
    price: 159,
    stock: 14,
    categoryId: "cat-storage",
    supplierId: "sup-storage-house",
  },
  {
    id: "prod-notebook-grid",
    name: "Grid Notebook Set",
    sku: "NTB-205",
    price: 24,
    stock: 120,
    categoryId: "cat-accessories",
    supplierId: "sup-studio-retail",
  },
  {
    id: "prod-cable-usbc",
    name: "USB-C Charging Cable",
    sku: "CBL-118",
    price: 19,
    stock: 85,
    categoryId: "cat-accessories",
    supplierId: "sup-tech-hub",
  },
];

function cloneCategory(category: Category): Category {
  return { ...category };
}

function cloneSupplier(supplier: Supplier): Supplier {
  return { ...supplier };
}

function cloneProduct(product: Product): Product {
  return { ...product };
}

export const categories: Category[] = initialCategories.map(cloneCategory);
export const suppliers: Supplier[] = initialSuppliers.map(cloneSupplier);
export const products: Product[] = initialProducts.map(cloneProduct);

let productSequence = 900;

export function listProducts(): Product[] {
  return products;
}

export function findProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function categoryExists(id: string): boolean {
  return categories.some((category) => category.id === id);
}

export function supplierExists(id: string): boolean {
  return suppliers.some((supplier) => supplier.id === id);
}

export function createProduct(input: CreateProductInput): Product {
  productSequence += 1;

  const product: Product = {
    ...input,
    id: `prod-${productSequence}`,
  };

  products.push(product);

  return product;
}

export function updateProduct(
  id: string,
  updates: UpdateProductInput,
): Product | undefined {
  const product = findProductById(id);

  if (!product) {
    return undefined;
  }

  Object.assign(product, updates);

  return product;
}

export function resetMockData(): void {
  categories.splice(0, categories.length, ...initialCategories.map(cloneCategory));
  suppliers.splice(0, suppliers.length, ...initialSuppliers.map(cloneSupplier));
  products.splice(0, products.length, ...initialProducts.map(cloneProduct));
  productSequence = 900;
}
