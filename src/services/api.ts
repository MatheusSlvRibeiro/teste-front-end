export type QueryParams = Record<string, string | number | boolean | undefined>

export class ApiError extends Error {
    status: number
    body: unknown

    constructor(status: number, body: unknown) {
        super(`HTTP ${status}`)
        this.status = status
        this.body = body
    }
}

function buildUrl(path: string, query?: QueryParams): string {
    const base = import.meta.env.VITE_API_BASE_URL
    if (!base) throw new Error('VITE_API_BASE_URL não está configurada')

    const cleanBase = base.replace(/\/$/, '')
    const url = new URL(cleanBase + path)

    if (query) {
        Object.entries(query).forEach(([key, val]) => {
            if (val !== undefined) url.searchParams.set(key, String(val))
        })
    }

    return url.toString()
}

function isJson(response: Response): boolean {
    return (response.headers.get('content-type') ?? '').includes('application/json')
}

async function request<TResponse>(
    path: string,
    init: RequestInit,
    query?: QueryParams,
): Promise<TResponse> {
    const url = buildUrl(path, query)
    const response = await fetch(url, {
        ...init,
        headers: { 'Content-Type': 'application/json', ...init.headers },
    })

    if (!response.ok) {
        const body = isJson(response) ? await response.json() : null
        throw new ApiError(response.status, body)
    }

    if (response.status === 204 || !isJson(response)) return undefined as TResponse
    return response.json() as Promise<TResponse>
}

const api = {
    get: <T>(path: string, query?: QueryParams) => request<T>(path, { method: 'GET' }, query),
    post: <T, B>(path: string, body: B) =>
        request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
    patch: <T, B>(path: string, body: B) =>
        request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (path: string) => request<void>(path, { method: 'DELETE' }),
}

export default api
