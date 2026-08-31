import styles from './SectionTitle.module.scss'

interface SectionTitleProps {
    text: string
    subtitle?: string
    headingId?: string
}

export function SectionTitle({ text, subtitle, headingId }: SectionTitleProps) {
    return (
        <div>
            <div className={styles.title}>
                <hr className={styles.title__line} aria-hidden="true" />
                <h2 id={headingId} className={styles.title__heading}>
                    {text}
                </h2>
                <hr className={styles.title__line} aria-hidden="true" />
            </div>
            {subtitle !== undefined && <p className={styles.title__subtitle}>{subtitle}</p>}
        </div>
    )
}
