import { formatCurrency } from '@/lib/format'
import type { Product } from '@/schemas/product'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <button type="button" className={styles.card} onClick={() => onSelect(product)}>
      <img className={styles.card__image} src={product.photo} alt={product.productName} />
      <p className={styles.card__description}>{product.descriptionShort}</p>
      <span className={styles.card__oldPrice}>De R$ 30,90</span>
      <span className={styles.card__price}>{formatCurrency(product.price)}</span>
      <span className={styles.card__installment}>ou 2x de R$ 49,95 sem juros</span>
      <span className={styles.card__freight}>Frete grátis</span>
      <span className={styles.card__cta}>COMPRAR</span>
    </button>
  )
}
