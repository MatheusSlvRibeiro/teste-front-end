import styles from './HeroBanner.module.scss';

export function HeroBanner() {
    return (
        <section className={styles.hero} aria-label="Promocoes da loja">
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
