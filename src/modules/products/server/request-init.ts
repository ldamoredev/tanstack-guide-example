export async function buildProxyRequestInit(
  request: Request,
): Promise<RequestInit> {
  return {
    method: request.method,
    headers: request.headers,
    body: request.method === 'GET' ? undefined : await request.text(),
  }
}
