import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useProducts } from './useProducts'

vi.mock('@/services/productsService', () => ({
    productsService: {
        getRelatedProducts: vi.fn(),
    },
}))

const { productsService } = await import('@/services/productsService')
const mockGetRelatedProducts = vi.mocked(productsService.getRelatedProducts)

const MOCK_PRODUCTS = [
    {
        productName: 'Produto A',
        descriptionShort: 'Descrição A',
        photo: 'http://example.com/a.jpg',
        price: 100,
    },
]

describe('useProducts', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('inicia em estado de loading', () => {
        mockGetRelatedProducts.mockReturnValue(new Promise(() => {}))
        const { result } = renderHook(() => useProducts())
        expect(result.current.loading).toBe(true)
        expect(result.current.products).toEqual([])
        expect(result.current.error).toBeNull()
    })

    it('retorna produtos após fetch bem-sucedido', async () => {
        mockGetRelatedProducts.mockResolvedValue(MOCK_PRODUCTS)
        const { result } = renderHook(() => useProducts())

        await waitFor(() => expect(result.current.loading).toBe(false))

        expect(result.current.products).toEqual(MOCK_PRODUCTS)
        expect(result.current.error).toBeNull()
    })

    it('define error quando o fetch falha', async () => {
        mockGetRelatedProducts.mockRejectedValue(new Error('network error'))
        const { result } = renderHook(() => useProducts())

        await waitFor(() => expect(result.current.loading).toBe(false))

        expect(result.current.error).toBe('Não foi possível carregar os produtos.')
        expect(result.current.products).toEqual([])
    })

    it('refaz o fetch ao chamar retry', async () => {
        mockGetRelatedProducts
            .mockRejectedValueOnce(new Error('network error'))
            .mockResolvedValueOnce(MOCK_PRODUCTS)

        const { result } = renderHook(() => useProducts())
        await waitFor(() => expect(result.current.loading).toBe(false))
        expect(result.current.error).not.toBeNull()

        result.current.retry()
        await waitFor(() => {
            expect(result.current.loading).toBe(false)
            expect(result.current.error).toBeNull()
            expect(result.current.products).toEqual(MOCK_PRODUCTS)
        })
    })
})
