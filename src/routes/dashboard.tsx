import { createFileRoute, Link } from '@tanstack/react-router'
import { useI18n } from '#/lib/i18n'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { copy, locale } = useI18n()
  const cards = [
    {
      title: copy.header.nav.overview,
      description: copy.dashboard.cards.overview,
      to: '/',
      tone: 'lab-chip--route',
    },
    {
      title: 'Products',
      description: copy.dashboard.cards.products,
      to: '/products',
      tone: 'lab-chip--data',
    },
    {
      title: 'Categories',
      description: copy.dashboard.cards.categories,
      to: '/categories',
      tone: 'lab-chip--static',
    },
    {
      title: copy.header.nav.tooling,
      description: copy.dashboard.cards.tooling,
      to: '/tooling',
      tone: 'lab-chip--tooling',
    },
  ]

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--route">
            {copy.dashboard.chips.routeMap}
          </span>
          <span className="lab-chip lab-chip--tooling">
            {copy.dashboard.chips.navigationModel}
          </span>
        </div>
        <p className="island-kicker mb-2">{copy.header.nav.routes}</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.dashboard.title}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.dashboard.description}
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="feature-card rounded-2xl p-5">
            <span className={`lab-chip mb-3 ${card.tone}`}>{card.title}</span>
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
              {card.title}
            </h2>
            <p className="mb-4 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {card.description}
            </p>
            <Link
              to={card.to}
              className="text-sm font-semibold text-[var(--lagoon-deep)] no-underline"
            >
              {locale === 'es' ? `Abrir ${card.title}` : `Open ${card.title}`}
            </Link>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <p className="island-kicker mb-2">{copy.dashboard.readingOrder}</p>
        <p className="m-0 max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)]">
          {copy.dashboard.readingOrderText}
        </p>
      </section>
    </main>
  )
}
