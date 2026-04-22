import { createFileRoute } from '@tanstack/react-router'
import CheatSheetPage from '#/features/cheat-sheet/CheatSheetPage'
import { useI18n } from '#/lib/i18n'

export const Route = createFileRoute('/cheat-sheet')({
  component: CheatSheetRoute,
})

function CheatSheetRoute() {
  const { locale } = useI18n()

  return <CheatSheetPage locale={locale} />
}
