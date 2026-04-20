import { ProductForm } from './ProductForm'
import { getDefaultProductFormValues } from '../model/form'
import { useCreateProductFlow } from '../application/useCreateProductFlow'

export function NewProductPage() {
  const { submit } = useCreateProductFlow()

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--route">mutation</span>
          <span className="lab-chip lab-chip--tooling">tanstack form</span>
          <span className="lab-chip lab-chip--data">tanstack query</span>
        </div>
        <p className="island-kicker mb-2">Create Product</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Mutation workspace: create a product
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          You are performing a state change in the product workspace. This form
          uses TanStack Form for field state and validation, then TanStack Query
          for the create mutation.
        </p>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-5">
        <ProductForm
          defaultValues={getDefaultProductFormValues()}
          submitLabel="Create product"
          onSubmit={submit}
        />
      </section>
    </main>
  )
}
