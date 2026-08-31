import { useId, useState } from 'react'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './SearchInput.module.scss'

interface SearchInputProps {
    placeholder?: string
    className?: string
    onSearch?: (query: string) => void
}

export function SearchInput({
    placeholder = 'O que você está buscando?',
    className,
    onSearch,
}: SearchInputProps) {
    const inputId = useId()
    const [value, setValue] = useState('')

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onSearch?.(value)
    }

    return (
        <form
            role="search"
            className={`${styles.search}${className ? ` ${className}` : ''}`}
            onSubmit={handleSubmit}
        >
            <input
                id={inputId}
                type="text"
                className={styles.search__input}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
            />
            <button type="submit" className={styles.search__button} aria-label="Buscar">
                <SearchIcon size={20} />
            </button>
        </form>
    )
}
