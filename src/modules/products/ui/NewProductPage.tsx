import { ProductForm } from './ProductForm'
import { useI18n } from '#/lib/i18n'
import { getDefaultProductFormValues } from '../model/form'
import { useCreateProductFlow } from '../application/useCreateProductFlow'

export function NewProductPage() {
  const { copy } = useI18n()
  const { submit } = useCreateProductFlow()

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--route">{copy.products.chips.mutation}</span>
          <span className="lab-chip lab-chip--tooling">{copy.products.chips.tanstackForm}</span>
          <span className="lab-chip lab-chip--data">{copy.products.chips.tanstackQuery}</span>
        </div>
        <p className="island-kicker mb-2">{copy.products.mutation.createKicker}</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.products.mutation.createTitle}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.products.mutation.createDescription}
        </p>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-5">
        <ProductForm
          defaultValues={getDefaultProductFormValues()}
          submitLabel={copy.products.mutation.createProduct}
          onSubmit={submit}
        />
      </section>
    </main>
  )
}
