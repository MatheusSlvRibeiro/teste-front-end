import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout/AppLayout';
import { RelatedProductsSection } from '@/components/RelatedProductsSection/RelatedProductsSection';
import { CategoryIcons } from '@/components/CategoryIcons/CategoryIcons';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import { ProductModal } from '@/components/ProductModal/ProductModal';
import { useRelatedProducts } from '@/hooks/useRelatedProducts';
import type { Product } from '@/types/product.schema';
import styles from './Home.module.scss';
import { Partners } from '@/components/Partners/Partners';
import { BrandsSection } from '@/components/BrandsSection/BrandsSection';
import { Newsletter } from '@/components/Newsletter/Newsletter';

export default function Home() {
    const { products, loading, error, retry } = useRelatedProducts();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseProductModal = () => {
        setSelectedProduct(null);
    };

    return (
        <AppLayout>
            <HeroBanner />
            <div className={styles.constrainedContent}>
                <CategoryIcons />

                <RelatedProductsSection
                    sectionId="produtos-relacionados"
                    products={products}
                    loading={loading}
                    onProductClick={handleProductClick}
                    error={error}
                    onRetry={retry}
                    showCategories
                />

                <Partners />

                <RelatedProductsSection
                    sectionId="produtos-destaque"
                    products={products}
                    loading={loading}
                    onProductClick={handleProductClick}
                    error={error}
                    onRetry={retry}
                    showCategories={false}
                    viewMoreLabel="Ver todos"
                />

                <Partners />

                <BrandsSection />

                <RelatedProductsSection
                    sectionId="produtos-novidades"
                    products={products}
                    loading={loading}
                    onProductClick={handleProductClick}
                    error={error}
                    onRetry={retry}
                    showCategories={false}
                    viewMoreLabel="Ver todos"
                />
            </div>

            <Newsletter />

            <ProductModal
                product={selectedProduct}
                onClose={handleCloseProductModal}
            />
        </AppLayout>
    );
}
