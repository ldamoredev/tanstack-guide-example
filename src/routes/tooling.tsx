import { Link, createFileRoute } from '@tanstack/react-router'
import { DEFAULT_PRODUCTS_SEARCH } from '#/modules/products'
import { getToolingCommands } from '#/features/tooling/tooling'

export const Route = createFileRoute('/tooling')({
  component: ToolingPage,
})

function ToolingPage() {
  const commands = getToolingCommands()

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--tooling">tooling</span>
          <span className="lab-chip lab-chip--route">inspection</span>
        </div>
        <p className="island-kicker mb-2">Tooling</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Open the instrument panel instead of guessing.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          This route keeps the route tree, query behavior, and core commands in
          view while you work through the playground.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/"
            className="lab-button"
          >
            Back to Overview
          </Link>
          <Link
            to="/products"
            search={DEFAULT_PRODUCTS_SEARCH}
            className="lab-button lab-button-secondary"
          >
            Open products
          </Link>
        </div>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-5">
        <h2 className="mt-0 text-xl font-semibold text-[var(--sea-ink)]">
          What to inspect
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="feature-card rounded-2xl p-4">
            <h3 className="mt-0 text-base font-semibold text-[var(--sea-ink)]">
              Router Devtools
            </h3>
            <p className="mb-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              Use this to inspect the route tree, params, search params, and the
              current matched route.
            </p>
          </article>
          <article className="feature-card rounded-2xl p-4">
            <h3 className="mt-0 text-base font-semibold text-[var(--sea-ink)]">
              Query Devtools
            </h3>
            <p className="mb-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              Use this to inspect query keys, cache freshness, refetches, and
              invalidation after mutations.
            </p>
          </article>
          <article className="feature-card rounded-2xl p-4">
            <h3 className="mt-0 text-base font-semibold text-[var(--sea-ink)]">
              DB Mental Model
            </h3>
            <p className="mb-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              TanStack DB is your reactive client collection layer on top of
              fetching, not your backend database.
            </p>
          </article>
        </div>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-5">
        <h2 className="mt-0 text-xl font-semibold text-[var(--sea-ink)]">
          Core commands
        </h2>
        <div className="grid gap-3">
          {commands.map((item) => (
            <article
              key={item.command}
              className="feature-card rounded-2xl p-4"
            >
              <p className="mt-0 mb-2 font-mono text-sm text-[var(--sea-ink)]">
                {item.command}
              </p>
              <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
                {item.purpose}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
