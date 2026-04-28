import searchIcon from '@assets/icons/search.svg';
import styles from './SearchInput.module.scss';

type SearchInputProps = {
    desktopOnly?: boolean;
    placeholder?: string;
};

export function SearchInput({
    desktopOnly = false,
    placeholder = 'O que você está buscando?',
}: SearchInputProps) {
    return (
        <form
            className={`${styles.search}${desktopOnly ? ` ${styles['search--desktopOnly']}` : ''}`}
            role="search"
            aria-label="Busca"
        >
            <input
                type="search"
                placeholder={placeholder}
                className={styles.search__input}
                aria-label="Buscar produtos"
            />
            <button
                type="submit"
                className={styles.search__btn}
                aria-label="Buscar"
            >
                <img src={searchIcon} alt="Buscar" />
            </button>
        </form>
    );
}
