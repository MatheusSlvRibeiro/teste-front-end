import { useId } from 'react'
import styles from './Newsletter.module.scss'

export function Newsletter() {
  const headingId = useId()
  const nameId = useId()
  const emailId = useId()
  const termsId = useId()

  return (
    <section className={styles.newsletter} aria-labelledby={headingId}>
      <div className={styles.newsletter__intro}>
        <h2 id={headingId} className={styles.newsletter__title}>
          Inscreva-se na nossa newsletter
        </h2>
        <p className={styles.newsletter__description}>
          Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
        </p>
      </div>

      <form className={styles.newsletter__form} onSubmit={(event) => event.preventDefault()}>
        <div className={styles.newsletter__fields}>
          <label htmlFor={nameId} className={styles.newsletter__label}>
            Digite seu nome
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Digite seu nome"
            className={styles.newsletter__input}
          />

          <label htmlFor={emailId} className={styles.newsletter__label}>
            Digite seu e-mail
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Digite seu e-mail"
            className={styles.newsletter__input}
          />

          <button type="submit" className={styles.newsletter__submit}>
            INSCREVER
          </button>
        </div>

        <div className={styles.newsletter__terms}>
          <input
            id={termsId}
            name="terms"
            type="checkbox"
            className={styles.newsletter__checkbox}
          />
          <label htmlFor={termsId} className={styles.newsletter__termsLabel}>
            Aceito os termos e condições
          </label>
        </div>
      </form>
    </section>
  )
}
