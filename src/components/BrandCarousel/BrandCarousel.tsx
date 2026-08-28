import { useId } from 'react'
import logoEconverse from '@/assets/logo-econverse.svg'
import styles from './BrandCarousel.module.scss'

// Sem um JSON de marcas real, reaproveitamos o logo da Econverse como placeholder
// visual para 5 slots de marca (ver critério de aceitação da issue M01-S06-T02).
const BRAND_SLOTS = 5

export function BrandCarousel() {
  const titleId = useId()

  return (
    <section className={styles.brandCarousel} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.brandCarousel__title}>
        Navegue por marcas
      </h2>

      <ul className={styles.brandCarousel__list} role="list">
        {Array.from({ length: BRAND_SLOTS }, (_, index) => (
          <li key={index} className={styles.brandCarousel__item}>
            <img
              className={styles.brandCarousel__logo}
              src={logoEconverse}
              alt=""
              aria-hidden="true"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
