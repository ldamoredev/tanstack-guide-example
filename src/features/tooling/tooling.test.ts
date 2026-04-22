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
        command: 'pnpm build',
        purpose: 'Build the app for the Netlify serverless runtime',
      },
      {
        command: 'pnpm test',
        purpose: 'Run the focused Vitest test suite',
      },
    ])
  })
})
