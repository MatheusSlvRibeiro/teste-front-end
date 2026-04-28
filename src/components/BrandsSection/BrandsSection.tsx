import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { Logo } from '@/components/ui/Logo/Logo';
import styles from './BrandsSection.module.scss';

import logoEconverse from '@assets/logo-econverse.svg';

const BRANDS = [
    { id: 1, name: 'Econverse', src: logoEconverse, href: '/' },
    { id: 2, name: 'Econverse', src: logoEconverse, href: '/' },
    { id: 3, name: 'Econverse', src: logoEconverse, href: '/' },
    { id: 4, name: 'Econverse', src: logoEconverse, href: '/' },
    { id: 5, name: 'Econverse', src: logoEconverse, href: '/' },
];

export function BrandsSection() {
    return (
        <section className={styles.brands} aria-label="Navegue por marcas">
            <div className={styles.brands__container}>
                <SectionTitle text="Navegue por marcas" />

                <div className={styles.brands__list}>
                    {BRANDS.map((brand) => (
                        <div className={styles.brands__logo} key={brand.id}>
                            <Logo
                                href={brand.href}
                                ariaLabel={brand.name}
                                src={brand.src}
                                alt={brand.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
