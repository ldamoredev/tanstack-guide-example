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

  it('keeps the sticky sidebar focused on guide navigation and puts repository action in the hero', () => {
    render(<CheatSheetPage locale="en" />)

    const sidebar = screen.getByRole('complementary', {
      name: /study guide navigation/i,
    })
    const hero = screen.getByRole('region', { name: /study guide overview/i })

    expect(sidebar.className).toContain('sticky')
    expect(
      screen.getByRole('navigation', { name: /study guide sections/i }),
    ).toBeTruthy()
    expect(sidebar.textContent).not.toMatch(/clone the project/i)
    expect(hero.textContent).toMatch(/clone the project/i)
    expect(screen.getByRole('link', { name: /open repository/i })).toBeTruthy()
  })
})
