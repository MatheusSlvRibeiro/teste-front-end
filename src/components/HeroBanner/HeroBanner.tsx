import styles from './HeroBanner.module.scss'

export function HeroBanner() {
  return (
    <section className={styles.hero} aria-label="Promoção em destaque">
      <div className={styles.hero__content}>
        <p className={styles.hero__headline}>Venha conhecer nossas promoções</p>
        <p className={styles.hero__discount}>
          <span className={styles.hero__discountHighlight}>50% Off</span> nos produtos
        </p>
        <button type="button" className={styles.hero__cta}>
          Ver produto
        </button>
      </div>
    </section>
  )
}
