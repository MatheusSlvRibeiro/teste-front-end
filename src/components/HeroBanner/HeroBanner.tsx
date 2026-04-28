import heroPng from '@assets/images/hero-image.png';
import heroWebp from '@assets/images/hero-image.webp';
import styles from './HeroBanner.module.scss';

export function HeroBanner() {
    return (
        <section className={styles.hero} aria-label="Promocoes da loja">
            <picture>
                <source srcSet={heroWebp} type="image/webp" />
                <img
                    src={heroPng}
                    alt=""
                    aria-hidden="true"
                    fetchPriority="high"
                    className={styles.hero__image}
                />
            </picture>

            <div className={styles.hero__overlay}>
                <div className={styles.hero__content}>
                    <h1>Venha conhecer nossas promocoes</h1>
                    <p>
                        <strong>50% Off</strong> nos produtos
                    </p>
                    <button type="button">Ver produto</button>
                </div>
            </div>
        </section>
    );
}
