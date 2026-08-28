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

  it('exibe a mensagem de erro e marca aria-invalid quando error é passado', () => {
    render(<Input id="email" aria-label="E-mail" error="Informe um e-mail válido" />)

    expect(screen.getByText('Informe um e-mail válido')).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('aria-invalid', 'true')
  })

  it('não renderiza mensagem de erro nem aria-invalid quando error está ausente', () => {
    render(<Input aria-label="Nome" />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).not.toHaveAttribute('aria-invalid')
  })

  it('não quebra quando error é passado sem id', () => {
    render(<Input aria-label="Nome" error="Campo obrigatório" />)

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })
})
