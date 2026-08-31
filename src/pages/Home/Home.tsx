import { useId, useState } from 'react'
import { BrandCarousel } from '@/components/BrandCarousel/BrandCarousel'
import { CategoryGrid } from '@/components/CategoryGrid/CategoryGrid'
import { HeroBanner } from '@/components/HeroBanner/HeroBanner'
import { PartnerBanner } from '@/components/PartnerBanner/PartnerBanner'
import { ProductDetailModal } from '@/components/ProductDetailModal/ProductDetailModal'
import { RelatedProductsSection } from '@/components/RelatedProductsSection/RelatedProductsSection'
import { useProducts } from '@/hooks/useProducts'
import type { Product } from '@/schemas/product'

export function Home() {
    const { products, loading, error, retry } = useProducts()
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const vitrine1Id = useId()
    const vitrine2Id = useId()

    return (
        <>
            <HeroBanner />
            <CategoryGrid />

            <PartnerBanner description="Descontos exclusivos com nossos parceiros." />

            <RelatedProductsSection
                title="Todos os produtos"
                showCategories={false}
                products={products}
                loading={loading}
                error={error}
                onRetry={retry}
                onProductClick={setSelectedProduct}
                sectionId={vitrine1Id}
            />

            <PartnerBanner
                title="Rede parceira"
                description="Frete grátis em compras selecionadas na rede parceira."
            />

            <RelatedProductsSection
                title="Produtos relacionados"
                showCategories={true}
                products={products}
                loading={loading}
                error={error}
                onRetry={retry}
                onProductClick={setSelectedProduct}
                sectionId={vitrine2Id}
            />

            <BrandCarousel />

            <ProductDetailModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </>
    )
}
