import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
    text: string;
    subtitle?: string;
}

export function SectionTitle({ text, subtitle }: SectionTitleProps) {
    return (
        <div className={styles['section-title-wrap']}>
            <div className={styles['section-title']}>
                <div
                    className={styles['section-title__line']}
                    aria-hidden="true"
                />
                <h2 className={styles['section-title__text']}>{text}</h2>
                <div
                    className={styles['section-title__line']}
                    aria-hidden="true"
                />
            </div>
            {subtitle ? (
                <span className={styles['section-title__subtitle']}>
                    {subtitle}
                </span>
            ) : null}
        </div>
    );
}
