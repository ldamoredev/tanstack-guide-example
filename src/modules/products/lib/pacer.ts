export function shouldApplyDebouncedSearch(
  currentValue: string,
  nextValue: string,
): boolean {
  return currentValue !== nextValue
}
