import type { ComponentType } from 'react'
import { DrinkIcon } from '@/components/icons/DrinkIcon'
import { FashionIcon } from '@/components/icons/FashionIcon'
import { FitnessIcon } from '@/components/icons/FitnessIcon'
import { GroceryIcon } from '@/components/icons/GroceryIcon'
import { HealthIcon } from '@/components/icons/HealthIcon'
import { TechIcon } from '@/components/icons/TechIcon'
import { ToolIcon } from '@/components/icons/ToolIcon'
import styles from './CategoryGrid.module.scss'

interface IconProps {
    size?: number
}

interface CategoryItem {
    label: string
    Icon: ComponentType<IconProps>
    active?: boolean
}

const CATEGORIES: CategoryItem[] = [
    { label: 'Tecnologia', Icon: TechIcon, active: true },
    { label: 'Supermercado', Icon: GroceryIcon },
    { label: 'Bebidas', Icon: DrinkIcon },
    { label: 'Ferramentas', Icon: ToolIcon },
    { label: 'Saúde', Icon: HealthIcon },
    { label: 'Esportes e Fitness', Icon: FitnessIcon },
    { label: 'Moda', Icon: FashionIcon },
]

export function CategoryGrid() {
    return (
        <section className={styles.categoryGrid} aria-label="Categorias em destaque">
            <ul className={styles.categoryGrid__list} role="list">
                {CATEGORIES.map(({ label, Icon, active }) => (
                    <li
                        key={label}
                        aria-current={active ? 'true' : undefined}
                        className={`${styles.categoryGrid__item} ${active ? styles['categoryGrid__item--active'] : ''}`.trim()}
                    >
                        <Icon />
                        <span>{label}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
