import type { ComponentType } from 'react'
import logoEconverse from '@/assets/logo-econverse.svg'
import { CardIcon } from '@/components/icons/CardIcon'
import { CartIcon } from '@/components/icons/CartIcon'
import { HeartIcon } from '@/components/icons/HeartIcon'
import { SafeIcon } from '@/components/icons/SafeIcon'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { TruckIcon } from '@/components/icons/TruckIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { Input } from '@/components/ui/Input/Input'
import styles from './Header.module.scss'

interface IconProps {
    size?: number
}

interface Announcement {
    icon: ComponentType<IconProps>
    prefix?: string
    highlight: string
    suffix?: string
}

const ANNOUNCEMENTS: Announcement[] = [
    { icon: SafeIcon, prefix: 'Compra ', highlight: '100% segura' },
    { icon: TruckIcon, highlight: 'Frete grátis', suffix: ' acima de R$ 200' },
    { icon: CardIcon, highlight: 'Parcele', suffix: ' suas compras' },
]

const ACTIONS = [
    { label: 'Trocar produto', icon: CardIcon },
    { label: 'Lista de desejos', icon: HeartIcon },
    { label: 'Minha conta', icon: UserIcon },
    { label: 'Carrinho', icon: CartIcon },
]

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header__announcements}>
                <ul className={styles.header__announcementsList} role="list">
                    {ANNOUNCEMENTS.map(({ icon: Icon, prefix, highlight, suffix }) => (
                        <li key={highlight}>
                            <Icon />
                            {prefix}
                            <strong className={styles.header__announcementHighlight}>
                                {highlight}
                            </strong>
                            {suffix}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.header__main}>
                <img
                    className={styles.header__logo}
                    src={logoEconverse}
                    alt="Econverse"
                    width={139}
                    height={42}
                    decoding="async"
                />

                <form
                    role="search"
                    className={styles.header__search}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <label htmlFor="header-search" className={styles.header__searchLabel}>
                        Buscar produtos
                    </label>
                    <Input
                        id="header-search"
                        name="q"
                        type="search"
                        className={styles.header__searchInput}
                        placeholder="O que você está buscando?"
                    />
                    <button
                        type="submit"
                        className={styles.header__searchButton}
                        aria-label="Buscar"
                    >
                        <SearchIcon />
                    </button>
                </form>

                <div className={styles.header__actions}>
                    {ACTIONS.map(({ label, icon: Icon }) => (
                        <button
                            key={label}
                            type="button"
                            className={styles.header__actionButton}
                            aria-label={label}
                        >
                            <Icon />
                        </button>
                    ))}
                </div>
            </div>
        </header>
    )
}
