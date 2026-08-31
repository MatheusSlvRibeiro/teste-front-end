import { useEffect, useId, useState } from 'react'
import { BrandCarousel } from '@/components/BrandCarousel/BrandCarousel'
import { CategoryGrid } from '@/components/CategoryGrid/CategoryGrid'
import { HeroBanner } from '@/components/HeroBanner/HeroBanner'
import { PartnerBanner } from '@/components/PartnerBanner/PartnerBanner'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { ProductDetailModal } from '@/components/ProductDetailModal/ProductDetailModal'
import { getProducts } from '@/lib/api/products'
import type { Product } from '@/schemas/product'
import styles from './Home.module.scss'

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

            <section aria-labelledby={vitrine1Id} className={styles.vitrine}>
                <h2 id={vitrine1Id} className={styles.vitrine__heading}>
                    Todos os produtos
                </h2>

                {state.status === 'loading' && <p role="status">Carregando produtos…</p>}
                {state.status === 'error' && <p role="alert">{state.message}</p>}
                {state.status === 'success' && (
                    <div className={styles.vitrine__grid}>
                        {state.products.map((product) => (
                            <ProductCard
                                key={product.productName}
                                product={product}
                                onSelect={setSelectedProduct}
                            />
                        ))}
                    </div>
                )}
            </section>

            <PartnerBanner
                title="Rede parceira"
                description="Frete grátis em compras selecionadas na rede parceira."
            />

            <section aria-labelledby={vitrine2Id} className={styles.vitrine}>
                <h2 id={vitrine2Id} className={styles.vitrine__heading}>
                    Produtos relacionados
                </h2>

                {state.status === 'loading' && <p role="status">Carregando produtos…</p>}
                {state.status === 'error' && <p role="alert">{state.message}</p>}
                {state.status === 'success' && (
                    <div className={styles.vitrine__grid}>
                        {state.products.map((product) => (
                            <ProductCard
                                key={product.productName}
                                product={product}
                                onSelect={setSelectedProduct}
                            />
                        ))}
                    </div>
                )}
            </section>

            <BrandCarousel />

            <ProductDetailModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </>
    )
}
