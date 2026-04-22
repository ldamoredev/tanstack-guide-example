import englishCheatSheet from '../../../tanstack-cheat-sheet.md?raw'
import spanishCheatSheet from '../../../tanstack-cheat-sheet.es.md?raw'
import type { Locale } from '#/lib/i18n'

export const PROJECT_REPOSITORY_URL = 'https://github.com/ldamoredev/tanstack-guide-example'

export const cheatSheetMarkdown: Record<Locale, string> = {
  en: englishCheatSheet,
  es: spanishCheatSheet,
}
