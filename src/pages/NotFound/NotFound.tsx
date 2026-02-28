import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

export default function NotFound() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <main
            className={styles.notFoundContainer}
            aria-label="Página não encontrada"
        >
            <h1 className={styles.notFoundTitle}>Página Não Encontrada</h1>
            <div className={styles.notFoundCode}>404</div>
            <p className={styles.notFoundMessage}>
                A página que você está procurando não existe ou foi movida.
            </p>
            <button
                className={styles.notFoundBack}
                onClick={handleBack}
                aria-label="Voltar para etapa anterior"
            >
                Voltar
            </button>
        </main>
    );
}
