import { mockProducts } from '@/mocks/products'
import { ProductsResponseSchema, type Product } from '@/schemas/product'

async function fetchProductsFromApi(): Promise<Product[]> {
  const response = await fetch(import.meta.env.VITE_PRODUCTS_API_URL)

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
