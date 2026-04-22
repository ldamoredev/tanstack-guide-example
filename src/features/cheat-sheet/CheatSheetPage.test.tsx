// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import CheatSheetPage from './CheatSheetPage'

afterEach(() => {
  cleanup()
})

describe('CheatSheetPage', () => {
  it('renders the Spanish guide and the repository clone action', () => {
    render(<CheatSheetPage locale="es" />)

    expect(
      screen.getByRole('heading', {
        name: /guía de estudio tanstack/i,
        level: 1,
      }),
    ).toBeTruthy()
    expect(screen.getByText(/clona el proyecto/i)).toBeTruthy()
    const repoLink = screen.getByRole('link', { name: /abrir repositorio/i })
    expect(repoLink.getAttribute('href')).toBe(
      'https://github.com/ldamoredev/tanstack-guide-example',
    )
  })
})
