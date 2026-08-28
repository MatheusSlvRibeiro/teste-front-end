import { forwardRef, type InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, id, ...props },
  ref,
) {
  const errorId = error && id ? `${id}-error` : undefined

  return (
    <>
      <input
        ref={ref}
        id={id}
        className={[styles.input, className].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className={styles.input__error}>
          {error}
        </p>
      )}
    </>
  )
})
