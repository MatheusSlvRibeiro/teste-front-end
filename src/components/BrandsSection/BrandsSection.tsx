import { SectionTitle } from '@components/SectionTitle/SectionTitle';
import { Logo } from '@components/Logo/Logo';
import styles from './BrandsSection.module.scss';

import logoEconverse from '@assets/logo-econverse.svg';

export function BrandsSection() {
    return (
        <section className={styles.brands} aria-label="Navegue por marcas">
            <div className={styles.brands__container}>
                <SectionTitle text="Navegue por marcas" />

                <div className={styles.brands__list}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className={styles.brands__logo} key={index}>
                            <Logo
                                href="/"
                                ariaLabel="Econverse"
                                src={logoEconverse}
                                alt="Econverse"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
