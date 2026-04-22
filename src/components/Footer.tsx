import { useI18n } from '#/lib/i18n'
import { CREATOR_GITHUB_URL } from '#/lib/creator'

export default function Footer() {
  const year = new Date().getFullYear()
  const { copy } = useI18n()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="m-0 text-sm text-[var(--sea-ink)]">
            {copy.footer.description}
          </p>
          <p className="lab-note mt-2">
            &copy; {year} {copy.footer.built}
          </p>
          <a
            href={CREATOR_GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="lab-note mt-2 inline-flex text-[var(--lagoon-deep)] no-underline hover:text-[var(--sea-ink)]"
          >
            {copy.footer.creator}
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="lab-chip lab-chip--route">
            {copy.footer.chips.router}
          </span>
          <span className="lab-chip lab-chip--data">
            {copy.footer.chips.query}
          </span>
          <span className="lab-chip lab-chip--tooling">
            {copy.footer.chips.tooling}
          </span>
          <span className="lab-chip lab-chip--static">
            {copy.footer.chips.staticRefs}
          </span>
        </div>
      </div>
      <div className="page-wrap mt-5 flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-5 text-center sm:flex-row sm:text-left">
        <p className="island-kicker m-0">{copy.footer.shell}</p>
        <div className="flex justify-center gap-4">
          <a
            href="https://x.com/tan_stack"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
          >
            <span className="sr-only">{copy.footer.x}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true" width="28" height="28">
              <path
                fill="currentColor"
                d="M12.6 1h2.2L10 6.48 15.64 15h-4.41L7.78 9.82 3.23 15H1l5.14-5.84L.72 1h4.52l3.12 4.73L12.6 1zm-.77 12.67h1.22L4.57 2.26H3.26l8.57 11.41z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/TanStack"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
          >
            <span className="sr-only">{copy.footer.github}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true" width="28" height="28">
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
