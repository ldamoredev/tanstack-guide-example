import { describe, expect, it } from 'vitest'
import { shouldApplyDebouncedSearch } from '../lib/pacer'

describe('shouldApplyDebouncedSearch', () => {
  it('applies only when the debounced value differs from the current route value', () => {
    expect(shouldApplyDebouncedSearch('', 'laptop')).toBe(true)
    expect(shouldApplyDebouncedSearch('laptop', 'laptop')).toBe(false)
  })
})
