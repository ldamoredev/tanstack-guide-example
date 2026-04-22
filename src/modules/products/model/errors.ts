export class ProductsApiError extends Error {
  status: number
  code?: string

  constructor(
    message: string,
    status: number,
    code?: string,
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.name = 'ProductsApiError'
    this.status = status
    this.code = code
  }
}

export class ProductNotFoundError extends ProductsApiError {
  constructor(message = 'Product not found', options?: ErrorOptions) {
    super(message, 404, 'NOT_FOUND', options)
    this.name = 'ProductNotFoundError'
  }
}

export async function parseProductsJsonResponse<T>(
  response: Response,
  resourceName: string,
): Promise<T> {
  if (!response.ok) {
    const payload = await readErrorPayload(response)

    if (response.status === 404 && resourceName === 'product') {
      throw new ProductNotFoundError(payload.message ?? 'Product not found')
    }

    throw new ProductsApiError(
      payload.message ?? `Failed to fetch ${resourceName}`,
      response.status,
      payload.code,
    )
  }

  return (await response.json()) as T
}

export function toProductsNetworkError(
  error: unknown,
  resourceName: string,
): ProductsApiError {
  if (error instanceof ProductsApiError) {
    return error
  }

  return new ProductsApiError(
    `Failed to fetch ${resourceName}`,
    0,
    'NETWORK_ERROR',
    { cause: toErrorCause(error) },
  )
}

async function readErrorPayload(response: Response): Promise<{
  message?: string
  code?: string
}> {
  const contentType = response.headers.get('content-type') ?? ''

  try {
    if (contentType.includes('application/json')) {
      return (await response.json()) as { message?: string; code?: string }
    }

    const text = await response.text()
    return text ? { message: text } : {}
  } catch {
    return {}
  }
}

function toErrorCause(error: unknown): Error | undefined {
  return error instanceof Error ? error : undefined
}
