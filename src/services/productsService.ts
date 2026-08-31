import { mockProducts } from '@/mocks/products'
import { ProductsResponseSchema, type Product } from '@/schemas/product'
import GenericService from './GenericService'

const DEFAULT_PRODUCTS_URL =
    'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'

class ProductsService extends GenericService<Product> {
    constructor() {
        super('products')
    }

    async getRelatedProducts(): Promise<Product[]> {
        if (import.meta.env.VITE_USE_MOCK_API === 'true') {
            await new Promise<void>((resolve) => setTimeout(resolve, 250))
            return mockProducts
        }

        const url = import.meta.env.VITE_PRODUCTS_API_URL ?? DEFAULT_PRODUCTS_URL
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Falha ao buscar produtos: HTTP ${response.status}`)
        }

        const raw: unknown = await response.json()
        return ProductsResponseSchema.parse(raw).products
    }
}

export const productsService = new ProductsService()
