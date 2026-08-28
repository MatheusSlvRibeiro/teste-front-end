import { useId } from 'react'
import { Button } from '@/components/ui/Button/Button'
import styles from './HeroBanner.module.scss'

export function HeroBanner() {
    const headingId = useId()

    return (
        <section className={styles.hero} aria-labelledby={headingId}>
            <div className={styles.hero__content}>
                <h1 id={headingId} className={styles.hero__headline}>
                    Venha conhecer nossas promoções
                </h1>
                <p className={styles.hero__discount}>
                    <span className={styles.hero__discountHighlight}>50% Off</span> nos produtos
                </p>
                <Button className={styles.hero__cta}>Ver produto</Button>
            </div>
        </section>
    )
}
