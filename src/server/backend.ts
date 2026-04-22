const DEFAULT_BACKEND_BASE_URL = 'http://127.0.0.1:4001'

export function buildBackendUrl(
  pathname: string,
  searchParams?: URLSearchParams,
): URL {
  const url = new URL(pathname, getBackendBaseUrl())

  if (searchParams) {
    url.search = searchParams.toString()
  }

  return url
}

function getBackendBaseUrl(): string {
  return process.env.BACKEND_URL ?? DEFAULT_BACKEND_BASE_URL
}
