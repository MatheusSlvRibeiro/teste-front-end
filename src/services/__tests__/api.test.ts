import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import api, { ApiError } from '@/services/api'

function mockFetchOnce(response: Partial<Response>) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({}),
      ...response,
    }),
  )
}

describe('api', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.com')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('lança um erro claro quando VITE_API_BASE_URL não está configurada', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '')

    await expect(api.get('/products/')).rejects.toThrow('VITE_API_BASE_URL')
  })

  it('monta a URL final removendo a barra duplicada quando a base termina com /', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.com/')
    mockFetchOnce({})

    await api.get('/products/')

    const [url] = vi.mocked(fetch).mock.calls[0]
    expect(url).toBe('https://api.example.com/products/')
  })

  it('get monta a URL completa com query params e retorna o corpo parseado', async () => {
    mockFetchOnce({ json: async () => ({ id: '1' }) })

    const result = await api.get<{ id: string }>('/products/', { page: 2, active: true })

    expect(result).toEqual({ id: '1' })
    const [url, init] = vi.mocked(fetch).mock.calls[0]
    expect(url).toBe('https://api.example.com/products/?page=2&active=true')
    expect(init?.method).toBe('GET')
  })

  it('get ignora params com valor undefined', async () => {
    mockFetchOnce({})

    await api.get('/products/', { page: 2, filter: undefined })

    const [url] = vi.mocked(fetch).mock.calls[0]
    expect(url).toBe('https://api.example.com/products/?page=2')
  })

  it('post envia o corpo serializado com Content-Type json', async () => {
    mockFetchOnce({ json: async () => ({ id: '1', name: 'novo' }) })

    const result = await api.post<{ id: string }, { name: string }>('/products/', {
      name: 'novo',
    })

    expect(result).toEqual({ id: '1', name: 'novo' })
    const [, init] = vi.mocked(fetch).mock.calls[0]
    expect(init?.method).toBe('POST')
    expect(init?.body).toBe(JSON.stringify({ name: 'novo' }))
    expect((init?.headers as Record<string, string>)['Content-Type']).toBe('application/json')
  })

  it('não tenta parsear corpo quando a resposta é 204', async () => {
    mockFetchOnce({ status: 204, headers: new Headers(), json: async () => ({}) })

    const result = await api.delete('/products/1/')

    expect(result).toBeUndefined()
  })

  it('não tenta parsear corpo quando a resposta é 200 sem Content-Type json', async () => {
    mockFetchOnce({
      status: 200,
      headers: new Headers({ 'content-length': '0' }),
      json: async () => ({}),
    })

    const result = await api.delete('/products/1/')

    expect(result).toBeUndefined()
  })

  it('lança ApiError com status e corpo quando a resposta não é ok', async () => {
    mockFetchOnce({
      ok: false,
      status: 404,
      json: async () => ({ detail: 'não encontrado' }),
    })

    await expect(api.get('/products/999/')).rejects.toMatchObject({
      status: 404,
      body: { detail: 'não encontrado' },
    })
    await expect(api.get('/products/999/')).rejects.toBeInstanceOf(ApiError)
  })

  it('propaga a rejeição quando fetch falha por erro de rede', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))

    await expect(api.get('/products/')).rejects.toThrow('network down')
  })
})
