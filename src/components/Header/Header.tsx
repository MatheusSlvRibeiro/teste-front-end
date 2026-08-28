import { CartIcon } from '@/components/icons/CartIcon'
import { HeartIcon } from '@/components/icons/HeartIcon'
import { RepeatIcon } from '@/components/icons/RepeatIcon'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import styles from './Header.module.scss'

const ANNOUNCEMENTS = ['Compra 100% segura', 'Frete grátis acima de R$ 200', 'Parcele suas compras']

const ACTIONS = [
  { label: 'Trocar produto', icon: RepeatIcon },
  { label: 'Lista de desejos', icon: HeartIcon },
  { label: 'Minha conta', icon: UserIcon },
  { label: 'Carrinho', icon: CartIcon },
]

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__announcements}>
        <ul className={styles.header__announcementsList}>
          {ANNOUNCEMENTS.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </div>

      <div className={styles.header__main}>
        <span className={styles.header__logo}>econverse</span>

        <form
          role="search"
          className={styles.header__search}
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="header-search" className={styles.header__searchLabel}>
            Buscar produtos
          </label>
          <input
            id="header-search"
            name="q"
            type="search"
            className={styles.header__searchInput}
            placeholder="O que você está buscando?"
          />
          <button type="submit" className={styles.header__searchButton} aria-label="Buscar">
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
