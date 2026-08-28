import { RepeatIcon } from '@/components/icons/RepeatIcon'
import styles from './NavBar.module.scss'

interface NavItem {
  label: string
  active?: boolean
  hasIcon?: boolean
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

export function NavBar() {
  return (
    <nav className={styles.navbar} aria-label="Categorias">
      <ul className={styles.navbar__list}>
        {NAV_ITEMS.map(({ label, active, hasIcon }) => (
          <li key={label}>
            <button
              type="button"
              className={`${styles.navbar__item} ${active ? styles['navbar__item--active'] : ''}`.trim()}
              aria-current={active ? 'page' : undefined}
            >
              {hasIcon && <RepeatIcon size={14} />}
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
