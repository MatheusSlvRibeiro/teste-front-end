import api from './api';

function mockFetchResponse(body: unknown, init?: Partial<Response>) {
    return {
        ok: init?.ok ?? true,
        status: init?.status ?? 200,
        json: async () => body,
    } as Response;
}

describe('api', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('performs a GET request with JSON headers', async () => {
        const fetchMock = vi.mocked(fetch);
        fetchMock.mockResolvedValueOnce(mockFetchResponse({ foo: 'bar' }));

        const result = await api.get<{ foo: string }>('/products');

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [url, init] = fetchMock.mock.calls[0];
        expect(String(url)).toContain('/products');
        expect(init).toMatchObject({
            headers: { 'Content-Type': 'application/json' },
        });
        expect(result).toEqual({ foo: 'bar' });
    });

    it('appends only truthy query params to the URL', async () => {
        const fetchMock = vi.mocked(fetch);
        fetchMock.mockResolvedValueOnce(mockFetchResponse([]));

        await api.get('/products', { page: 2, search: '', flag: false });

        const [url] = fetchMock.mock.calls[0];
        const requestUrl = new URL(String(url));
        expect(requestUrl.searchParams.get('page')).toBe('2');
        expect(requestUrl.searchParams.has('search')).toBe(false);
        expect(requestUrl.searchParams.has('flag')).toBe(false);
    });

    it('sends a POST request with a JSON-serialized body', async () => {
        const fetchMock = vi.mocked(fetch);
        fetchMock.mockResolvedValueOnce(mockFetchResponse({ id: '1' }));

        const payload = { productName: 'New product' };
        const result = await api.post<{ id: string }, typeof payload>(
            '/products',
            payload,
        );

        const [, init] = fetchMock.mock.calls[0];
        expect(init).toMatchObject({
            method: 'POST',
            body: JSON.stringify(payload),
        });
        expect(result).toEqual({ id: '1' });
    });

    it('sends a PATCH request with a JSON-serialized body', async () => {
        const fetchMock = vi.mocked(fetch);
        fetchMock.mockResolvedValueOnce(mockFetchResponse({ id: '1' }));

        await api.patch('/products/1', { price: 100 });

        const [, init] = fetchMock.mock.calls[0];
        expect(init).toMatchObject({
            method: 'PATCH',
            body: JSON.stringify({ price: 100 }),
        });
    });

    it('resolves to undefined on a 204 No Content response', async () => {
        const fetchMock = vi.mocked(fetch);
        fetchMock.mockResolvedValueOnce(
            mockFetchResponse(null, { status: 204 }),
        );

        const result = await api.delete('/products/1');

        const [, init] = fetchMock.mock.calls[0];
        expect(init).toMatchObject({ method: 'DELETE' });
        expect(result).toBeUndefined();
    });

    it('throws when the response is not ok', async () => {
        const fetchMock = vi.mocked(fetch);
        fetchMock.mockResolvedValueOnce(
            mockFetchResponse(null, { ok: false, status: 500 }),
        );

        await expect(api.get('/products')).rejects.toThrow(
            'Request failed with status 500',
        );
    });
});
