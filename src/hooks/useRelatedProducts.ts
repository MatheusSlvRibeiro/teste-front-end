import { useCallback, useEffect, useState } from 'react';
import type { Product } from '@/types/product.schema';
import { productsService } from '@/services/productsService';

interface UseRelatedProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    retry: () => Promise<void>;
}

export function useRelatedProducts(): UseRelatedProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const items = await productsService.getRelatedProducts();
            setProducts(items);
        } catch {
            setError('Não foi possível carregar os produtos no momento.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadProducts();
    }, [loadProducts]);

    return {
        products,
        loading,
        error,
        retry: loadProducts,
    };
}
