import { describe, expect, it } from 'vitest'
import { buildProxyRequestInit } from '../server/request-init'

describe('buildProxyRequestInit', () => {
  it('preserves method and headers while omitting body for GET requests', async () => {
    const request = new Request('http://localhost/api/products', {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })

    await expect(buildProxyRequestInit(request)).resolves.toEqual({
      method: 'GET',
      headers: request.headers,
      body: undefined,
    })
  })

  it('preserves the request body for non-GET requests', async () => {
    const request = new Request('http://localhost/api/products', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: '{"name":"Portable SSD"}',
    })

    await expect(buildProxyRequestInit(request)).resolves.toEqual({
      method: 'POST',
      headers: request.headers,
      body: '{"name":"Portable SSD"}',
    })
  })
})
