import styles from './Partners.module.scss';
import partnersImage from '../../assets/images/partners.png';

export function Partners() {
    return (
        <section className={styles.partners} aria-labelledby="partners-title">
            <div className={styles.partners__container}>
                <h2 id="partners-title" className={styles.partners__title}>
                    Nossos parceiros
                </h2>

                <ul className={styles.partners__list}>
                    {[1, 2].map((id) => (
                        <li key={id}>
                            <article className={styles.partners__card}>
                                <img
                                    src={partnersImage}
                                    alt="Banner de parceiro"
                                    loading="lazy"
                                    decoding="async"
                                />

                                <div className={styles.partners__content}>
                                    <h3>Parceiros</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                    </p>
                                    <button type="button">CONFIRA</button>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
