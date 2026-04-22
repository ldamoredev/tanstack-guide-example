import { Router } from "express";

import {
  categoryExists,
  createProduct,
  findProductById,
  listProducts,
  supplierExists,
  updateProduct,
} from "../data/mockData.js";
import type { CreateProductInput, Product, UpdateProductInput } from "../types/product.js";

const PAGE_SIZE = 4;

const productsRouter = Router();

productsRouter.get("/", (request, response) => {
  const q = typeof request.query.q === "string" ? request.query.q.trim().toLowerCase() : "";
  const category =
    typeof request.query.category === "string" ? request.query.category.trim() : "";
  const sort = typeof request.query.sort === "string" ? request.query.sort : "name-asc";
  const pageParam = typeof request.query.page === "string" ? Number.parseInt(request.query.page, 10) : 1;
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  let filteredProducts = [...listProducts()];

  if (q) {
    filteredProducts = filteredProducts.filter((product) => {
      const searchable = `${product.name} ${product.sku}`.toLowerCase();
      return searchable.includes(q);
    });
  }

  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.categoryId === category);
  }

  filteredProducts.sort((left, right) => compareProducts(left, right, sort));

  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const data = filteredProducts.slice(start, start + PAGE_SIZE);

  response.json({
    data,
    page,
    pageSize: PAGE_SIZE,
    totalItems,
    totalPages,
  });
});

productsRouter.get("/:id", (request, response) => {
  const product = findProductById(request.params.id);

  if (!product) {
    response.status(404).json({ message: "Product not found" });
    return;
  }

  response.json(product);
});

productsRouter.post("/", (request, response) => {
  const input = request.body as unknown;

  if (!isValidCreateProductInput(input)) {
    response.status(400).json({ message: "Invalid product payload" });
    return;
  }

  const product = createProduct(input);
  response.status(201).json(product);
});

productsRouter.patch("/:id", (request, response) => {
  const updates = request.body as UpdateProductInput;

  if (!isValidUpdateProductInput(updates)) {
    response.status(400).json({ message: "Invalid product update" });
    return;
  }

  const product = updateProduct(request.params.id, updates);

  if (!product) {
    response.status(404).json({ message: "Product not found" });
    return;
  }

  response.json(product);
});

function compareProducts(left: Product, right: Product, sort: string): number {
  switch (sort) {
    case "price-desc":
      return right.price - left.price;
    case "price-asc":
      return left.price - right.price;
    case "stock-desc":
      return right.stock - left.stock;
    case "stock-asc":
      return left.stock - right.stock;
    case "name-desc":
      return right.name.localeCompare(left.name);
    case "name-asc":
    default:
      return left.name.localeCompare(right.name);
  }
}

function isValidCreateProductInput(
  input: unknown,
): input is CreateProductInput {
  if (!isPlainObject(input)) {
    return false;
  }

  if (!hasOnlyAllowedCreateKeys(input)) {
    return false;
  }

  return (
    isNonEmptyString(input.name) &&
    isNonEmptyString(input.sku) &&
    isValidPrice(input.price) &&
    isValidStock(input.stock) &&
    isExistingCategoryId(input.categoryId) &&
    isExistingSupplierId(input.supplierId)
  );
}

function isValidUpdateProductInput(
  input: UpdateProductInput,
): input is UpdateProductInput {
  if (!isPlainObject(input)) {
    return false;
  }

  const allowedEntries = Object.entries(input);

  if (allowedEntries.length === 0) {
    return false;
  }

  return allowedEntries.every(([key, value]) => {
    switch (key) {
      case "name":
        return isNonEmptyString(value);
      case "sku":
        return isNonEmptyString(value);
      case "categoryId":
        return isExistingCategoryId(value);
      case "supplierId":
        return isExistingSupplierId(value);
      case "price":
        return isValidPrice(value);
      case "stock":
        return isValidStock(value);
      default:
        return false;
    }
  });
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyAllowedCreateKeys(input: Record<string, unknown>): boolean {
  const allowedKeys = [
    "name",
    "sku",
    "price",
    "stock",
    "categoryId",
    "supplierId",
  ];
  const inputKeys = Object.keys(input);

  return (
    inputKeys.length === allowedKeys.length &&
    inputKeys.every((key) => allowedKeys.includes(key))
  );
}

function isNonNegativeFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isValidPrice(value: unknown): value is number {
  return isNonNegativeFiniteNumber(value);
}

function isValidStock(value: unknown): value is number {
  return isNonNegativeFiniteNumber(value);
}

function isExistingCategoryId(value: unknown): value is string {
  return isNonEmptyString(value) && categoryExists(value);
}

function isExistingSupplierId(value: unknown): value is string {
  return isNonEmptyString(value) && supplierExists(value);
}

export default productsRouter;
