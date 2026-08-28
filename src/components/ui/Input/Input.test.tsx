import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('repassa atributos padrão de input, como placeholder e type', () => {
    render(<Input aria-label="E-mail" type="email" placeholder="Digite seu e-mail" />)

    const input = screen.getByLabelText('E-mail')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('placeholder', 'Digite seu e-mail')
  })

  it('combina a classe própria com a className recebida', () => {
    render(<Input aria-label="Nome" className="custom" />)

    expect(screen.getByLabelText('Nome').className).toContain('custom')
  })

  it('aceita digitação do usuário', async () => {
    render(<Input aria-label="Nome" />)

    await userEvent.type(screen.getByLabelText('Nome'), 'Maria')

    expect(screen.getByLabelText('Nome')).toHaveValue('Maria')
  })

  it('funciona sem className, sem quebrar', () => {
    render(<Input aria-label="Nome" />)

    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
  })
})
