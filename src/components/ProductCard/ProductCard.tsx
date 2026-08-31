import { formatCurrency } from '@/lib/format'
import type { Product } from '@/schemas/product'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
    product: Product
    onSelect: (product: Product) => void
    index?: number
}

export function ProductCard({ product, onSelect, index = 0 }: ProductCardProps) {
    const installmentValue = product.installmentValue ?? product.price / 2

    return (
        <button
            type="button"
            className={`${styles.card} ${styles['slide-enter']}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            aria-label={product.productName}
            onClick={() => onSelect(product)}
        >
            <img className={styles.card__image} src={product.photo} alt={product.productName} />
            <p className={styles.card__description}>{product.descriptionShort}</p>
            {product.oldPrice !== undefined && (
                <span className={styles.card__old_price}>{formatCurrency(product.oldPrice)}</span>
            )}
            <span className={styles.card__price}>{formatCurrency(product.price)}</span>
            <span className={styles.card__installment}>
                ou 2x de {formatCurrency(installmentValue)} sem juros
            </span>
            <span className={styles.card__freight}>Frete grátis</span>
            <span className={styles.card__cta}>COMPRAR</span>
        </button>
    )
}

export function ProductCardSkeleton() {
    return <div className={styles['card--skeleton']} aria-hidden="true" />
}
