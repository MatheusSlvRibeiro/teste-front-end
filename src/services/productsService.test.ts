import { productsService } from './productsService';
import { MOCK_RELATED_PRODUCTS } from './mocks/products.mock';

describe('productsService', () => {
    it('getRelatedProducts() resolves to the mocked related products', async () => {
        const result = await productsService.getRelatedProducts();

        expect(result).toEqual(MOCK_RELATED_PRODUCTS);
    });
});
