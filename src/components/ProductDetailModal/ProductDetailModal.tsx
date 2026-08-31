import { useState } from 'react'
import { Modal } from '@/components/Modal/Modal'
import { formatCurrency } from '@/lib/format'
import type { Product } from '@/schemas/product'
import styles from './ProductDetailModal.module.scss'

interface ProductDetailModalProps {
    product: Product | null
    onClose: () => void
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
    const [quantity, setQuantity] = useState(1)
    const [prevProduct, setPrevProduct] = useState<Product | null>(product)

    if (prevProduct !== product) {
        setPrevProduct(product)
        setQuantity(1)
    }

    return (
        <Modal isOpen={product !== null} onClose={onClose} labelledBy="product-detail-title">
            {product && (
                <div className={styles.detail}>
                    <img
                        className={styles.detail__image}
                        src={product.photo}
                        alt={product.productName}
                    />
                    <div className={styles.detail__info}>
                        <h2 id="product-detail-title" className={styles.detail__title}>
                            {product.productName}
                        </h2>
                        <p className={styles.detail__price}>{formatCurrency(product.price)}</p>
                        <p className={styles.detail__description}>{product.descriptionShort}</p>
                        <div className={styles.detail__counter}>
                            <button
                                type="button"
                                className={styles.detail__counterBtn}
                                aria-label="Diminuir quantidade"
                                disabled={quantity === 1}
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                                -
                            </button>
                            <span className={styles.detail__counterValue}>
                                {String(quantity).padStart(2, '0')}
                            </span>
                            <button
                                type="button"
                                className={styles.detail__counterBtn}
                                aria-label="Aumentar quantidade"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>
                        <button type="button" className={styles.detail__buyBtn}>
                            COMPRAR
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    )
}
