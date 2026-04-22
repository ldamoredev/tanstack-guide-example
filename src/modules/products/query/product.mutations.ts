import type { QueryClient } from '@tanstack/react-query'
import { mutationOptions } from '@tanstack/react-query'
import { createProduct, updateProduct } from '../api/client'
import type { ProductMutationInput } from '../model/form'

export interface UpdateProductMutationVariables {
  productId: string
  input: ProductMutationInput
}

export function createProductMutationOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationKey: ['products', 'create'] as const,
    mutationFn: (input: ProductMutationInput) => createProduct(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })
}

export function updateProductMutationOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationKey: ['products', 'update'] as const,
    mutationFn: ({ productId, input }: UpdateProductMutationVariables) =>
      updateProduct(productId, input),
    onSuccess: async (product) => {
      await queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      await queryClient.invalidateQueries({
        queryKey: ['products', product.id],
      })
    },
  })
}
