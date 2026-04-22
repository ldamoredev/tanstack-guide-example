import { useEffect, useState } from 'react'
import { useDebouncedValue } from '@tanstack/react-pacer'
import { useI18n } from '#/lib/i18n'
import { shouldApplyDebouncedSearch } from '../lib/pacer'

interface DebouncedSearchInputProps {
  value: string
  onApplySearch: (nextValue: string) => void
  wait?: number
}

export function DebouncedSearchInput({
  value,
  onApplySearch,
  wait = 500,
}: DebouncedSearchInputProps) {
  const { copy } = useI18n()
  const [draft, setDraft] = useState(value)
  const [debouncedDraft, debouncer] = useDebouncedValue(
    draft,
    { wait },
    (state) => ({ isPending: state.isPending }),
  )

  useEffect(() => {
    setDraft(value)
  }, [value])

  useEffect(() => {
    if (shouldApplyDebouncedSearch(value, debouncedDraft)) {
      onApplySearch(debouncedDraft)
    }
  }, [debouncedDraft, onApplySearch, value])

  return (
    <label className="lab-field-label">
      {copy.products.filters.labels.search}
      <input
        aria-label="Search"
        type="search"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={copy.products.filters.searchPlaceholder}
        className="lab-field"
      />
      {debouncer.state.isPending ? (
        <span className="lab-note text-xs font-normal">
          {copy.products.filters.debouncing}
        </span>
      ) : null}
    </label>
  )
}
