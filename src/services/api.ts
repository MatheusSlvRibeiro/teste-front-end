export type QueryParams = Record<string, string | number | boolean | undefined>

export class ApiError extends Error {
    readonly status: number
    readonly body: unknown

    constructor(status: number, method: string, path: string, body: unknown) {
        super(`Falha na requisição: HTTP ${status} (${method} ${path})`)
        this.name = 'ApiError'
        this.status = status
        this.body = body
    }
}

function buildUrl(path: string, params?: QueryParams): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    if (!baseUrl) {
        throw new Error(
            'VITE_API_BASE_URL não está configurada — obrigatória para usar o client de src/services/api.ts',
        )
    }

    const normalizedBase = baseUrl.replace(/\/+$/, '')
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    const url = new URL(`${normalizedBase}${normalizedPath}`)

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) url.searchParams.set(key, String(value))
        })
    }

    return url.toString()
}

async function readBody(response: Response): Promise<unknown> {
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return undefined
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (!contentType.includes('application/json')) {
        return undefined
    }

    return response.json()
}

async function request<TResponse>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    options: { body?: unknown; params?: QueryParams } = {},
): Promise<TResponse> {
    const { body, params } = options

    const response = await fetch(buildUrl(path, params), {
        method,
        headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        throw new ApiError(response.status, method, path, await readBody(response))
    }

    return (await readBody(response)) as TResponse
}

const api = {
    get: <TResponse>(path: string, params?: QueryParams) =>
        request<TResponse>('GET', path, { params }),
    post: <TResponse, TBody = unknown>(path: string, data: TBody) =>
        request<TResponse>('POST', path, { body: data }),
    patch: <TResponse, TBody = unknown>(path: string, data: TBody) =>
        request<TResponse>('PATCH', path, { body: data }),
    delete: (path: string) => request<void>('DELETE', path),
}

export default api
