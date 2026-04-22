import { createFileRoute } from '@tanstack/react-router'
import { NewProductPage } from '#/modules/products'

export const Route = createFileRoute('/products/new')({
  component: NewProductPage,
})
