import type { Product } from '@/types/Product';
import { CategoryTabs } from '../CategoryTabs/CategoryTabs';
import { ProductCarousel } from '../ProductCarousel/ProductCarousel';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import styles from './RelatedProductsSection.module.scss';

interface RelatedProductsSectionProps {
    products: Product[];
    loading: boolean;
    onProductClick: (product: Product) => void;
    title?: string;
    subtitle?: string;
    sectionId?: string;
    error?: string | null;
    onRetry?: () => void;
    showCategories?: boolean;
    viewMoreLabel?: string;
    onViewMore?: () => void;
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
    viewMoreLabel = 'Ver mais',
    onViewMore,
}: RelatedProductsSectionProps) {
    return (
        <section
            className={styles.productsSection}
            id={sectionId}
            aria-label={title}
        >
            <div className={styles.container}>
                <header>
                    <SectionTitle text={title} subtitle={subtitle} />
                </header>

                {showCategories ? (
                    <CategoryTabs />
                ) : (
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.viewMoreButton}
                            aria-label={`Ver mais produtos da seção ${title}`}
                            onClick={onViewMore}
                        >
                            {viewMoreLabel}
                        </button>
                    </div>
                )}

                {error ? (
                    <div
                        className={styles.error}
                        role="alert"
                        aria-live="assertive"
                    >
                        <div
                            className={styles['error__icon']}
                            aria-hidden="true"
                        >
                            ⚠️
                        </div>
                        <p className={styles['error__message']}>{error}</p>
                        {onRetry ? (
                            <button
                                className={styles['error__button']}
                                onClick={onRetry}
                                type="button"
                            >
                                Tentar novamente
                            </button>
                        ) : null}
                    </div>
                ) : (
                    <ProductCarousel
                        products={products}
                        loading={loading}
                        onProductClick={onProductClick}
                    />
                )}
            </div>
        </section>
    );
}
