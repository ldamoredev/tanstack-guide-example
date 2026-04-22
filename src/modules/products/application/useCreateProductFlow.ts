import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { ProductMutationInput } from '../model/form'
import { createProductMutationOptions } from '../query/product.mutations'
import { productDetailQueryOptions } from '../query/product.queries'

export function useCreateProductFlow() {
  const navigate = useNavigate({ from: '/products/new' })
  const queryClient = useQueryClient()
  const createProductMutation = useMutation(
    createProductMutationOptions(queryClient),
  )

  return {
    submit: async (input: ProductMutationInput) => {
      const product = await createProductMutation.mutateAsync(input)

      queryClient.setQueryData(
        productDetailQueryOptions(product.id).queryKey,
        product,
      )

      await navigate({
        to: '/products/$productId',
        params: { productId: product.id },
      })
    },
  }
}
