import { Modal } from '@/components/Modal/Modal'
import { formatCurrency } from '@/lib/format'
import type { Product } from '@/schemas/product'
import styles from './ProductDetailModal.module.scss'

interface ProductDetailModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  return (
    <Modal isOpen={product !== null} onClose={onClose} labelledBy="product-detail-title">
      {product && (
        <div className={styles.detail}>
          <img className={styles.detail__image} src={product.photo} alt={product.productName} />
          <div className={styles.detail__info}>
            <h2 id="product-detail-title" className={styles.detail__title}>
              {product.productName}
            </h2>
            <p className={styles.detail__price}>{formatCurrency(product.price)}</p>
            <p className={styles.detail__description}>{product.descriptionShort}</p>
          </div>
        </div>
      )}
    </Modal>
  )
}
