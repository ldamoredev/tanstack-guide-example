import { Link, createFileRoute } from '@tanstack/react-router'
import { DEFAULT_PRODUCTS_SEARCH } from '#/modules/products'
import { useI18n } from '#/lib/i18n'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const { copy, locale } = useI18n()

  return (
    <main className="page-wrap px-4 pb-10 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.6),transparent)]" />
        <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_70%)] blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 right-0 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_72%)] blur-2xl" />
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--route">
            {copy.header.nav.overview.toLowerCase()}
          </span>
          <span className="lab-chip lab-chip--data">
            {copy.products.chips.dataBacked}
          </span>
          <span className="lab-chip lab-chip--static">
            {copy.footer.chips.staticRefs.toLowerCase()}
          </span>
          <span className="lab-chip lab-chip--tooling">
            {copy.header.nav.tooling.toLowerCase()}
          </span>
        </div>
        <p className="island-kicker mb-3">{copy.home.kicker}</p>
        <h1 className="display-title mb-5 max-w-4xl text-4xl leading-[0.96] font-bold text-[var(--sea-ink)] sm:text-6xl">
          {copy.home.title}
        </h1>
        <p className="mb-8 max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
          {copy.home.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/cheat-sheet" className="lab-button">
            {copy.home.ctaGuide}
          </Link>
          <Link to="/dashboard" className="lab-button lab-button-secondary">
            {copy.home.ctaRouteMap}
          </Link>
          <Link
            to="/products"
            search={DEFAULT_PRODUCTS_SEARCH}
            className="lab-button lab-button-secondary"
          >
            {copy.home.ctaData}
          </Link>
          <Link to="/tooling" className="lab-button lab-button-secondary">
            {copy.home.ctaTooling}
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          [
            copy.header.nav.cheatSheet,
            copy.home.cards.cheatSheet,
            '/cheat-sheet',
            'lab-chip--tooling',
          ],
          [
            copy.header.nav.routes,
            copy.home.cards.routes,
            '/dashboard',
            'lab-chip--route',
          ],
          [
            copy.header.nav.data,
            copy.home.cards.data,
            '/products',
            'lab-chip--data',
          ],
          [
            copy.header.nav.tooling,
            copy.home.cards.tooling,
            '/tooling',
            'lab-chip--tooling',
          ],
          [
            copy.header.nav.static,
            copy.home.cards.categories,
            '/categories',
            'lab-chip--static',
          ],
        ].map(([title, desc, to, tone], index) => (
          <article
            key={title}
            className="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <span className={`lab-chip mb-3 ${tone}`}>{title}</span>
            <h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
              {title}
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {desc}
            </p>
            <Link
              {...(to === '/products'
                ? { to: '/products', search: DEFAULT_PRODUCTS_SEARCH }
                : { to })}
              className="mt-4 inline-flex text-sm font-semibold text-[var(--lagoon-deep)] no-underline"
            >
              {locale === 'es' ? `Abrir ${title}` : `Open ${title}`}
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="island-shell rounded-2xl p-6">
          <p className="island-kicker mb-3">{copy.home.routeMap}</p>
          <div className="grid gap-3 text-sm text-[var(--sea-ink-soft)] md:grid-cols-2">
            {copy.home.routeMapItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--surface)_80%,transparent_20%)] px-4 py-3"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="island-shell rounded-2xl p-6">
          <p className="island-kicker mb-3">{copy.home.howToExplore}</p>
          <ol className="m-0 grid gap-3 pl-5 text-sm leading-7 text-[var(--sea-ink-soft)]">
            {copy.home.howToExploreItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </section>
    </main>
  )
}
