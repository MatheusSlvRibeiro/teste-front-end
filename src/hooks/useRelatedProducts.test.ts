import { renderHook, waitFor, act } from '@testing-library/react';
import { productsService } from '@/services/productsService';
import type { Product } from '@/types/product.schema';
import { useRelatedProducts } from './useRelatedProducts';

vi.mock('@/services/productsService', () => ({
    productsService: {
        getRelatedProducts: vi.fn(),
    },
}));

const PRODUCTS: Product[] = [
    {
        id: '1',
        productName: 'Product 1',
        descriptionShort: 'Description 1',
        photo: '/product-1.png',
        price: 100,
    },
];

describe('useRelatedProducts', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('starts in a loading state and resolves with products', async () => {
        vi.mocked(productsService.getRelatedProducts).mockResolvedValueOnce(
            PRODUCTS,
        );

        const { result } = renderHook(() => useRelatedProducts());

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.products).toEqual(PRODUCTS);
        expect(result.current.error).toBeNull();
    });

    it('sets an error message and clears products when the request fails', async () => {
        vi.mocked(productsService.getRelatedProducts).mockRejectedValueOnce(
            new Error('network error'),
        );

        const { result } = renderHook(() => useRelatedProducts());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe(
            'Não foi possível carregar os produtos no momento.',
        );
        expect(result.current.products).toEqual([]);
    });

    it('retry() reloads the products', async () => {
        vi.mocked(productsService.getRelatedProducts)
            .mockRejectedValueOnce(new Error('network error'))
            .mockResolvedValueOnce(PRODUCTS);

        const { result } = renderHook(() => useRelatedProducts());

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.error).not.toBeNull();

        await act(async () => {
            await result.current.retry();
        });

        expect(result.current.error).toBeNull();
        expect(result.current.products).toEqual(PRODUCTS);
        expect(productsService.getRelatedProducts).toHaveBeenCalledTimes(2);
    });
});
