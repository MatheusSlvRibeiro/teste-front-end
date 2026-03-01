import styles from './Logo.module.scss';

type LogoProps = {
    href: string;
    ariaLabel: string;
    src: string;
    alt: string;
    className?: string;
};

export function Logo({ href, ariaLabel, src, alt, className }: LogoProps) {
    return (
        <a
            href={href}
            aria-label={ariaLabel}
            className={`${styles.logo}${className ? ` ${className}` : ''}`}
        >
            <img src={src} alt={alt} />
        </a>
    );
}
