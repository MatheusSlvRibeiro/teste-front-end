import { useState } from 'react';
import { RelatedProductsSection } from '@/components/RelatedProductsSection/RelatedProductsSection';
import { CategoryIcons } from '@/components/CategoryIcons/CategoryIcons';
import { Header } from '@/components/Header/Header';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import { ProductModal } from '@/components/ProductModal/ProductModal';
import { TopBar } from '@/components/TopBar/TopBar';
import { useRelatedProducts } from '@/hooks/useRelatedProducts';
import type { Product } from '@/types/Product';
import styles from './Home.module.scss';

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
        <main>
            <TopBar />
            <Header />
            <HeroBanner />
            <div className={styles.constrainedContent}>
                <CategoryIcons />

                <RelatedProductsSection
                    sectionId="produtos"
                    products={products}
                    loading={loading}
                    onProductClick={handleProductClick}
                    error={error}
                    onRetry={retry}
                />
            </div>

            <ProductModal
                product={selectedProduct}
                onClose={handleCloseProductModal}
            />
        </main>
    );
}
