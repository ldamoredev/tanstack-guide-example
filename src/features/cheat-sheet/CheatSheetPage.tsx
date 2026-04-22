import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Locale } from '#/lib/i18n'
import { PROJECT_REPOSITORY_URL, cheatSheetMarkdown } from './content'
import { parseMarkdownBlocks } from './markdown'

const pageCopy = {
  en: {
    kicker: 'Study guide',
    description:
      'A repo-specific cheat-sheet for learning the TanStack pieces through this playground.',
    repoTitle: 'Clone the project',
    repoDescription:
      'Open the repository when you want to clone the project, inspect the source, or compare your local experiments against the learning app.',
    repoAction: 'Open repository',
  },
  es: {
    kicker: 'Guia de estudio',
    description:
      'Una cheat-sheet especifica del repo para aprender las piezas de TanStack desde este playground.',
    repoTitle: 'Clona el proyecto',
    repoDescription:
      'Abre el repositorio cuando quieras clonar el proyecto, inspeccionar el codigo o comparar tus experimentos locales contra la app de aprendizaje.',
    repoAction: 'Abrir repositorio',
  },
} as const

export default function CheatSheetPage({ locale }: { locale: Locale }) {
  const copy = pageCopy[locale]
  const blocks = parseMarkdownBlocks(cheatSheetMarkdown[locale])
  const toc = blocks.filter(
    (block) => block.type === 'heading' && block.level === 2,
  )

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="lab-chip lab-chip--tooling">{copy.kicker}</span>
          <span className="lab-chip lab-chip--route">TanStack</span>
        </div>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {blocks[0]?.type === 'heading' ? blocks[0].text : copy.kicker}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {copy.description}
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="space-y-4">
          <article className="island-shell sticky top-32 rounded-2xl p-5">
            <h2 className="mt-0 mb-4 text-lg font-semibold text-[var(--sea-ink)]">
              {copy.kicker}
            </h2>
            <nav className="grid gap-2">
              {toc.map((block: any) => (
                <a
                  key={block.text}
                  href={`#${toAnchor(block.text)}`}
                  className="rounded-xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--surface)_74%,transparent_26%)] px-3 py-2 text-sm font-semibold text-[var(--sea-ink-soft)] no-underline hover:text-[var(--sea-ink)]"
                >
                  {block.text}
                </a>
              ))}
            </nav>
          </article>

          <article className="feature-card rounded-2xl p-5">
            <p className="island-kicker mb-3">{copy.repoTitle}</p>
            <p className="text-sm leading-7 text-[var(--sea-ink-soft)]">
              {copy.repoDescription}
            </p>
            <a
              href={PROJECT_REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
              className="lab-button mt-2"
            >
              {copy.repoAction}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--surface-strong)_78%,black_22%)] p-4 text-xs text-[var(--sea-ink)]">
              <code>{`git clone ${PROJECT_REPOSITORY_URL}`}</code>
            </pre>
          </article>
        </aside>

        <article className="island-shell cheat-sheet-doc rounded-[2rem] p-6 sm:p-8">
          {blocks.slice(1).map((block, index) => (
            <MarkdownBlockView block={block} key={`${block.type}-${index}`} />
          ))}
        </article>
      </section>
    </main>
  )
}

function MarkdownBlockView({
  block,
}: {
  block: ReturnType<typeof parseMarkdownBlocks>[number]
}) {
  if (block.type === 'heading') {
    const HeadingTag = `h${block.level}` as 'h1' | 'h2' | 'h3'

    return (
      <HeadingTag id={block.level === 2 ? toAnchor(block.text) : undefined}>
        {renderInline(block.text)}
      </HeadingTag>
    )
  }

  if (block.type === 'list') {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    )
  }

  if (block.type === 'code') {
    return (
      <pre>
        <code>{block.text}</code>
      </pre>
    )
  }

  return <p>{renderInline(block.text)}</p>
}

function renderInline(text: string): ReactNode {
  return text.split(/(`[^`]+`)/g).map((part) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={part}>{part.slice(1, -1)}</code>
    }

    return part
  })
}

function toAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
