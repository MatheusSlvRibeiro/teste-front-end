import { toast } from 'react-toastify';
import styles from './Newsletter.module.scss';
import { newsletterSchema } from '@/types/newsletter.schema';

export function Newsletter() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        const validationResult = newsletterSchema.safeParse({
            name: String(formData.get('name') ?? ''),
            email: String(formData.get('email') ?? ''),
            termsAccepted: formData.get('termsAccepted') === 'on',
        });

        if (!validationResult.success) {
            const firstErrorMessage =
                validationResult.error.issues[0]?.message ??
                'Não foi possível validar os dados do formulário.';
            toast.error(firstErrorMessage, { toastId: 'newsletter-error' });
            return;
        }

        toast.success('Inscrição realizada com sucesso!', {
            toastId: 'newsletter-success',
        });
        formElement.reset();
    };

    return (
        <section
            className={styles.newsletter}
            aria-labelledby="newsletter-title"
        >
            <div className={styles.newsletter__container}>
                <div>
                    <h2 id="newsletter-title">
                        Inscreva-se na nossa newsletter
                    </h2>
                    <p>
                        Assine a newsletter e receba as novidades e conteudos
                        exclusivos da Econverse.
                    </p>
                </div>

                <form
                    className={styles.newsletter__form}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.newsletter__fields}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Digite seu nome"
                            aria-label="Nome"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            aria-label="Email"
                        />
                        <button type="submit">INSCREVER</button>
                    </div>

                    <label className={styles.newsletter__check}>
                        <input type="checkbox" name="termsAccepted" />
                        Aceito os termos e condicoes
                    </label>
                </form>
            </div>
        </section>
    );
}
