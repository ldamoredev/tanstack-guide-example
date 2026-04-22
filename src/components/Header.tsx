import { Link } from '@tanstack/react-router'
import { DEFAULT_PRODUCTS_SEARCH } from '#/modules/products'
import { useI18n } from '#/lib/i18n'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const { copy } = useI18n()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--header-bg)_88%,transparent_12%)] px-2 backdrop-blur-xl sm:px-4">
      <nav className="page-wrap flex flex-col gap-2 py-2 sm:gap-3 sm:py-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="inline-flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-2.5 py-2 text-sm text-[var(--sea-ink)] no-underline shadow-[0_12px_26px_rgba(15,23,42,0.1)] sm:max-w-[34rem] sm:gap-3 sm:rounded-full sm:px-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.85rem] bg-[linear-gradient(135deg,var(--lagoon),#7dd3fc)] font-mono text-[0.72rem] font-bold tracking-[0.16em] text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.22)]">
              TS
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold tracking-tight sm:text-base">
                {copy.header.title}
              </span>
              <span className="lab-note hidden max-w-[26rem] md:block">
                {copy.header.subtitle}
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <span className="lab-chip lab-chip--route hidden lg:inline-flex">
              {copy.header.soloWorkspace}
            </span>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="-mx-2 border-t border-[var(--line)] pt-2 sm:mx-0 sm:border-t-0 sm:pt-0">
          <div className="nav-scroll flex min-w-0 items-center gap-2 overflow-x-auto pb-1 text-sm font-semibold sm:gap-x-5 sm:pb-0">
            <Link
              to="/"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
              activeOptions={{ exact: true }}
            >
              {copy.header.nav.overview}
            </Link>
            <Link
              to="/cheat-sheet"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {copy.header.nav.cheatSheet}
            </Link>
            <Link
              to="/dashboard"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {copy.header.nav.routes}
            </Link>
            <Link
              to="/products"
              search={DEFAULT_PRODUCTS_SEARCH}
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {copy.header.nav.data}
            </Link>
            <Link
              to="/categories"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {copy.header.nav.static}
            </Link>
            <Link
              to="/tooling"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {copy.header.nav.tooling}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
