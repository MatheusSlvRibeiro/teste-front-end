type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue>;

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

function buildUrl(path: string, query?: QueryParams): string {
    const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(
        `${API_BASE_URL}${sanitizedPath}`,
        window.location.origin,
    );

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (!value) {
                return;
            }

            url.searchParams.set(key, String(value));
        });
    }

    return url.toString();
}

async function request<TResponse>(
    path: string,
    init?: RequestInit,
    query?: QueryParams,
): Promise<TResponse> {
    const response = await fetch(buildUrl(path, query), {
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers ?? {}),
        },
        ...init,
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
        return undefined as TResponse;
    }

    return (await response.json()) as TResponse;
}

const api = {
    get: <TResponse>(path: string, query?: QueryParams): Promise<TResponse> =>
        request<TResponse>(path, undefined, query),
    post: <TResponse, TBody>(path: string, body: TBody): Promise<TResponse> =>
        request<TResponse>(path, {
            method: 'POST',
            body: JSON.stringify(body),
        }),
    patch: <TResponse, TBody>(path: string, body: TBody): Promise<TResponse> =>
        request<TResponse>(path, {
            method: 'PATCH',
            body: JSON.stringify(body),
        }),
    delete: (path: string): Promise<void> =>
        request<void>(path, { method: 'DELETE' }),
};

export default api;
