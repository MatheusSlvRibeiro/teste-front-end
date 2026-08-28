import logoEconverse from '@/assets/logo-econverse.svg'
import facebookIcon from '@/assets/icons/social/facebook.svg'
import instagramIcon from '@/assets/icons/social/instagram.svg'
import linkedinIcon from '@/assets/icons/social/linkedin.svg'
import styles from './Footer.module.scss'

interface FooterLink {
    label: string
    href: string
}

interface FooterColumn {
    title: string
    links: FooterLink[]
}

interface SocialLink {
    label: string
    href: string
    icon: string
}

const FOOTER_COLUMNS: FooterColumn[] = [
    {
        title: 'Institucional',
        links: [
            { label: 'Sobre Nós', href: '#' },
            { label: 'Movimento', href: '#' },
            { label: 'Trabalhe conosco', href: '#' },
        ],
    },
    {
        title: 'Ajuda',
        links: [
            { label: 'Suporte', href: '#' },
            { label: 'Fale Conosco', href: '#' },
            { label: 'Perguntas Frequentes', href: '#' },
        ],
    },
    {
        title: 'Termos',
        links: [
            { label: 'Termos e Condições', href: '#' },
            { label: 'Política de Privacidade', href: '#' },
            { label: 'Troca e Devolução', href: '#' },
        ],
    },
]

const SOCIAL_LINKS: SocialLink[] = [
    { label: 'Instagram', href: '#', icon: instagramIcon },
    { label: 'Facebook', href: '#', icon: facebookIcon },
    { label: 'LinkedIn', href: '#', icon: linkedinIcon },
]

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__main}>
                <div className={styles.footer__brand}>
                    <img
                        className={styles.footer__logo}
                        src={logoEconverse}
                        alt="Econverse"
                        width={139}
                        height={42}
                        decoding="async"
                    />
                    <p className={styles.footer__description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>

                    <ul className={styles.footer__social} aria-label="Redes sociais" role="list">
                        {SOCIAL_LINKS.map(({ label, href, icon }) => (
                            <li key={label}>
                                <a
                                    className={styles.footer__socialLink}
                                    href={href}
                                    aria-label={label}
                                >
                                    <img
                                        src={icon}
                                        alt=""
                                        aria-hidden="true"
                                        width={20}
                                        height={20}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.footer__divider} aria-hidden="true" />

                <nav className={styles.footer__columns} aria-label="Navegação do rodapé">
                    {FOOTER_COLUMNS.map((column) => (
                        <div key={column.title} className={styles.footer__column}>
                            <h2 className={styles.footer__columnTitle}>{column.title}</h2>
                            <ul className={styles.footer__columnList} role="list">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <a className={styles.footer__columnLink} href={link.href}>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>

            <div className={styles.footer__legal}>
                <p className={styles.footer__legalInner}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
        </footer>
    )
}
