import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '#/lib/i18n'

export const Route = createFileRoute('/categories')({
  component: Categories,
})

function Categories() {
  const { copy } = useI18n()
  const categories = [
    { code: 'FURN', name: copy.categories.names.furniture, products: 12 },
    { code: 'EQP', name: copy.categories.names.equipment, products: 7 },
    { code: 'ACC', name: copy.categories.names.accessories, products: 18 },
  ]

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--static">{copy.categories.chips.static}</span>
          <span className="lab-chip lab-chip--route">{copy.categories.chips.comparisonRoute}</span>
        </div>
        <p className="island-kicker mb-2">Categories</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.categories.title}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.categories.description}
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {categories.map((category) => (
          <article key={category.code} className="feature-card rounded-2xl p-5">
            <p className="island-kicker mb-2">{category.code}</p>
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
              {category.name}
            </h2>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
              {copy.categories.staticExample(category.products)}
            </p>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <p className="island-kicker mb-2">{copy.categories.why}</p>
        <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
          {copy.categories.whyText}
        </p>
      </section>
    </main>
  )
}
