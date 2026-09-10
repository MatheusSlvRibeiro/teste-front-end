import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockProducts } from '@/mocks/products'
import { getProducts } from '../products'

afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
})

describe('getProducts', () => {
    it('retorna os produtos mockados quando VITE_USE_MOCK_API=true, sem chamar fetch', async () => {
        vi.stubEnv('VITE_USE_MOCK_API', 'true')
        const fetchSpy = vi.fn()
        vi.stubGlobal('fetch', fetchSpy)

        const products = await getProducts()

        expect(products).toEqual(mockProducts)
        expect(fetchSpy).not.toHaveBeenCalled()
    })

    it('busca produtos em VITE_PRODUCTS_API_URL quando VITE_USE_MOCK_API=false', async () => {
        vi.stubEnv('VITE_USE_MOCK_API', 'false')
        vi.stubEnv('VITE_PRODUCTS_API_URL', 'https://example.com/produtos.json')
        const apiProducts = [
            {
                id: 'produto-real',
                productName: 'Produto real',
                descriptionShort: 'Descrição',
                photo: 'https://example.com/foto.png',
                price: 100,
            },
        ]
        const fetchSpy = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ success: true, products: apiProducts }),
        })
        vi.stubGlobal('fetch', fetchSpy)

        const products = await getProducts()

        expect(fetchSpy).toHaveBeenCalledWith('https://example.com/produtos.json')
        expect(products).toEqual(apiProducts)
    })

    it('lança erro quando a resposta HTTP não é ok', async () => {
        vi.stubEnv('VITE_USE_MOCK_API', 'false')
        vi.stubGlobal(
            'fetch',
            vi
                .fn()
                .mockResolvedValue({ ok: false, status: 500, json: () => Promise.resolve(null) }),
        )

        await expect(getProducts()).rejects.toThrow('HTTP 500')
    })

    it('lança erro quando a resposta não bate com o schema esperado', async () => {
        vi.stubEnv('VITE_USE_MOCK_API', 'false')
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ success: true }),
            }),
        )

        await expect(getProducts()).rejects.toThrow()
    })
})
