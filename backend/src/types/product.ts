export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  categoryId: string;
  supplierId: string;
}

export interface CreateProductInput {
  name: string;
  sku: string;
  price: number;
  stock: number;
  categoryId: string;
  supplierId: string;
}

export type UpdateProductInput = Partial<CreateProductInput>;
