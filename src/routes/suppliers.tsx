import { createFileRoute } from '@tanstack/react-router'

const suppliers = [
  { name: 'Northwind Supply', status: 'Preferred', eta: '2 days' },
  { name: 'Acme Wholesale', status: 'Onboarding', eta: '4 days' },
  { name: 'Metro Distributors', status: 'Active', eta: '1 day' },
]

export const Route = createFileRoute('/suppliers')({
  component: Suppliers,
})

function Suppliers() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--static">static</span>
          <span className="lab-chip lab-chip--route">reference route</span>
        </div>
        <p className="island-kicker mb-2">Suppliers</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Static supplier route for quick structure checks.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Static reference surface for comparing simple route rendering with the
          more dynamic data-backed areas. It is intentionally useful without
          pretending to be finished backend work.
        </p>
      </section>

      <section className="mt-8 grid gap-4">
        {suppliers.map((supplier) => (
          <article
            key={supplier.name}
            className="feature-card flex flex-col gap-2 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="mb-1 text-lg font-semibold text-[var(--sea-ink)]">
                {supplier.name}
              </h2>
              <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
                Static example delivery estimate: {supplier.eta}
              </p>
            </div>
            <p className="island-kicker m-0">{supplier.status}</p>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <p className="island-kicker mb-2">Learning cue</p>
        <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
          Use this route as a reminder that not every page needs data wiring.
          Sometimes the clearest teaching surface is the one that holds still.
        </p>
      </section>
    </main>
  )
}
