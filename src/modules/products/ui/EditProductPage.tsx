import { ProductForm } from './ProductForm'
import { useI18n } from '#/lib/i18n'
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
  const { copy } = useI18n()
  const { submit } = useUpdateProductFlow(productId)

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--route">{copy.products.chips.mutation}</span>
          <span className="lab-chip lab-chip--tooling">{copy.products.chips.tanstackForm}</span>
          <span className="lab-chip lab-chip--data">{copy.products.chips.tanstackQuery}</span>
        </div>
        <p className="island-kicker mb-2">{copy.products.mutation.editKicker}</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.products.mutation.editTitle(product.name)}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.products.mutation.editDescription}
        </p>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-5">
        <ProductForm
          defaultValues={toProductFormValues(product)}
          submitLabel={copy.products.mutation.saveChanges}
          onSubmit={submit}
        />
      </section>
    </main>
  )
}
