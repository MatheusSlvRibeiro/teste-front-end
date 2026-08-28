import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { newsletterSchema, type NewsletterFormData } from './newsletter.schema'
import styles from './Newsletter.module.scss'

export function Newsletter() {
  const headingId = useId()
  const nameId = useId()
  const emailId = useId()
  const termsId = useId()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { name: '', email: '', terms: false },
  })

  return (
    <section className={styles.newsletter} aria-labelledby={headingId}>
      <div className={styles.newsletter__inner}>
        <div className={styles.newsletter__intro}>
          <h2 id={headingId} className={styles.newsletter__title}>
            Inscreva-se na nossa newsletter
          </h2>
          <p className={styles.newsletter__description}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <form className={styles.newsletter__form} onSubmit={handleSubmit(() => reset())} noValidate>
          <div className={styles.newsletter__fields}>
            <label htmlFor={nameId} className={styles.newsletter__label}>
              Digite seu nome
            </label>
            <Input
              id={nameId}
              type="text"
              autoComplete="name"
              placeholder="Digite seu nome"
              className={styles.newsletter__input}
              error={errors.name?.message}
              {...register('name')}
            />

            <label htmlFor={emailId} className={styles.newsletter__label}>
              Digite seu e-mail
            </label>
            <Input
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="Digite seu e-mail"
              className={styles.newsletter__input}
              error={errors.email?.message}
              {...register('email')}
            />

            <Button type="submit" className={styles.newsletter__submit}>
              INSCREVER
            </Button>
          </div>

          <div className={styles.newsletter__terms}>
            <input
              id={termsId}
              type="checkbox"
              className={styles.newsletter__checkbox}
              aria-invalid={errors.terms ? true : undefined}
              aria-describedby={errors.terms ? `${termsId}-error` : undefined}
              {...register('terms')}
            />
            <label htmlFor={termsId} className={styles.newsletter__termsLabel}>
              Aceito os termos e condições
            </label>
            {errors.terms && (
              <p id={`${termsId}-error`} role="alert" className={styles.newsletter__termsError}>
                {errors.terms.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
