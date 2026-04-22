import { createFileRoute } from '@tanstack/react-router'
import { CREATOR_GITHUB_URL } from '#/lib/creator'
import { useI18n } from '#/lib/i18n'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const { copy } = useI18n()

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">{copy.about.kicker}</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {copy.about.title}
        </h1>
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="feature-card rounded-2xl p-5">
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
              TanStack Start
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {copy.about.start}
            </p>
          </article>
          <article className="feature-card rounded-2xl p-5">
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
              TanStack Router
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {copy.about.router}
            </p>
          </article>
          <article className="feature-card rounded-2xl p-5">
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
              Nitro
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {copy.about.nitro}
            </p>
          </article>
          <article className="feature-card rounded-2xl p-5">
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
              {copy.about.apiTitle}
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {copy.about.apiRoutes}
            </p>
          </article>
          <article className="feature-card rounded-2xl p-5">
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
              {copy.about.creatorTitle}
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {copy.about.creatorText}
            </p>
            <a
              href={CREATOR_GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-[var(--lagoon-deep)] no-underline"
            >
              {copy.about.creatorLink}
            </a>
          </article>
        </div>
      </section>
    </main>
  )
}
