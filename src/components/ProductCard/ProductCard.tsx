import type { Product } from '@app-types/Product';
import {
    formatCurrency,
    formatInstallments,
    getOldPrice,
} from '@utils/formatters';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
    index: number;
}

export function ProductCard({ product, onClick, index }: ProductCardProps) {
    const oldPrice = product.oldPrice ?? getOldPrice(product.price);
    const handleCardAction = () => onClick(product);
    const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCardAction();
        }
    };

    return (
        <article
            className={styles.card}
            onClick={handleCardAction}
            onKeyDown={handleCardKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Ver detalhes de ${product.productName}`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className={styles['card__image-wrapper']}>
                <img
                    className={styles.card__image}
                    src={product.photo}
                    alt={product.productName}
                    loading="lazy"
                    width={200}
                    height={200}
                />
            </div>

            <p className={styles.card__name}>{product.descriptionShort}</p>

            <span className={styles['card__old-price']}>
                {formatCurrency(oldPrice)}
            </span>

            <span className={styles.card__price}>
                {formatCurrency(product.price)}
            </span>

            <span className={styles.card__installments}>
                {formatInstallments(product.price, 2, product.installmentValue)}
            </span>

            <span className={styles.card__shipping}>Frete grátis</span>

            <button
                className={styles.card__button}
                onClick={(e) => {
                    e.stopPropagation();
                    handleCardAction();
                }}
                type="button"
            >
                COMPRAR
            </button>
        </article>
    );
}

export function ProductCardSkeleton() {
    return (
        <div className={styles.skeleton} aria-hidden="true">
            <div className={styles.skeleton__image} />
            <div className={styles.skeleton__text} />
            <div
                className={`${styles.skeleton__text} ${styles['skeleton__text--short']}`}
            />
            <div
                className={`${styles.skeleton__text} ${styles['skeleton__text--price']}`}
            />
            <div
                className={`${styles.skeleton__text} ${styles['skeleton__text--medium']}`}
            />
            <div className={styles.skeleton__button} />
        </div>
    );
}
