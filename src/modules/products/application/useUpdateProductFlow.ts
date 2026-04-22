import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { ProductMutationInput } from '../model/form'
import { updateProductMutationOptions } from '../query/product.mutations'
import { productDetailQueryOptions } from '../query/product.queries'

export function useUpdateProductFlow(productId: string) {
  const navigate = useNavigate({ from: '/products/$productId/edit' })
  const queryClient = useQueryClient()
  const updateProductMutation = useMutation(
    updateProductMutationOptions(queryClient),
  )

  return {
    submit: async (input: ProductMutationInput) => {
      const updatedProduct = await updateProductMutation.mutateAsync({
        productId,
        input,
      })

      queryClient.setQueryData(
        productDetailQueryOptions(updatedProduct.id).queryKey,
        updatedProduct,
      )

      await navigate({
        to: '/products/$productId',
        params: { productId: updatedProduct.id },
      })
    },
  }
}
