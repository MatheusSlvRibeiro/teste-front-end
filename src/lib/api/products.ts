import { mockProducts } from '@/mocks/products'
import { ProductsResponseSchema, type Product } from '@/schemas/product'

const DEFAULT_PRODUCTS_API_URL =
    'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'

async function fetchProductsFromApi(): Promise<Product[]> {
    const apiUrl = import.meta.env.VITE_PRODUCTS_API_URL ?? DEFAULT_PRODUCTS_API_URL
    const response = await fetch(apiUrl)

    if (!response.ok) {
        throw new Error(`Falha ao buscar produtos: HTTP ${response.status}`)
    }

    const raw: unknown = await response.json()
    return ProductsResponseSchema.parse(raw).products
}

async function fetchProductsFromMock(): Promise<Product[]> {
    return mockProducts
}

export function getProducts(): Promise<Product[]> {
    const useMock = import.meta.env.VITE_USE_MOCK_API === 'true'
    return useMock ? fetchProductsFromMock() : fetchProductsFromApi()
}
