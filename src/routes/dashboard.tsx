import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

const cards = [
  {
    title: 'Overview',
    description: 'Start at the orientation screen and pick the next concept to inspect.',
    to: '/',
    tone: 'lab-chip--route',
  },
  {
    title: 'Products',
    description: 'Main data-backed route for loaders, cache hydration, and mutations.',
    to: '/products',
    tone: 'lab-chip--data',
  },
  {
    title: 'Categories',
    description: 'Static reference surface that stays intentionally simple.',
    to: '/categories',
    tone: 'lab-chip--static',
  },
  {
    title: 'Suppliers',
    description: 'Companion static route for contrast against the dynamic flow.',
    to: '/suppliers',
    tone: 'lab-chip--static',
  },
  {
    title: 'Tooling',
    description: 'Inspect Devtools, commands, and the TanStack mental model.',
    to: '/tooling',
    tone: 'lab-chip--tooling',
  },
]

function Dashboard() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--route">route map</span>
          <span className="lab-chip lab-chip--tooling">navigation model</span>
        </div>
        <p className="island-kicker mb-2">Routes</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Trace the route graph before you dive into the code.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Use this screen as a quick map of the playground. It tells you which
          routes are there for framing, which ones are intentionally static, and
          where the real data-backed TanStack behavior lives.
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
              Open {card.title}
            </Link>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <p className="island-kicker mb-2">Reading order</p>
        <p className="m-0 max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)]">
          `Overview` explains the playground. `Products` shows the most complete
          dynamic flow. `Categories` and `Suppliers` stay static on purpose so
          the contrast is visible. `Tooling` is where you inspect behavior
          instead of guessing.
        </p>
      </section>
    </main>
  )
}
