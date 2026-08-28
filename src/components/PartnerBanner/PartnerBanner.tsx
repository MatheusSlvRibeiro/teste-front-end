import { useId } from 'react'
import partnersImage from '@/assets/images/partners.webp'
import styles from './PartnerBanner.module.scss'

interface PartnerBannerProps {
  description: string
  title?: string
  ctaLabel?: string
}

export function PartnerBanner({
  description,
  title = 'Parceiros',
  ctaLabel = 'CONFIRA',
}: PartnerBannerProps) {
  const titleId = useId()

  return (
    <section className={styles.partnerBanner} aria-labelledby={titleId}>
      <img className={styles.partnerBanner__image} src={partnersImage} alt="" aria-hidden="true" />

      <div className={styles.partnerBanner__content}>
        <h2 id={titleId} className={styles.partnerBanner__title}>
          {title}
        </h2>
        <p className={styles.partnerBanner__description}>{description}</p>
        <button type="button" className={styles.partnerBanner__cta}>
          {ctaLabel}
        </button>
      </div>
    </section>
  )
}
