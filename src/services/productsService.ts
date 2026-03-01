import type { Product } from '@/types/Product';
import GenericService from '@/services/genericService';
import { MOCK_RELATED_PRODUCTS } from './mocks/products.mock';

class ProductsService extends GenericService<Product> {
    constructor() {
        super('products');
    }

    async getRelatedProducts(): Promise<Product[]> {
        await new Promise((resolve) => setTimeout(resolve, 250));
        return MOCK_RELATED_PRODUCTS;
    }
}

export const productsService = new ProductsService();
