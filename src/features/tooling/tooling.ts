import type { Locale } from '#/lib/i18n'

export interface ToolingCommand {
  command: string
  purpose: string
}

export function getToolingCommands(locale: Locale = 'en'): ToolingCommand[] {
  return [
    {
      command: 'pnpm run dev',
      purpose:
        locale === 'es'
          ? 'Ejecuta la app TanStack Start con Nitro en desarrollo'
          : 'Run the TanStack Start app with Nitro in development',
    },
    {
      command: 'cd backend && pnpm dev',
      purpose:
        locale === 'es'
          ? 'Ejecuta el backend Node.js TypeScript por separado'
          : 'Run the separate Node.js TypeScript backend',
    },
    {
      command: 'pnpm test',
      purpose:
        locale === 'es'
          ? 'Ejecuta la suite de tests focalizada con Vitest'
          : 'Run the focused Vitest test suite',
    },
  ]
}
