import { Link } from '@tanstack/react-router'
import { DEFAULT_PRODUCTS_SEARCH } from '#/modules/products'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--header-bg)_84%,transparent_16%)] px-4 backdrop-blur-xl">
      <nav className="page-wrap flex flex-wrap items-center gap-x-4 gap-y-3 py-3 sm:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link
            to="/"
            className="inline-flex min-w-0 items-center gap-3 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-2 text-sm text-[var(--sea-ink)] no-underline shadow-[0_16px_32px_rgba(15,23,42,0.1)] sm:px-4"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[0.85rem] bg-[linear-gradient(135deg,var(--lagoon),#7dd3fc)] font-mono text-[0.72rem] font-bold tracking-[0.16em] text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.22)]">
              TS
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight sm:text-base">
                TanStack Learning Playground
              </span>
              <span className="lab-note hidden sm:block">
                personal lab for routes, loaders, and query flow
              </span>
            </span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="lab-chip lab-chip--route hidden lg:inline-flex">
            solo workspace
          </span>
          <ThemeToggle />
        </div>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-2 pb-1 text-sm font-semibold sm:order-2 sm:w-auto sm:flex-nowrap sm:pb-0">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
            activeOptions={{ exact: true }}
          >
            Overview
          </Link>
          <Link
            to="/dashboard"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Routes
          </Link>
          <Link
            to="/products"
            search={DEFAULT_PRODUCTS_SEARCH}
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Data
          </Link>
          <Link
            to="/categories"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Static
          </Link>
          <Link
            to="/tooling"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Tooling
          </Link>
          <Link
            to="/suppliers"
            className="lab-note no-underline transition hover:text-[var(--sea-ink)]"
          >
            Suppliers
          </Link>
        </div>
      </nav>
    </header>
  )
}
