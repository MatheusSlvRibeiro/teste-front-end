import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

export function Button({
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={[styles.button, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}
