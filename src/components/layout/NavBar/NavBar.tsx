import { useEffect, useId, useRef, useState, type ComponentType } from 'react'
import logoEconverse from '@/assets/logo-econverse.svg'
import { CartIcon } from '@/components/icons/CartIcon'
import { HeartIcon } from '@/components/icons/HeartIcon'
import { KingIcon } from '@/components/icons/KingIcon'
import { MenuIcon } from '@/components/icons/MenuIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import styles from './NavBar.module.scss'

interface IconProps {
    size?: number
}

interface NavItem {
    label: string
    active?: boolean
    hasIcon?: boolean
}

interface ProfileMenuItem {
    label: string
    icon: ComponentType<IconProps>
}

const NAV_ITEMS: NavItem[] = [
    { label: 'Todas categorias' },
    { label: 'Supermercado' },
    { label: 'Livros' },
    { label: 'Moda' },
    { label: 'Lançamentos' },
    { label: 'Ofertas do dia', active: true },
    { label: 'Assinatura', hasIcon: true },
]

const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
    { label: 'Minha conta', icon: UserIcon },
    { label: 'Favoritos', icon: HeartIcon },
    { label: 'Meus pedidos', icon: CartIcon },
]

export function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const profileRef = useRef<HTMLDivElement>(null)
    const listId = useId()

    useEffect(() => {
        if (!isProfileOpen) return

        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false)
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') setIsProfileOpen(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isProfileOpen])

    useEffect(() => {
        if (!isMenuOpen) return

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') setIsMenuOpen(false)
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isMenuOpen])

    return (
        <nav className={styles.navbar} aria-label="Categorias">
            <div className={styles.navbar__mobileBar}>
                <button
                    type="button"
                    className={styles.navbar__menuButton}
                    aria-label="Abrir menu"
                    aria-expanded={isMenuOpen}
                    aria-controls={listId}
                    onClick={() => {
                        setIsMenuOpen((open) => !open)
                        setIsProfileOpen(false)
                    }}
                >
                    <MenuIcon />
                </button>

                <img
                    className={styles.navbar__logo}
                    src={logoEconverse}
                    alt="Econverse"
                    width={104}
                    height={32}
                />

                <div className={styles.navbar__profile} ref={profileRef}>
                    <button
                        type="button"
                        className={styles.navbar__profileButton}
                        aria-label="Minha conta"
                        aria-haspopup="menu"
                        aria-expanded={isProfileOpen}
                        onClick={() => {
                            setIsProfileOpen((open) => !open)
                            setIsMenuOpen(false)
                        }}
                    >
                        <UserIcon />
                    </button>

                    <ul
                        className={`${styles.navbar__profileMenu} ${isProfileOpen ? styles['navbar__profileMenu--open'] : ''}`.trim()}
                        role="menu"
                        aria-hidden={!isProfileOpen}
                    >
                        {PROFILE_MENU_ITEMS.map(({ label, icon: Icon }) => (
                            <li key={label} role="none">
                                <button
                                    type="button"
                                    role="menuitem"
                                    tabIndex={isProfileOpen ? 0 : -1}
                                    className={styles.navbar__profileMenuItem}
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <Icon size={16} />
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div
                className={`${styles.navbar__overlay} ${isMenuOpen ? styles['navbar__overlay--open'] : ''}`.trim()}
                aria-hidden="true"
                data-testid="navbar-overlay"
                onClick={() => setIsMenuOpen(false)}
            />

            <ul
                id={listId}
                className={`${styles.navbar__list} ${isMenuOpen ? styles['navbar__list--open'] : ''}`.trim()}
                role="list"
            >
                {NAV_ITEMS.map(({ label, active, hasIcon }) => (
                    <li key={label}>
                        <button
                            type="button"
                            className={`${styles.navbar__item} ${active ? styles['navbar__item--active'] : ''}`.trim()}
                            aria-current={active ? 'page' : undefined}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {hasIcon && <KingIcon size={14} />}
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
