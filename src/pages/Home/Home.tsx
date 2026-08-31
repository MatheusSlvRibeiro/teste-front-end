import { useEffect, useId, useState } from 'react'
import { BrandCarousel } from '@/components/BrandCarousel/BrandCarousel'
import { CategoryGrid } from '@/components/CategoryGrid/CategoryGrid'
import { HeroBanner } from '@/components/HeroBanner/HeroBanner'
import { PartnerBanner } from '@/components/PartnerBanner/PartnerBanner'
import { ProductDetailModal } from '@/components/ProductDetailModal/ProductDetailModal'
import { RelatedProductsSection } from '@/components/RelatedProductsSection/RelatedProductsSection'
import { getProducts } from '@/lib/api/products'
import type { Product } from '@/schemas/product'

type FetchState =
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'success'; products: Product[] }

export function Home() {
    const [state, setState] = useState<FetchState>({ status: 'loading' })
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const vitrine1Id = useId()
    const vitrine2Id = useId()

    useEffect(() => {
        let cancelled = false

        getProducts()
            .then((products) => {
                if (!cancelled) setState({ status: 'success', products })
            })
            .catch(() => {
                if (!cancelled) {
                    setState({ status: 'error', message: 'Não foi possível carregar os produtos.' })
                }
            })

        return () => {
            cancelled = true
        }
    }, [])

    return (
        <>
            <HeroBanner />
            <CategoryGrid />

            <PartnerBanner description="Descontos exclusivos com nossos parceiros." />

            <RelatedProductsSection
                title="Todos os produtos"
                showCategories={false}
                products={state.status === 'success' ? state.products : []}
                loading={state.status === 'loading'}
                error={state.status === 'error' ? state.message : null}
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
                products={state.status === 'success' ? state.products : []}
                loading={state.status === 'loading'}
                error={state.status === 'error' ? state.message : null}
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
