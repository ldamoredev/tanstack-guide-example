import { useI18n, type Locale } from '#/lib/i18n'

export default function LanguageToggle() {
  const { locale, setLocale, copy } = useI18n()

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] p-1 shadow-[0_8px_22px_rgba(30,90,72,0.08)]"
      role="group"
      aria-label={copy.language.label}
    >
      {(
        [
          ['en', copy.language.english],
          ['es', copy.language.spanish],
        ] as const satisfies readonly [Locale, string][]
      ).map(([value, label]) => {
        const isActive = locale === value

        return (
          <button
            key={value}
            type="button"
            onClick={() => setLocale(value)}
            aria-pressed={isActive}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
              isActive
                ? 'bg-[var(--lagoon)] text-slate-950 shadow-[0_10px_24px_rgba(34,211,238,0.24)]'
                : 'text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
