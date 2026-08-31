import { useNavigate } from 'react-router'
import styles from './NotFound.module.scss'

export function NotFound() {
    const navigate = useNavigate()

    return (
        <div className={styles.notfound}>
            <p className={styles.notfound__code}>404</p>
            <h1 className={styles.notfound__title}>Página não encontrada</h1>
            <p className={styles.notfound__message}>
                A página que você está procurando não existe ou foi removida.
            </p>
            <button type="button" className={styles.notfound__back} onClick={() => navigate(-1)}>
                Voltar
            </button>
        </div>
    )
}
