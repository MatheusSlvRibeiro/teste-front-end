import {
    useState,
    useCallback,
    useMemo,
    useEffect,
    useRef,
    type CSSProperties,
    type PointerEvent as ReactPointerEvent,
    type MouseEvent as ReactMouseEvent,
    type WheelEvent,
} from 'react';
import type { Product } from '@/types/product.schema';
import {
    ProductCard,
    ProductCardSkeleton,
} from '@components/ProductCard/ProductCard';
import styles from './ProductCarousel.module.scss';

interface ProductCarouselProps {
    products: Product[];
    loading: boolean;
    onProductClick: (product: Product) => void;
}

const MOBILE_BREAKPOINT = 480;
const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1280;
const WHEEL_MIN_DELTA = 8;
const WHEEL_NAV_THROTTLE_MS = 220;
const DRAG_THRESHOLD = 48;
const DRAG_START_THRESHOLD = 4;

function getItemsPerPage(width: number): number {
    if (width <= MOBILE_BREAKPOINT) return 1;
    if (width <= TABLET_BREAKPOINT) return 2;
    if (width <= DESKTOP_BREAKPOINT) return 3;
    return 4;
}

function useItemsPerPage(): number {
    const getCurrentValue = () => {
        if (typeof window === 'undefined') return 4;
        return getItemsPerPage(window.innerWidth);
    };

    const [itemsPerPage, setItemsPerPage] = useState<number>(getCurrentValue);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setItemsPerPage(getItemsPerPage(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return itemsPerPage;
}

export function ProductCarousel({
    products,
    loading,
    onProductClick,
}: ProductCarouselProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const itemsPerPage = useItemsPerPage();
    const lastWheelNavigationAt = useRef(0);
    const isPointerDown = useRef(false);
    const dragStartX = useRef(0);
    const dragDeltaX = useRef(0);
    const suppressClick = useRef(false);

    const totalPages = useMemo(
        () => Math.ceil(products.length / itemsPerPage),
        [products.length, itemsPerPage],
    );
    const maxPageIndex = Math.max(totalPages - 1, 0);
    const safeCurrentPage = Math.min(currentPage, maxPageIndex);

    const visibleProducts = useMemo(
        () =>
            products.slice(
                safeCurrentPage * itemsPerPage,
                (safeCurrentPage + 1) * itemsPerPage,
            ),
        [products, safeCurrentPage, itemsPerPage],
    );

    const changePage = useCallback(
        (step: number) => {
            setCurrentPage((previousPage) => {
                const nextPage = previousPage + step;
                return Math.max(0, Math.min(nextPage, maxPageIndex));
            });
        },
        [maxPageIndex],
    );

    const goLeft = useCallback(() => changePage(-1), [changePage]);
    const goRight = useCallback(() => changePage(1), [changePage]);

    const handleTrackWheel = useCallback(
        (event: WheelEvent<HTMLDivElement>) => {
            if (totalPages <= 1) {
                return;
            }

            const dominantDelta =
                Math.abs(event.deltaX) > Math.abs(event.deltaY)
                    ? event.deltaX
                    : event.deltaY;

            if (Math.abs(dominantDelta) < WHEEL_MIN_DELTA) {
                return;
            }

            const now = Date.now();
            if (now - lastWheelNavigationAt.current < WHEEL_NAV_THROTTLE_MS) {
                return;
            }
            lastWheelNavigationAt.current = now;

            event.preventDefault();

            if (dominantDelta > 0) {
                goRight();
                return;
            }

            goLeft();
        },
        [goLeft, goRight, totalPages],
    );

    const completeDrag = useCallback(() => {
        if (!isPointerDown.current) {
            return;
        }

        const movedDistance = dragDeltaX.current;
        if (Math.abs(movedDistance) >= DRAG_THRESHOLD) {
            if (movedDistance < 0) {
                goRight();
            } else {
                goLeft();
            }
            suppressClick.current = true;
            window.setTimeout(() => {
                suppressClick.current = false;
            }, 0);
        }

        isPointerDown.current = false;
        dragDeltaX.current = 0;
        setIsDragging(false);
    }, [goLeft, goRight]);

    const handleTrackPointerDown = useCallback(
        (event: ReactPointerEvent<HTMLDivElement>) => {
            if (event.pointerType === 'mouse' && event.button !== 0) {
                return;
            }

            isPointerDown.current = true;
            dragStartX.current = event.clientX;
            dragDeltaX.current = 0;
        },
        [],
    );

    const handleTrackPointerMove = useCallback(
        (event: ReactPointerEvent<HTMLDivElement>) => {
            if (!isPointerDown.current) {
                return;
            }

            dragDeltaX.current = event.clientX - dragStartX.current;
            if (Math.abs(dragDeltaX.current) > DRAG_START_THRESHOLD) {
                setIsDragging(true);
            }
        },
        [],
    );

    const handleTrackPointerUp = useCallback(() => {
        completeDrag();
    }, [completeDrag]);

    const handleTrackClickCapture = useCallback(
        (event: ReactMouseEvent<HTMLDivElement>) => {
            if (!suppressClick.current) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
        },
        [],
    );

    const trackStyle = useMemo(
        () => ({ '--items-per-page': itemsPerPage }) as CSSProperties,
        [itemsPerPage],
    );

    if (loading) {
        return (
            <div className={styles.carousel}>
                <div className={styles.carousel__track} style={trackStyle}>
                    {Array.from({ length: itemsPerPage }).map((_, i) => (
                        <div key={i} className={styles.slide}>
                            <ProductCardSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className={styles.carousel}
            role="region"
            aria-label="Carrossel de produtos"
            aria-roledescription="carousel"
        >
            <button
                className={`${styles.carousel__arrow} ${styles['carousel__arrow--left']}`}
                onClick={goLeft}
                disabled={safeCurrentPage === 0}
                aria-label="Produtos anteriores"
                type="button"
            >
                <span
                    className={`${styles['carousel__arrow-icon']} ${styles['carousel__arrow-icon--left']}`}
                    aria-hidden="true"
                />
            </button>

            <div
                className={`${styles.carousel__track} ${isDragging ? styles['carousel__track--dragging'] : ''}`}
                style={trackStyle}
                aria-live="polite"
                onWheel={handleTrackWheel}
                onPointerDown={handleTrackPointerDown}
                onPointerMove={handleTrackPointerMove}
                onPointerUp={handleTrackPointerUp}
                onPointerCancel={completeDrag}
                onPointerLeave={completeDrag}
                onClickCapture={handleTrackClickCapture}
            >
                {visibleProducts.map((product, index) => (
                    <div
                        key={`${product.id}-${safeCurrentPage}`}
                        className={`${styles.slide} ${styles['slide-enter']}`}
                    >
                        <ProductCard
                            product={product}
                            onClick={onProductClick}
                            index={index}
                        />
                    </div>
                ))}
            </div>

            <button
                className={`${styles.carousel__arrow} ${styles['carousel__arrow--right']}`}
                onClick={goRight}
                disabled={safeCurrentPage >= maxPageIndex}
                aria-label="Próximos produtos"
                type="button"
            >
                <span
                    className={`${styles['carousel__arrow-icon']} ${styles['carousel__arrow-icon--right']}`}
                    aria-hidden="true"
                />
            </button>
        </div>
    );
}
