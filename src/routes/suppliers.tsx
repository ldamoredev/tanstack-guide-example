import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '#/lib/i18n'

export const Route = createFileRoute('/suppliers')({
  component: Suppliers,
})

function Suppliers() {
  const { copy } = useI18n()
  const suppliers = [
    {
      name: 'Northwind Supply',
      status: copy.suppliers.status.preferred,
      eta: copy.suppliers.eta.twoDays,
    },
    {
      name: 'Acme Wholesale',
      status: copy.suppliers.status.onboarding,
      eta: copy.suppliers.eta.fourDays,
    },
    {
      name: 'Metro Distributors',
      status: copy.suppliers.status.active,
      eta: copy.suppliers.eta.oneDay,
    },
  ]

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--static">{copy.suppliers.chips.static}</span>
          <span className="lab-chip lab-chip--route">{copy.suppliers.chips.referenceRoute}</span>
        </div>
        <p className="island-kicker mb-2">{copy.header.nav.suppliers}</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.suppliers.title}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.suppliers.description}
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
                {copy.suppliers.deliveryEstimate(supplier.eta)}
              </p>
            </div>
            <p className="island-kicker m-0">{supplier.status}</p>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <p className="island-kicker mb-2">{copy.suppliers.learningCue}</p>
        <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
          {copy.suppliers.learningCueText}
        </p>
      </section>
    </main>
  )
}
