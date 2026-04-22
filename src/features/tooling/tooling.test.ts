import { describe, expect, it } from 'vitest'
import { getToolingCommands } from './tooling'

describe('getToolingCommands', () => {
  it('returns the core commands we use in this repo for daily TanStack learning', () => {
    expect(getToolingCommands()).toEqual([
      {
        command: 'pnpm run dev',
        purpose: 'Run the TanStack Start app with Nitro in development',
      },
      {
        command: 'cd backend && pnpm dev',
        purpose: 'Run the separate Node.js TypeScript backend',
      },
      {
        command: 'pnpm test',
        purpose: 'Run the focused Vitest test suite',
      },
    ])
  })
})
