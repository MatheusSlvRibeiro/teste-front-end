import {
    useEffect,
    useState,
    useCallback,
    useRef,
    type MouseEvent,
} from 'react';
import xIcon from '@assets/icons/x.svg';
import type { Product } from '@/types/product.schema';
import { formatCurrency } from '@utils/formatters';
import styles from './ProductModal.module.scss';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

const CLOSE_ANIMATION_MS = 200;
const MIN_QUANTITY = 1;

export function ProductModal({ product, onClose }: ProductModalProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const closeTimeoutRef = useRef<number | null>(null);

    const clearCloseTimeout = useCallback(() => {
        if (closeTimeoutRef.current === null) {
            return;
        }

        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
    }, []);

    const handleClose = useCallback(() => {
        clearCloseTimeout();
        setIsClosing(true);
        closeTimeoutRef.current = window.setTimeout(() => {
            setIsClosing(false);
            onClose();
            closeTimeoutRef.current = null;
        }, CLOSE_ANIMATION_MS);
    }, [clearCloseTimeout, onClose]);

    const handleDecreaseQuantity = useCallback(() => {
        setQuantity((previous) => Math.max(MIN_QUANTITY, previous - 1));
    }, []);

    const handleIncreaseQuantity = useCallback(() => {
        setQuantity((previous) => previous + 1);
    }, []);

    const handleModalClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
        },
        [],
    );

    const handleDetailsClick = useCallback(
        (event: MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
        },
        [],
    );

    useEffect(() => {
        if (!product) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
            clearCloseTimeout();
        };
    }, [product, handleClose, clearCloseTimeout]);

    if (!product) return null;

    return (
        <div
            className={`${styles.overlay} ${isClosing ? styles['overlay--closing'] : ''}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className={styles.modal}
                onClick={handleModalClick}
                role="document"
            >
                <button
                    className={styles.modal__close}
                    onClick={handleClose}
                    aria-label="Fechar modal"
                    type="button"
                >
                    <img src={xIcon} alt="" aria-hidden="true" />
                </button>

                <div className={styles.modal__content}>
                    <div className={styles['modal__image-section']}>
                        <img
                            className={styles.modal__image}
                            src={product.photo}
                            alt={product.productName}
                            width={280}
                            height={280}
                        />
                    </div>

                    <div className={styles.modal__info}>
                        <h2 id="modal-title" className={styles.modal__name}>
                            {product.productName}
                        </h2>

                        <span className={styles.modal__price}>
                            {formatCurrency(product.price)}
                        </span>

                        <p className={styles.modal__description}>
                            {product.descriptionShort}
                        </p>

                        <a
                            href="#"
                            className={styles.modal__details}
                            onClick={handleDetailsClick}
                        >
                            Veja mais detalhes do produto &gt;
                        </a>

                        <div className={styles.modal__actions}>
                            <div className={styles.modal__counter}>
                                <button
                                    type="button"
                                    onClick={handleDecreaseQuantity}
                                    aria-label="Diminuir quantidade"
                                >
                                    -
                                </button>
                                <span>{String(quantity).padStart(2, '0')}</span>
                                <button
                                    type="button"
                                    onClick={handleIncreaseQuantity}
                                    aria-label="Aumentar quantidade"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className={styles.modal__buyButton}
                                type="button"
                            >
                                COMPRAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
