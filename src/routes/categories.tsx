import { createFileRoute } from '@tanstack/react-router'

const categories = [
  { code: 'FURN', name: 'Furniture', products: 12 },
  { code: 'EQP', name: 'Equipment', products: 7 },
  { code: 'ACC', name: 'Accessories', products: 18 },
]

export const Route = createFileRoute('/categories')({
  component: Categories,
})

function Categories() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--static">static</span>
          <span className="lab-chip lab-chip--route">comparison route</span>
        </div>
        <p className="island-kicker mb-2">Categories</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Static reference surface for route contrast.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          This route stays static on purpose. It helps you compare a lightweight
          page shell against the app&apos;s more dynamic TanStack flows without
          adding backend noise.
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
              Static example: {category.products} products assigned
            </p>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <p className="island-kicker mb-2">Why this matters</p>
        <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
          When you switch back to `Products`, the differences in loaders, query
          hydration, and mutation state become easier to notice because this
          route remains intentionally simple.
        </p>
      </section>
    </main>
  )
}
