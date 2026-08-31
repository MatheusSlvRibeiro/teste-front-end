import { useState } from 'react'
import styles from './CategoryTabs.module.scss'

const DEFAULT_CATEGORIES = ['CELULAR', 'ACESSÓRIOS', 'TABLETS', 'NOTEBOOKS', 'TVS', 'VER TODOS']

interface CategoryTabsProps {
    categories?: string[]
    activeIndex?: number
    onChange?: (index: number) => void
}

export function CategoryTabs({
    categories = DEFAULT_CATEGORIES,
    activeIndex,
    onChange,
}: CategoryTabsProps) {
    const [internalIndex, setInternalIndex] = useState(0)

    const controlled = onChange !== undefined
    const currentIndex = controlled ? (activeIndex ?? 0) : internalIndex

    function handleClick(index: number) {
        if (controlled) {
            onChange(index)
        } else {
            setInternalIndex(index)
        }
    }

    return (
        <nav aria-label="Filtrar por categoria">
            <ul className={styles.tabs} role="list">
                {categories.map((category, index) => (
                    <li key={category} role="listitem">
                        <button
                            type="button"
                            className={`${styles.tabs__item} ${index === currentIndex ? styles['tabs__item--active'] : ''}`}
                            aria-pressed={index === currentIndex}
                            onClick={() => handleClick(index)}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
