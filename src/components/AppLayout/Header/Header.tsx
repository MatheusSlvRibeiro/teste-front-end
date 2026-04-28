import { type MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import { Logo } from '@components/ui/Logo/Logo';
import { SearchInput } from '@components/ui/SearchInput/SearchInput';

import logoEconverse from '@assets/logo-econverse.svg';
import userIcon from '@assets/icons/user.svg';
import cartIcon from '@assets/icons/shopping-cart.svg';
import packageIcon from '@assets/icons/package.svg';
import heartIcon from '@assets/icons/heart.svg';
import menuIcon from '@assets/icons/menu.svg';
import closeIcon from '@assets/icons/x.svg';
import kingIcon from '@assets/icons/king.svg';

type MenuItem = {
    label: string;
    href: string;
    isStrong?: boolean;
};

type HeaderActionItem = {
    label: string;
    href: string;
    icon: string;
    desktopOnly?: boolean;
    iconClassName?: string;
};

type DesktopCategoryItem = {
    label: string;
    href: string;
    isHighlight?: boolean;
    icon?: string;
};

const menuListItems: MenuItem[] = [
    { label: 'TODAS CATEGORIAS', href: '#' },
    { label: 'SUPERMERCADO', href: '#' },
    { label: 'LIVROS', href: '#' },
    { label: 'MODA', href: '#' },
    { label: 'LANÇAMENTOS', href: '#' },
    { label: 'OFERTAS DO DIA', href: '#', isStrong: true },
];

const menuListSecondaryItems: MenuItem[] = [
    { label: 'ASSINATURA', href: '#' },
    { label: 'Minhas Listas', href: '#' },
    { label: 'Favoritos', href: '#' },
];

const headerActionItems: HeaderActionItem[] = [
    {
        label: 'Meus pedidos',
        href: '#meus-pedidos',
        icon: packageIcon,
        desktopOnly: true,
        iconClassName: 'header__iconImg--package',
    },
    {
        label: 'Favoritos',
        href: '#favoritos',
        icon: heartIcon,
        desktopOnly: true,
    },
    {
        label: 'Login',
        href: '#login',
        icon: userIcon,
    },
    {
        label: 'Carrinho',
        href: '#carrinho',
        icon: cartIcon,
        desktopOnly: true,
    },
];

const desktopCategoryItems: DesktopCategoryItem[] = [
    ...menuListItems.map((item) => ({
        label: item.label,
        href: item.href,
        isHighlight: item.isStrong,
    })),
    {
        label: 'ASSINATURA',
        href: '#assinatura',
        icon: kingIcon,
    },
];

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const closeTimeoutRef = useRef<number | null>(null);

    const openMenu = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setMenuVisible(true);
        setMenuOpen(true);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        closeTimeoutRef.current = window.setTimeout(() => {
            setMenuVisible(false);
            closeTimeoutRef.current = null;
        }, 300);
    };

    const toggleMenu = () => {
        if (menuOpen) {
            closeMenu();
            return;
        }
        openMenu();
    };

    const handleMenuListClick = (event: MouseEvent<HTMLUListElement>) => {
        const target = event.target as HTMLElement;
        if (target.closest('a')) {
            closeMenu();
        }
    };

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <header className={styles.header}>
            <nav className={styles.header__nav} aria-label="Menu principal">
                <button
                    className={styles.header__menuBtn}
                    aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                    aria-expanded={menuOpen}
                    onClick={toggleMenu}
                >
                    <img
                        src={menuIcon}
                        alt=""
                        className={styles.header__menuIcon}
                        aria-hidden="true"
                    />
                </button>
                <Logo
                    href="/"
                    ariaLabel="Econverse"
                    src={logoEconverse}
                    alt="Econverse"
                />
                <SearchInput desktopOnly />
                <div className={styles.header__actions}>
                    {headerActionItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`${styles.header__iconBtn}${item.desktopOnly ? ` ${styles['header__iconBtn--desktopOnly']}` : ''}`}
                            aria-label={item.label}
                        >
                            <img
                                src={item.icon}
                                alt={item.label}
                                className={
                                    item.iconClassName
                                        ? styles[item.iconClassName]
                                        : undefined
                                }
                            />
                        </a>
                    ))}
                </div>
            </nav>
            <div className={styles.header__searchRow}>
                <SearchInput />
                <a
                    href="#carrinho"
                    className={`${styles.header__iconBtn} ${styles['header__iconBtn--mobileCart']}`}
                    aria-label="Carrinho"
                >
                    <img src={cartIcon} alt="Carrinho" />
                </a>
            </div>
            <nav
                className={styles.header__desktopBar}
                aria-label="Categorias em destaque"
            >
                <ul className={styles.header__desktopBarList}>
                    {desktopCategoryItems.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                className={
                                    item.isHighlight
                                        ? styles[
                                              'header__desktopBarLink--highlight'
                                          ]
                                        : undefined
                                }
                            >
                                {item.icon && (
                                    <img
                                        src={item.icon}
                                        alt=""
                                        aria-hidden="true"
                                    />
                                )}
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            {menuVisible && (
                <>
                    <div
                        className={
                            menuOpen
                                ? styles.header__overlay
                                : `${styles.header__overlay} ${styles['header__overlay--close']}`
                        }
                        aria-hidden="true"
                        onClick={closeMenu}
                    />
                    <aside
                        className={
                            menuOpen
                                ? styles.header__menu
                                : `${styles.header__menu} ${styles['header__menu--close']}`
                        }
                        aria-label="Menu lateral"
                    >
                        <div className={styles.header__menuHeader}>
                            <span>Menu</span>
                            <button
                                className={styles.header__closeMenuBtn}
                                aria-label="Fechar menu"
                                onClick={closeMenu}
                            >
                                <img
                                    src={closeIcon}
                                    alt=""
                                    aria-hidden="true"
                                    className={styles.header__closeMenuIcon}
                                />
                            </button>
                        </div>
                        <div className={styles.header__menuLogin}>
                            <img
                                src={userIcon}
                                alt="Acessar conta"
                                className={styles.header__menuLoginIcon}
                            />
                            <div className={styles.header__menuLoginContent}>
                                <span className={styles.header__menuLoginTitle}>
                                    Olá, faça login
                                </span>
                                <span
                                    className={styles.header__menuLoginSubtitle}
                                >
                                    Acesse sua conta
                                </span>
                            </div>
                        </div>
                        <nav
                            className={styles.header__menuNav}
                            aria-label="Categorias"
                        >
                            <span className={styles.header__menuCategoryTitle}>
                                CATEGORIAS
                            </span>
                            <ul
                                className={styles.header__menuList}
                                onClick={handleMenuListClick}
                            >
                                {menuListItems.map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href}>
                                            {item.isStrong ? (
                                                <strong>{item.label}</strong>
                                            ) : (
                                                item.label
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <ul
                                className={styles.header__menuListSecondary}
                                onClick={handleMenuListClick}
                            >
                                {menuListSecondaryItems.map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href}>{item.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                </>
            )}
        </header>
    );
}
