import { useState } from 'react';
import styles from './CategoryTabs.module.scss';

const CATEGORIES = [
    'CELULAR',
    'ACESSÓRIOS',
    'TABLETS',
    'NOTEBOOKS',
    'TVS',
    'VER TODOS',
];

export function CategoryTabs() {
    const [active, setActive] = useState(0);

    return (
        <nav className={styles.tabs} aria-label="Categorias de produtos">
            {CATEGORIES.map((category, index) => (
                <button
                    key={category}
                    className={`${styles.tab} ${index === active ? styles['tab--active'] : ''}`}
                    onClick={() => setActive(index)}
                    aria-pressed={index === active}
                    type="button"
                >
                    {category}
                </button>
            ))}
        </nav>
    );
}
