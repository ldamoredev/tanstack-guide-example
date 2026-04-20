// @vitest-environment jsdom

import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Footer from './Footer'
import Header from './Header'

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    className,
  }: {
    children: React.ReactNode
    to?: string
    className?: string
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}))

vi.mock('#/modules/products', () => ({
  DEFAULT_PRODUCTS_SEARCH: {
    q: '',
    category: '',
    sort: 'name-asc',
    page: 1,
  },
}))

vi.mock('./ThemeToggle', () => ({
  default: () => <button type="button">Theme</button>,
}))

afterEach(() => {
  cleanup()
})

describe('learning shell framing', () => {
  it('frames the app as a TanStack learning playground', () => {
    render(
      <div>
        <Header />
        <Footer />
      </div>,
    )

    expect(
      screen.getByRole('link', { name: /tanstack learning playground/i }),
    ).toBeTruthy()
    expect(screen.getByText(/overview/i)).toBeTruthy()
    expect(screen.getByText(/data/i)).toBeTruthy()
    expect(screen.getAllByText(/static/i).length).toBeGreaterThan(0)
    expect(
      screen.getByText(
        /personal tanstack learning playground for routes, loaders, query flows, and experiments/i,
      ),
    ).toBeTruthy()
  })
})
