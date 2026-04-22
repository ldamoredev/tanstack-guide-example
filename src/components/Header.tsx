import { Link } from '@tanstack/react-router'
import { DEFAULT_PRODUCTS_SEARCH } from '#/modules/products'
import { useI18n } from '#/lib/i18n'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const { copy } = useI18n()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--header-bg)_84%,transparent_16%)] px-4 backdrop-blur-xl">
      <nav className="page-wrap flex flex-col gap-3 py-3 sm:gap-4 sm:py-4">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:items-center">
          <Link
            to="/"
            className="inline-flex min-w-0 max-w-full items-center gap-3 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-2 text-sm text-[var(--sea-ink)] no-underline shadow-[0_16px_32px_rgba(15,23,42,0.1)] sm:max-w-[34rem] sm:px-4"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[0.85rem] bg-[linear-gradient(135deg,var(--lagoon),#7dd3fc)] font-mono text-[0.72rem] font-bold tracking-[0.16em] text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.22)]">
              TS
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold tracking-tight sm:text-base">
                {copy.header.title}
              </span>
              <span className="lab-note hidden max-w-[26rem] sm:block">
                {copy.header.subtitle}
              </span>
            </span>
          </Link>

          <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
            <span className="lab-chip lab-chip--route hidden xl:inline-flex">
              {copy.header.soloWorkspace}
            </span>
            <LanguageToggle />
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 border-t border-[var(--line)] pt-3 sm:justify-between sm:pt-0 sm:border-t-0">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
            <span className="lab-chip lab-chip--route xl:hidden">
              {copy.header.soloWorkspace}
            </span>
            <Link
              to="/"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
              activeOptions={{ exact: true }}
            >
              {copy.header.nav.overview}
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
              to="/cheat-sheet"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {copy.header.nav.cheatSheet}
            </Link>
            <Link
              to="/tooling"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {copy.header.nav.tooling}
            </Link>
            <Link
              to="/suppliers"
              className="lab-note no-underline transition hover:text-[var(--sea-ink)]"
            >
              {copy.header.nav.suppliers}
            </Link>
          </div>

          <div className="ml-auto flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
