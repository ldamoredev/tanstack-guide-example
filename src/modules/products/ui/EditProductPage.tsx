import { ProductForm } from './ProductForm'
import { toProductFormValues } from '../model/form'
import { useUpdateProductFlow } from '../application/useUpdateProductFlow'
import type { Product } from '../model/types'

interface EditProductPageProps {
  product: Product
  productId: string
}

export function EditProductPage({
  product,
  productId,
}: EditProductPageProps) {
  const { submit } = useUpdateProductFlow(productId)

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--route">mutation</span>
          <span className="lab-chip lab-chip--tooling">tanstack form</span>
          <span className="lab-chip lab-chip--data">tanstack query</span>
        </div>
        <p className="island-kicker mb-2">Edit Product</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Mutation workspace: update {product.name}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          You are performing a state change with data already hydrated by the
          route loader. This edit flow reuses the same TanStack Form component
          while TanStack Query owns the update mutation.
        </p>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-5">
        <ProductForm
          defaultValues={toProductFormValues(product)}
          submitLabel="Save changes"
          onSubmit={submit}
        />
      </section>
    </main>
  )
}
