import { useState, type CSSProperties } from 'react';
import styles from './CategoryIcons.module.scss';

import technologyIcon from '@/assets/icons/categories/technology.svg';
import marketIcon from '@/assets/icons/categories/market.svg';
import drinksIcon from '@/assets/icons/categories/drink.svg';
import tools from '@/assets/icons/categories/tools.svg';
import health from '@/assets/icons/categories/health.svg';
import sports from '@/assets/icons/categories/sports.svg';
import fashion from '@/assets/icons/categories/fashion.svg';

type CategoryItem = {
    label: string;
    iconSrc: string;
};

const ITEMS: CategoryItem[] = [
    { label: 'Tecnologia', iconSrc: technologyIcon },
    { label: 'Supermercado', iconSrc: marketIcon },
    { label: 'Bebidas', iconSrc: drinksIcon },
    { label: 'Ferramentas', iconSrc: tools },
    { label: 'Saúde', iconSrc: health },
    { label: 'Esportes e Fitness', iconSrc: sports },
    { label: 'Moda', iconSrc: fashion },
];

export function CategoryIcons() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section
            className={styles.categories}
            aria-label="Categorias da loja"
            id="categorias"
        >
            <div className={styles.categories__container}>
                {ITEMS.map((item, index) => (
                    <button
                        key={item.label}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-pressed={activeIndex === index}
                        className={[
                            styles.categories__item,
                            activeIndex === index
                                ? styles['categories__item--active']
                                : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                    >
                        <span
                            className={styles.categories__icon}
                            aria-hidden="true"
                        >
                            <span
                                className={styles.categories__iconGlyph}
                                style={
                                    {
                                        '--icon-url': `url(${item.iconSrc})`,
                                    } as CSSProperties
                                }
                            />
                        </span>

                        <span className={styles.categories__label}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}
