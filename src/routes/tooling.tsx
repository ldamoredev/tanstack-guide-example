import { Link, createFileRoute } from '@tanstack/react-router'
import { DEFAULT_PRODUCTS_SEARCH } from '#/modules/products'
import { getToolingCommands } from '#/features/tooling/tooling'
import { useI18n } from '#/lib/i18n'

export const Route = createFileRoute('/tooling')({
  component: ToolingPage,
})

function ToolingPage() {
  const { copy, locale } = useI18n()
  const commands = getToolingCommands(locale)

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--tooling">
            {copy.tooling.chips.tooling}
          </span>
          <span className="lab-chip lab-chip--route">
            {copy.tooling.chips.inspection}
          </span>
        </div>
        <p className="island-kicker mb-2">{copy.header.nav.tooling}</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.tooling.title}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.tooling.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/" className="lab-button">
            {copy.tooling.backToOverview}
          </Link>
          <Link
            to="/products"
            search={DEFAULT_PRODUCTS_SEARCH}
            className="lab-button lab-button-secondary"
          >
            {copy.tooling.openProducts}
          </Link>
          <Link to="/cheat-sheet" className="lab-button lab-button-secondary">
            {copy.tooling.openGuide}
          </Link>
        </div>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-5">
        <h2 className="mt-0 text-xl font-semibold text-[var(--sea-ink)]">
          {copy.tooling.inspectTitle}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="feature-card rounded-2xl p-4">
            <h3 className="mt-0 text-base font-semibold text-[var(--sea-ink)]">
              Router Devtools
            </h3>
            <p className="mb-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {copy.tooling.inspect.router}
            </p>
          </article>
          <article className="feature-card rounded-2xl p-4">
            <h3 className="mt-0 text-base font-semibold text-[var(--sea-ink)]">
              Query Devtools
            </h3>
            <p className="mb-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {copy.tooling.inspect.query}
            </p>
          </article>
          <article className="feature-card rounded-2xl p-4">
            <h3 className="mt-0 text-base font-semibold text-[var(--sea-ink)]">
              DB Mental Model
            </h3>
            <p className="mb-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {copy.tooling.inspect.db}
            </p>
          </article>
        </div>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-5">
        <h2 className="mt-0 text-xl font-semibold text-[var(--sea-ink)]">
          {copy.tooling.commandsTitle}
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
