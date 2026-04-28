import { Logo } from '@components/ui/Logo/Logo';
import logoEconverse from '@assets/logo-econverse.svg';
import instagramIcon from '@assets/icons/social/instagram.svg';
import facebookIcon from '@assets/icons/social/facebook.svg';
import linkedinIcon from '@assets/icons/social/linkedin.svg';

import styles from './Footer.module.scss';

const socialLinks = [
    { label: 'Instagram', icon: instagramIcon },
    { label: 'Facebook', icon: facebookIcon },
    { label: 'LinkedIn', icon: linkedinIcon },
];

const footerSections = [
    {
        title: 'Institucional',
        links: ['Sobre Nos', 'Movimento', 'Trabalhe conosco'],
    },
    {
        title: 'Ajuda',
        links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'],
    },
    {
        title: 'Termos',
        links: [
            'Termos e Condicoes',
            'Politica de Privacidade',
            'Troca e Devolucao',
        ],
    },
];

export function Footer() {
    return (
        <footer className={styles.footer} role="contentinfo">
            <div className={styles.footer__container}>
                <div className={styles.footer__grid}>
                    <section className={styles.footer__brand}>
                        <Logo
                            className={styles.footer__logo}
                            href="/"
                            ariaLabel="Econverse"
                            src={logoEconverse}
                            alt="Econverse"
                        />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </p>
                        <div
                            className={styles.footer__social}
                            aria-label="Redes sociais"
                        >
                            {socialLinks.map(({ label, icon }) => (
                                <a
                                    key={label}
                                    href="#"
                                    className={styles['footer__social-link']}
                                    aria-label={label}
                                >
                                    <img src={icon} alt="" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </section>

                    {footerSections.map(({ title, links }) => (
                        <section key={title}>
                            <h3 className={styles.footer__title}>{title}</h3>
                            <div className={styles.footer__links}>
                                {links.map((link) => (
                                    <a
                                        key={`${title}-${link}`}
                                        href="#"
                                        className={styles.footer__link}
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            <div className={styles.footer__bottom}>
                <div className={styles.footer__container}>
                    <p className={styles.footer__bottomText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </div>
        </footer>
    );
}
