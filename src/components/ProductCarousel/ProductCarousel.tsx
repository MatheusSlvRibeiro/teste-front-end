import { useEffect, useRef, useState } from 'react'
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard/ProductCard'
import type { Product } from '@/schemas/product'
import styles from './ProductCarousel.module.scss'

function getItemsPerPage(): number {
    const w = window.innerWidth
    if (w >= 1024) return 4
    if (w >= 768) return 3
    if (w >= 480) return 2
    return 1
}

function useItemsPerPage(): number {
    const [items, setItems] = useState(getItemsPerPage())

    useEffect(() => {
        function update() {
            setItems(getItemsPerPage())
        }
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    return items
}

interface ProductCarouselProps {
    products: Product[]
    loading: boolean
    onProductClick: (product: Product) => void
    error?: string | null
    onRetry?: () => void
}

export function ProductCarousel({
    products,
    loading,
    onProductClick,
    error,
    onRetry,
}: ProductCarouselProps) {
    const itemsPerPage = useItemsPerPage()
    const [page, setPage] = useState(0)

    const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage))

    // Clamp page when itemsPerPage changes
    const clampedPage = Math.min(page, totalPages - 1)

    const dragStartX = useRef<number | null>(null)
    const isDragging = useRef(false)
    const lastWheelTime = useRef(0)

    function goToPrev() {
        setPage((p) => Math.max(0, p - 1))
    }

    function goToNext() {
        setPage((p) => Math.min(totalPages - 1, p + 1))
    }

    function handlePointerDown(e: React.PointerEvent) {
        dragStartX.current = e.clientX
        isDragging.current = false
    }

    function handlePointerMove(e: React.PointerEvent) {
        if (dragStartX.current === null) return
        const delta = dragStartX.current - e.clientX
        if (Math.abs(delta) > 48) {
            isDragging.current = true
        }
    }

    function handlePointerUp(e: React.PointerEvent) {
        if (dragStartX.current === null) return
        const delta = dragStartX.current - e.clientX
        if (Math.abs(delta) > 48) {
            isDragging.current = true
            if (delta > 0) {
                goToNext()
            } else {
                goToPrev()
            }
        }
        dragStartX.current = null
        // Suppress click if dragged
        if (isDragging.current) {
            e.stopPropagation()
        }
    }

    function handleWheel(e: React.WheelEvent) {
        const now = Date.now()
        if (now - lastWheelTime.current < 220) return
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
        if (Math.abs(delta) > 8) {
            lastWheelTime.current = now
            if (delta > 0) {
                goToNext()
            } else {
                goToPrev()
            }
        }
    }

    const pageStart = clampedPage * itemsPerPage
    const currentProducts = products.slice(pageStart, pageStart + itemsPerPage)

    if (error !== undefined && error !== null) {
        return (
            <div className={styles.carousel__error}>
                <p>{error}</p>
                {onRetry !== undefined && (
                    <button type="button" onClick={onRetry}>
                        Tentar novamente
                    </button>
                )}
            </div>
        )
    }

    return (
        <div
            className={styles.carousel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onWheel={handleWheel}
        >
            <div
                className={styles.carousel__track}
                aria-live="polite"
                style={{ '--items-per-page': itemsPerPage } as React.CSSProperties}
            >
                {loading
                    ? Array.from({ length: itemsPerPage }).map((_, i) => (
                          <div key={i} className={styles.carousel__slide} role="status">
                              <ProductCardSkeleton />
                          </div>
                      ))
                    : currentProducts.map((product, i) => (
                          <div key={product.id} className={styles.carousel__slide}>
                              <ProductCard product={product} onSelect={onProductClick} index={i} />
                          </div>
                      ))}
            </div>

            <button
                type="button"
                className={`${styles.carousel__arrow} ${styles['carousel__arrow--prev']}`}
                aria-label="Anterior"
                onClick={goToPrev}
                disabled={clampedPage === 0}
            />

            <button
                type="button"
                className={`${styles.carousel__arrow} ${styles['carousel__arrow--next']}`}
                aria-label="Próximo"
                onClick={goToNext}
                disabled={clampedPage >= totalPages - 1}
            />
        </div>
    )
}
