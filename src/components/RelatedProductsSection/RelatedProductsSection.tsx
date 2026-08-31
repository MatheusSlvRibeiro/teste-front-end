import { CategoryTabs } from '@/components/CategoryTabs/CategoryTabs'
import { ProductCarousel } from '@/components/ProductCarousel/ProductCarousel'
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle'
import type { Product } from '@/schemas/product'
import styles from './RelatedProductsSection.module.scss'

interface RelatedProductsSectionProps {
    products: Product[]
    loading: boolean
    onProductClick: (product: Product) => void
    title?: string
    subtitle?: string
    sectionId?: string
    error?: string | null
    onRetry?: () => void
    showCategories?: boolean
}

export function RelatedProductsSection({
    products,
    loading,
    onProductClick,
    title = 'Produtos relacionados',
    subtitle,
    sectionId,
    error,
    onRetry,
    showCategories = true,
}: RelatedProductsSectionProps) {
    return (
        <section aria-labelledby={sectionId} className={styles.section}>
            <div className={styles.section__container}>
                <SectionTitle text={title} subtitle={subtitle} headingId={sectionId} />
                {showCategories && <CategoryTabs />}
                <ProductCarousel
                    products={products}
                    loading={loading}
                    onProductClick={onProductClick}
                    error={error}
                    onRetry={onRetry}
                />
            </div>
        </section>
    )
}
